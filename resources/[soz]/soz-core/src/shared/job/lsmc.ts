import { Component, Prop, WardrobeConfig } from '../cloth';
import { VanillaComponentDrawableIndexMaxValue, VanillaPropDrawableIndexMaxValue } from '../drawable';
import { joaat } from '../joaat';
import { Vector3, Vector4 } from '../polyzone/vector';

export type KillerVehData = {
    name: string;
    seat: number;
    plate: string;
};

export type KillData = {
    killerid: number;
    killertype: number;
    killerentitytype: number;
    weaponhash: number;
    weapondamagetype: number;
    weapongroup: number;
    killpos: Vector3;
    killerveh?: KillerVehData;
    ejection: boolean;
    hungerThristDeath: boolean;
};

export const PHARMACY_PRICES = {
    tissue: 125,
    antibiotic: 125,
    pommade: 125,
    painkiller: 125,
    antiacide: 125,
    heal: 400,
    health_book: 50,
};

export const BedLocations: Vector4[] = [
    [344.27, -1457.18, 32.43, 51.0],
    [347.96, -1452.78, 32.43, 50.99],
    [351.8, -1448.2, 32.43, 50.99],
    [355.65, -1443.61, 32.43, 51.0],
    [346.08, -1443.43, 32.43, 228.99],
    [342.23, -1448.01, 32.43, 228.99],
    [338.38, -1452.6, 32.43, 229.0],
];
export function getBedName(index: number) {
    return `UHU_BED_POS_${index}`;
}

export const FailoverLocationName = 'UHU_FAILOVER_LCOCATION';
export const FailoverLocation: Vector4 = [342.82, -1460.64, 32.51, 315.75];

export const PatientClothes: WardrobeConfig = {
    [joaat('mp_m_freemode_01')]: {
        ['Patient']: {
            Components: {
                [Component.Mask]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Torso]: { Drawable: 15, Texture: 0, Palette: 0 },
                [Component.Legs]: { Drawable: 61, Texture: 0, Palette: 0 },
                [Component.Bag]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Shoes]: { Drawable: 34, Texture: 0, Palette: 0 },
                [Component.Accessories]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Undershirt]: { Drawable: 15, Texture: 0, Palette: 0 },
                [Component.BodyArmor]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Decals]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Tops]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_m_freemode_01')][Component.Tops] + 7,
                    Texture: 0,
                    Palette: 0,
                },
            },
            Props: {
                [Prop.Hat]: { Clear: true },
                [Prop.Glasses]: { Clear: true },
                [Prop.Ear]: { Clear: true },
                [Prop.LeftHand]: { Clear: true },
                [Prop.RightHand]: { Clear: true },
                [Prop.Helmet]: { Clear: true },
            },
            GlovesID: 0,
        },
    },
    [joaat('mp_f_freemode_01')]: {
        ['Patient']: {
            Components: {
                [Component.Mask]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Torso]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Legs]: { Drawable: 15, Texture: 3, Palette: 0 },
                [Component.Bag]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Shoes]: { Drawable: 35, Texture: 0, Palette: 0 },
                [Component.Accessories]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Undershirt]: { Drawable: 14, Texture: 0, Palette: 0 },
                [Component.BodyArmor]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Decals]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Tops]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_f_freemode_01')][Component.Tops] + 7,
                    Texture: 0,
                    Palette: 0,
                },
            },
            Props: {
                [Prop.Hat]: { Clear: true },
                [Prop.Glasses]: { Clear: true },
                [Prop.Ear]: { Clear: true },
                [Prop.LeftHand]: { Clear: true },
                [Prop.RightHand]: { Clear: true },
                [Prop.Helmet]: { Clear: true },
            },
            GlovesID: 0,
        },
    },
};

export const DUTY_OUTFIT_NAME = 'Tenue de service';
export const HAZMAT_OUTFIT_NAME = 'Tenue hazmat';

export const LsmcCloakroom: WardrobeConfig = {
    [joaat('mp_m_freemode_01')]: {
        [DUTY_OUTFIT_NAME]: {
            Components: {
                [Component.Torso]: { Drawable: 92, Texture: 0, Palette: 0 },
                [Component.Legs]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_m_freemode_01')][Component.Legs] + 4,
                    Texture: 0,
                    Palette: 0,
                },
                [Component.Shoes]: { Drawable: 51, Texture: 0, Palette: 0 },
                [Component.Accessories]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_m_freemode_01')][Component.Accessories],
                    Texture: 0,
                    Palette: 0,
                },
                [Component.Undershirt]: {
                    Drawable:
                        VanillaComponentDrawableIndexMaxValue[joaat('mp_m_freemode_01')][Component.Undershirt] + 5,
                    Texture: 0,
                    Palette: 0,
                },
                [Component.BodyArmor]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Decals]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Tops]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_m_freemode_01')][Component.Tops] + 3,
                    Texture: 0,
                    Palette: 0,
                },
            },
            Props: {},
        },
        ['Tenue incendie']: {
            Components: {
                [Component.Torso]: { Drawable: 96, Texture: 0, Palette: 0 },
                [Component.Legs]: { Drawable: 120, Texture: 0, Palette: 0 },
                [Component.Shoes]: { Drawable: 24, Texture: 0, Palette: 0 },
                [Component.Accessories]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Undershirt]: { Drawable: 151, Texture: 0, Palette: 0 },
                [Component.BodyArmor]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Decals]: { Drawable: 16, Texture: 0, Palette: 0 },
                [Component.Tops]: { Drawable: 314, Texture: 0, Palette: 0 },
            },
            Props: {
                [Prop.Hat]: {
                    Drawable: VanillaPropDrawableIndexMaxValue[joaat('mp_m_freemode_01')][Prop.Hat] + 3,
                    Texture: 0,
                    Palette: 0,
                },
            },
        },
        [HAZMAT_OUTFIT_NAME]: {
            Components: {
                [Component.Mask]: { Drawable: 46, Texture: 0, Palette: 0 },
                [Component.Torso]: { Drawable: 86, Texture: 0, Palette: 0 },
                [Component.Legs]: { Drawable: 40, Texture: 0, Palette: 0 },
                [Component.Bag]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Shoes]: { Drawable: 25, Texture: 0, Palette: 0 },
                [Component.Accessories]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Undershirt]: { Drawable: 62, Texture: 0, Palette: 0 },
                [Component.BodyArmor]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Decals]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Tops]: { Drawable: 67, Texture: 0, Palette: 0 },
            },
            Props: { [Prop.Hat]: { Clear: true } },
        },
        ['Tenue Hiver']: {
            Components: {
                [Component.Torso]: { Drawable: 90, Texture: 0, Palette: 0 },
                [Component.Legs]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_m_freemode_01')][Component.Legs] + 4,
                    Texture: 0,
                    Palette: 0,
                },
                [Component.Shoes]: { Drawable: 51, Texture: 0, Palette: 0 },
                [Component.Accessories]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_m_freemode_01')][Component.Accessories],
                    Texture: 0,
                    Palette: 0,
                },
                [Component.Undershirt]: { Drawable: 179, Texture: 11, Palette: 0 },
                [Component.BodyArmor]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Decals]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Tops]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_m_freemode_01')][Component.Tops] + 6,
                    Texture: 0,
                    Palette: 0,
                },
            },
            Props: {},
        },
    },
    [joaat('mp_f_freemode_01')]: {
        [DUTY_OUTFIT_NAME]: {
            Components: {
                [Component.Torso]: { Drawable: 106, Texture: 0, Palette: 0 },
                [Component.Legs]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_f_freemode_01')][Component.Legs] + 4,
                    Texture: 0,
                    Palette: 0,
                },
                [Component.Shoes]: { Drawable: 52, Texture: 0, Palette: 0 },
                [Component.Accessories]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_f_freemode_01')][Component.Accessories],
                    Texture: 0,
                    Palette: 0,
                },
                [Component.Undershirt]: {
                    Drawable:
                        VanillaComponentDrawableIndexMaxValue[joaat('mp_f_freemode_01')][Component.Undershirt] + 5,
                    Texture: 0,
                    Palette: 0,
                },
                [Component.BodyArmor]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Decals]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Tops]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_f_freemode_01')][Component.Tops] + 3,
                    Texture: 0,
                    Palette: 0,
                },
            },
            Props: {},
        },
        ['Tenue incendie']: {
            Components: {
                [Component.Torso]: { Drawable: 111, Texture: 0, Palette: 0 },
                [Component.Legs]: { Drawable: 126, Texture: 0, Palette: 0 },
                [Component.Shoes]: { Drawable: 24, Texture: 0, Palette: 0 },
                [Component.Accessories]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Undershirt]: { Drawable: 187, Texture: 0, Palette: 0 },
                [Component.BodyArmor]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Decals]: { Drawable: 15, Texture: 0, Palette: 0 },
                [Component.Tops]: { Drawable: 325, Texture: 0, Palette: 0 },
            },
            Props: {
                [Prop.Hat]: {
                    Drawable: VanillaPropDrawableIndexMaxValue[joaat('mp_f_freemode_01')][Prop.Hat] + 3,
                    Texture: 0,
                    Palette: 0,
                },
            },
        },
        [HAZMAT_OUTFIT_NAME]: {
            Components: {
                [Component.Mask]: { Drawable: 46, Texture: 0, Palette: 0 },
                [Component.Torso]: { Drawable: 101, Texture: 0, Palette: 0 },
                [Component.Legs]: { Drawable: 40, Texture: 0, Palette: 0 },
                [Component.Bag]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Shoes]: { Drawable: 25, Texture: 0, Palette: 0 },
                [Component.Accessories]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Undershirt]: { Drawable: 43, Texture: 0, Palette: 0 },
                [Component.BodyArmor]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Decals]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Tops]: { Drawable: 61, Texture: 0, Palette: 0 },
            },
            Props: { [0]: { Clear: true } },
        },
        ['Tenue Hiver']: {
            Components: {
                [Component.Torso]: { Drawable: 106, Texture: 0, Palette: 0 },
                [Component.Legs]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_f_freemode_01')][Component.Legs] + 4,
                    Texture: 0,
                    Palette: 0,
                },
                [Component.Shoes]: { Drawable: 52, Texture: 0, Palette: 0 },
                [Component.Accessories]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_f_freemode_01')][Component.Accessories],
                    Texture: 0,
                    Palette: 0,
                },
                [Component.Undershirt]: { Drawable: 217, Texture: 11, Palette: 0 },
                [Component.BodyArmor]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Decals]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Tops]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_f_freemode_01')][Component.Tops] + 6,
                    Texture: 0,
                    Palette: 0,
                },
            },
            Props: {},
        },
    },
};
