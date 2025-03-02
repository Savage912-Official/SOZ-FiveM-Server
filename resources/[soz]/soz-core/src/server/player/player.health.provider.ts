import { PlayerZombieProvider } from '@public/server/player/player.zombie.provider';

import { OnEvent } from '../../core/decorators/event';
import { Inject } from '../../core/decorators/injectable';
import { Provider } from '../../core/decorators/provider';
import { ServerEvent } from '../../shared/event';
import { Feature, isFeatureEnabled } from '../../shared/features';
import { PlayerMetadata, PlayerServerStateExercise } from '../../shared/player';
import { PollutionLevel } from '../../shared/pollution';
import { Notifier } from '../notifier';
import { Pollution } from '../pollution';
import { PlayerMoneyService } from './player.money.service';
import { PlayerService } from './player.service';
import { PlayerStateService } from './player.state.service';

const HUNGER_RATE = -1.25;
const THIRST_RATE = -1.66;
const ALCOHOL_RATE = -3.8;
const DRUG_RATE = -2.1;
const STRENGTH_RATE = -1.0;
const MAX_STAMINA_RATE = -1.0;
const STRESS_RATE = -1.0;

const STRENGTH_MIN = 60;
const STRENGTH_MAX = 150;
const MAX_STAMINA_MIN = 60;
const MAX_STAMINA_MAX = 150;
const STRESS_MIN = 0;
const STRESS_MAX = 100;

@Provider()
export class PlayerHealthProvider {
    @Inject(PlayerService)
    private playerService: PlayerService;

    @Inject(PlayerStateService)
    private playerStateService: PlayerStateService;

    @Inject(Pollution)
    private pollution: Pollution;

    @Inject(Notifier)
    private notifier: Notifier;

    @Inject(PlayerMoneyService)
    private playerMoneyService: PlayerMoneyService;

    @Inject(PlayerZombieProvider)
    private playerZombieProvider: PlayerZombieProvider;

    private yogaAndNaturalMultiplier: (source: number) => number = () => 1;

    @OnEvent(ServerEvent.PLAYER_NUTRITION_LOOP)
    public async nutritionLoop(source: number): Promise<void> {
        const player = this.playerService.getPlayer(source);

        if (!player || player.metadata.godmode || player.metadata.isdead) {
            return;
        }

        if (this.playerZombieProvider.isZombiePlayer(source)) {
            return;
        }

        const playerState = this.playerStateService.getServerStateByCitizenId(player.citizenid);

        let hungerDiff = HUNGER_RATE;
        let thirstDiff = THIRST_RATE;

        if (this.pollution.getPollutionLevel() == PollutionLevel.High) {
            hungerDiff *= 1.2;
            thirstDiff *= 1.2;
        }

        if (player.metadata.organ === 'rein') {
            thirstDiff -= 2.0;
        }

        if (player.metadata.organ === 'foie') {
            hungerDiff -= 2.0;
        }

        const datas: Partial<PlayerMetadata> = {};
        datas.hunger = this.playerService.getIncrementedMetadata(player, 'hunger', hungerDiff, 0, 100);
        datas.thirst = this.playerService.getIncrementedMetadata(player, 'thirst', thirstDiff, 0, 100);
        datas.alcohol = this.playerService.getIncrementedMetadata(player, 'alcohol', ALCOHOL_RATE, 0, 200);
        datas.drug = this.playerService.getIncrementedMetadata(player, 'drug', DRUG_RATE, 0, 110);

        if (isFeatureEnabled(Feature.MyBodySummer)) {
            const now = new Date().getTime();

            const strengthTimeDiff = now - playerState.lastStrengthUpdate.getTime();

            if (
                strengthTimeDiff > 30 * 60 * 1000 &&
                playerState.lostStrength < 4 &&
                playerState.exercise.completed < 4
            ) {
                playerState.lastStrengthUpdate = new Date();

                datas.strength = this.playerService.getIncrementedMetadata(
                    player,
                    'strength',
                    STRENGTH_RATE,
                    STRENGTH_MIN,
                    STRENGTH_MAX
                );

                playerState.lostStrength += 1;

                this.notifier.notify(source, 'Vous vous sentez ~r~moins puissant~s~.', 'error');
            }

            const staminaTimeDiff = now - playerState.lastMaxStaminaUpdate.getTime();

            if (staminaTimeDiff > 60 * 60 * 1000 && playerState.lostStamina < 3 && playerState.runTime < 60 * 8) {
                playerState.lastMaxStaminaUpdate = new Date();
                datas.max_stamina = this.playerService.getIncrementedMetadata(
                    player,
                    'max_stamina',
                    MAX_STAMINA_RATE,
                    MAX_STAMINA_MIN,
                    MAX_STAMINA_MAX
                );

                playerState.lostStamina += 1;

                this.notifier.notify(source, 'Vous vous sentez ~r~moins athlétique~s~.', 'error');
            }

            const stressTimeDiff = now - playerState.lastStressLevelUpdate.getTime();

            if (stressTimeDiff > 30 * 60 * 1000) {
                playerState.lastStressLevelUpdate = new Date();

                datas.stress_level = this.playerService.getIncrementedMetadata(
                    player,
                    'stress_level',
                    this.yogaAndNaturalMultiplier(source) * STRESS_RATE,
                    STRESS_MIN,
                    STRESS_MAX
                );

                this.notifier.notify(source, 'Vous vous sentez moins ~g~angoissé~s~.', 'success');
            }
        }

        this.playerService.setPlayerMetaDatas(source, datas);
    }

    @OnEvent(ServerEvent.PLAYER_INCREASE_STRENGTH)
    public async increaseStrength(source: number, exercise: keyof PlayerServerStateExercise): Promise<void> {
        const player = this.playerService.getPlayer(source);

        if (player === null || player.metadata.isdead) {
            return;
        }

        const playerState = this.playerStateService.getServerStateByCitizenId(player.citizenid);

        if (playerState.exercise[exercise]) {
            return;
        }

        playerState.exercise[exercise] = true;
        playerState.exercise.completed += 1;

        this.playerService.incrementMetadata(source, 'strength', 2, STRENGTH_MIN, STRENGTH_MAX);
        this.playerService.updatePlayerMaxWeight(source);
    }

    @OnEvent(ServerEvent.PLAYER_INCREASE_STRESS)
    public async increaseStress(source: number, stress: number): Promise<void> {
        const playerState = this.playerStateService.getServerState(source);
        playerState.lastStressLevelUpdate = new Date();
        this.playerService.incrementMetadata(source, 'stress_level', stress, STRESS_MIN, STRESS_MAX);
    }

    @OnEvent(ServerEvent.PLAYER_INCREASE_RUN_TIME)
    public async increaseRunTime(source: number): Promise<void> {
        const player = this.playerService.getPlayer(source);

        if (player === null || player.metadata.isdead) {
            return;
        }

        const playerState = this.playerStateService.getServerStateByCitizenId(player.citizenid);

        playerState.runTime += 1;

        if (playerState.runTime > 60 * 8) {
            return;
        }

        if (playerState.runTime % 60 === 0) {
            const minutes = playerState.runTime / 60;

            if (playerState.runTime % 120 == 0) {
                this.playerService.incrementMetadata(source, 'max_stamina', 1, MAX_STAMINA_MIN, MAX_STAMINA_MAX);
            }

            if (minutes < 8) {
                this.notifier.notify(
                    source,
                    `Tu as couru durant ${minutes} ${
                        minutes === 1 ? 'minute' : 'minutes'
                    } ! Tu te sens de plus en plus endurant, continue comme ça.`,
                    'success'
                );
            } else if (minutes === 8) {
                this.notifier.notify(
                    source,
                    "Tu as couru tes 8 minutes de la journée ! Tu te sens en forme pour toute la journée. Courir n'améliore plus ton endurance, et ce, jusqu'au lendemain.",
                    'success'
                );
            }
        }
    }

    @OnEvent(ServerEvent.PLAYER_DO_YOGA)
    public async doYoga(source: number): Promise<void> {
        const player = this.playerService.getPlayer(source);

        if (player === null) {
            return;
        }

        const playerState = this.playerStateService.getServerStateByCitizenId(player.citizenid);

        if (playerState.yoga) {
            return;
        }

        playerState.yoga = true;

        this.notifier.notify(source, 'Vous vous sentez moins ~g~angoissé~s~.', 'success');

        await this.increaseStress(source, this.yogaAndNaturalMultiplier(source) * -8);
    }

    @OnEvent(ServerEvent.PLAYER_HEALTH_GYM_SUBSCRIBE)
    public onGymSubscribe(source: number) {
        const player = this.playerService.getPlayer(source);

        if (!player) {
            return;
        }

        if (player.metadata.gym_subscription_expire_at && player.metadata.gym_subscription_expire_at > Date.now()) {
            return;
        }

        if (this.playerMoneyService.remove(source, 300)) {
            this.playerService.setPlayerMetadata(
                source,
                'gym_subscription_expire_at',
                Date.now() + 7 * 24 * 60 * 60 * 1000
            );

            this.notifier.notify(
                source,
                `Damn la team Los Santos ! Merci à toi d'avoir acheté notre abonnement de sport MUSCLE PEACH d'une semaine à 300$ ! Tu peux désormais te changer dans nos vestiaires.`,
                'success'
            );
        } else {
            this.notifier.notify(
                source,
                `Tu ne possèdes pas 300$ ! Si tu souhaites profiter de nos installations et de notre vestiaire, reviens avec de l'argent.`,
                'error'
            );
        }
    }

    public setYogaAndNaturalMultiplier(fn: (value: number) => number) {
        this.yogaAndNaturalMultiplier = fn;
    }
}
