import { Box, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useCurrentUser } from '../users/providers/UserProvider'
import { Navigate } from 'react-router-dom'
import BCards from '../cards/components/BCards';
import { useSearch } from '../providers/SearchProvider';
import { useCardSearch } from '../hooks/useCardSearch';
import { useCards } from '../hooks/useCards';
import { useToggleLike } from '../hooks/useToggleLike';

function FavoriteCardsPage() {
    const { token, user } = useCurrentUser()

    if (!user) {
        return <Navigate to={'/'} replace />
    }

    const { cards, updateCardInState, removeCardFromState } = useCards();
    const { searchTerm, clearSearch } = useSearch();
    const [favoriteCards, setFavoriteCards] = useState([])


    const {
        filteredCards,
        filteredCount,
        hasResults,
        isSearching,
        searchTerm: cleanSearchTerm
    } = useCardSearch(favoriteCards, searchTerm);

    const updateFavoriteCard = useCallback((cardId, updates) => {
        updateCardInState(cardId, updates);

        setFavoriteCards(prevFavorites =>
            prevFavorites.map(card =>
                card._id === cardId ? { ...card, ...updates } : card
            )
        );

        if (updates.likes && !updates.likes.includes(user._id)) {
            setFavoriteCards(prevFavorites =>
                prevFavorites.filter(card => card._id !== cardId)
            );
        }
    }, [updateCardInState, user._id]);

    const handleCardDeleted = useCallback((cardId) => {
        removeCardFromState(cardId);
        setFavoriteCards(prevFavorites =>
            prevFavorites.filter(card => card._id !== cardId)
        );
    }, [removeCardFromState]);

    const { toggleLike } = useToggleLike(updateFavoriteCard);

    useEffect(() => {
        if (cards && cards.length > 0 && user) {
            setFavoriteCards(cards.filter((c) => c.likes.includes(user._id)))
        }
    }, [cards, user]);

    return (
        <Box sx={{ pt: 2, pb: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            <Box sx={{ width: '100%' }}>
                <Typography color="primary" variant="h4" sx={{ mb: 2, ml: 2 }}>Favorite Cards Page</Typography>
                <Typography color="text.secondary" variant="h5" sx={{ mb: 2, ml: 2 }}>Here you can find all youre favorite cards</Typography>
            </Box>

            {isSearching && (
                <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
                    {hasResults
                        ? `Found ${filteredCount} favorite card(s) matching "${cleanSearchTerm}"`
                        : `No favorite cards found matching "${cleanSearchTerm}"`
                    }
                </Typography>
            )}

            <BCards
                cards={filteredCards}
                toggleLike={toggleLike}
                onCardDeleted={handleCardDeleted}
                onCardUpdated={updateFavoriteCard}
            />

        </Box>
    )
}

export default FavoriteCardsPage