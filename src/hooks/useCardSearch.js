import { useMemo } from 'react';

export const useCardSearch = (cards, searchTerm) => {
    const filteredCards = useMemo(() => {
        if (!searchTerm || !searchTerm.trim()) {
            return cards;
        }

        const lowerSearchTerm = searchTerm.toLowerCase();

        return cards.filter(card => {
            const titleMatch = card.title?.toLowerCase().includes(lowerSearchTerm);
            const cityMatch = card.address?.city?.toLowerCase().includes(lowerSearchTerm);
            const countryMatch = card.address?.country?.toLowerCase().includes(lowerSearchTerm);
            const streetMatch = card.address?.street?.toLowerCase().includes(lowerSearchTerm);
            const stateMatch = card.address?.state?.toLowerCase().includes(lowerSearchTerm);
            const subtitleMatch = card.subtitle?.toLowerCase().includes(lowerSearchTerm);
            const descriptionMatch = card.description?.toLowerCase().includes(lowerSearchTerm);

            return titleMatch || cityMatch || countryMatch || streetMatch || stateMatch || subtitleMatch || descriptionMatch;
        });
    }, [cards, searchTerm]);

    return {
        filteredCards,
        totalCards: cards.length,
        filteredCount: filteredCards.length,
        hasResults: filteredCards.length > 0,
        isSearching: Boolean(searchTerm && searchTerm.trim()),
        searchTerm: searchTerm?.trim() || ''
    };
};