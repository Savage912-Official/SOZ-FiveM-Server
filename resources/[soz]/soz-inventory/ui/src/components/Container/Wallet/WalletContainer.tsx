import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { InventoryItem } from '../../../types/inventory';
import { ContainerWrapper } from '../ContainerWrapper';
import style from './WalletContainer.module.css';
import { ContainerSlots } from '../ContainerSlots';
import walletBanner from '/banner/wallet_banner.png'
import { closeNUI } from '../../../hooks/nui';
import { clsx } from 'clsx';
import { DndContext, rectIntersection } from '@dnd-kit/core';

export const WalletContainer = () => {
    const [display, setDisplay] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const [playerInventory, setPlayerInventory] = useState<InventoryItem[] | null>([]);

    const closeMenu = useCallback(() => {
        setDisplay(false);
        setPlayerInventory(null);
    }, [setDisplay, setPlayerInventory]);


    const showCard = useCallback((event: any) => {
        if (!event.active.data.current) return;

        fetch(`https://soz-inventory/player/showCard`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(event.active.data.current.item)
        }).then()
    }, []);

    const interactAction = useCallback(
        (action: string, item: InventoryItem, shortcut: number) => {
            fetch(`https://soz-inventory/player/${action}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({ ...item, shortcut }),
            }).then();
        },
        []
    );
    
    const onMessageReceived = useCallback((event: MessageEvent) => {
        if (event.data.action === "openPlayerWalletInventory") {
            if (event.data.cards === undefined) return

            setPlayerInventory(event.data.cards.filter((i: InventoryItem) => i !== null).map((item: InventoryItem) => ({ ...item, id: `key_${item.slot}` })));
            setDisplay(true);
        } else if (event.data.action === 'openShop' || event.data.action === 'openInventory' || event.data.action === 'openPlayerInventory'  || event.data.action === 'openPlayerKeyInventory' ) {
            closeMenu();
        }
    }, [setDisplay, setPlayerInventory]);

    const onKeyDownReceived = useCallback(
        (event: KeyboardEvent) => {
            if (display && !event.repeat && (event.key === "Escape" || event.key === "F2")) {
                closeNUI(() => closeMenu());
            }
        },
        [display, closeMenu]
    );

    const onClickReceived = useCallback((event: MouseEvent) => {
        if (display && menuRef.current && !menuRef.current.contains(event.target as Node)) {
            event.preventDefault();
            closeNUI(() => closeMenu());
        }
    }, [menuRef, display, closeMenu])

    useEffect(() => {
        window.addEventListener("contextmenu", onClickReceived);
        window.addEventListener("message", onMessageReceived);
        window.addEventListener("keydown", onKeyDownReceived);

        // onMessageReceived({ data: { ...debugPlayerKeyInventory } } as MessageEvent);

        return () => {
            window.removeEventListener("contextmenu", onClickReceived);
            window.removeEventListener("message", onMessageReceived);
            window.removeEventListener("keydown", onKeyDownReceived);
        };
    }, [onClickReceived, onMessageReceived, onKeyDownReceived]);

    const inventoryRow = useMemo(() => {
        return Math.floor((playerInventory || []).length / 5);
    }, [playerInventory]);

    if (!playerInventory) {
        return null;
    }

    return (
        <>
            {display &&
                <DndContext
                    autoScroll={{
                        enabled: false,
                    }}
                    collisionDetection={rectIntersection}
                    onDragEnd={showCard}
                >
                    <div className={clsx(style.Wrapper)}>
                        <ContainerWrapper
                            display={true}
                            banner={walletBanner}
                            maxWeight={-1}
                        >
                            <ContainerSlots
                                id="player"
                                rows={inventoryRow}
                                items={playerInventory.map((item, i) => ({ ...item, id: i, slot: i + 1, type: 'card' }))}
                                action={interactAction}
                            />
                        </ContainerWrapper>
                    </div>
                </DndContext>
            }
        </>
    )
}
