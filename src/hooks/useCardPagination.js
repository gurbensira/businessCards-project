import { useState, useCallback } from 'react';

export const useCardPagination = (allCards = [], cardsPerPage = 10) => {
    const [displayedCards, setDisplayedCards] = useState([]);
    const [loadedCount, setLoadedCount] = useState(cardsPerPage);
    const [loading, setLoading] = useState(false);

    const initializeCardPagination = useCallback(() => {
        const initialCards = allCards.slice(0, cardsPerPage);
        setDisplayedCards(initialCards);
        setLoadedCount(cardsPerPage);
    }, [allCards, cardsPerPage]);

    const loadMoreCards = useCallback(() => {
        if (loading || loadedCount >= allCards.length) return;

        setLoading(true);

        setTimeout(() => {
            const newLoadedCount = loadedCount + cardsPerPage;
            const newDisplayedCards = allCards.slice(0, newLoadedCount);

            setDisplayedCards(newDisplayedCards);
            setLoadedCount(newLoadedCount);
            setLoading(false);
        }, 300);
    }, [loading, loadedCount, allCards, cardsPerPage]);

    const resetCardPagination = useCallback(() => {
        setDisplayedCards([]);
        setLoadedCount(cardsPerPage);
        setLoading(false);
    }, [cardsPerPage]);

    const updateCardInPagination = useCallback((cardId, updatedCardData) => {
        setDisplayedCards(prev => prev.map(card =>
            card._id === cardId ? { ...card, ...updatedCardData } : card
        ));
    }, []);

    const removeCardFromPagination = useCallback((cardId) => {
        setDisplayedCards(prev => prev.filter(card => card._id !== cardId));
        setLoadedCount(prev => Math.max(prev - 1, 0));
    }, []);

    const syncWithAllCards = useCallback(() => {
        const currentDisplayedCards = allCards.slice(0, loadedCount);
        setDisplayedCards(currentDisplayedCards);
    }, [allCards, loadedCount]);

    const hasMoreCards = loadedCount < allCards.length;
    const totalCards = allCards.length;
    const loadedCardsMessage = `Loaded ${Math.min(cardsPerPage, allCards.length - (loadedCount - cardsPerPage))} more cards`;

    return {
        displayedCards,
        loading,
        hasMoreCards,
        totalCards,
        loadedCount,

        loadMoreCards,
        initializeCardPagination,
        resetCardPagination,
        updateCardInPagination,
        removeCardFromPagination,
        syncWithAllCards,

        loadedCardsMessage
    };
};