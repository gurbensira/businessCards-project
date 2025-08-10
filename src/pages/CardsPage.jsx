import { Typography, Button, Box, Container } from "@mui/material";
import { useEffect, useRef } from "react";
import BCards from "../cards/components/BCards";
import { useSnack } from "../providers/SnackbarProvider";
import { useCallback } from "react";
import { useCurrentUser } from '../users/providers/UserProvider'
import { useSearch } from '../providers/SearchProvider';
import { useCardSearch } from '../hooks/useCardSearch';
import { useCardPagination } from '../hooks/useCardPagination';
import { useCards } from '../hooks/useCards';
import { useToggleLike } from '../hooks/useToggleLike';

function CardsPage() {
    const { token } = useCurrentUser();
    const { cards: allCards, updateCardInState, removeCardFromState } = useCards();
    const { searchTerm } = useSearch();
    const setSnack = useSnack();
    const isInitializedRef = useRef(false);

    const {
        displayedCards,
        loading: loadingMore,
        hasMoreCards,
        loadMoreCards,
        initializeCardPagination,
        syncWithAllCards,
        totalCards,
        loadedCardsMessage,
        updateCardInPagination,
        removeCardFromPagination
    } = useCardPagination(allCards, 10);

    const {
        filteredCards,
        filteredCount,
        hasResults,
        isSearching,
        searchTerm: cleanSearchTerm
    } = useCardSearch(allCards, searchTerm);

    const updateCard = useCallback((cardId, updates) => {
        updateCardInState(cardId, updates);
        updateCardInPagination(cardId, updates);
    }, [updateCardInState, updateCardInPagination]);

    const handleCardDeleted = useCallback((cardId) => {
        removeCardFromState(cardId);
        if (removeCardFromPagination) {
            removeCardFromPagination(cardId);
        }
    }, [removeCardFromState, removeCardFromPagination]);

    const { toggleLike } = useToggleLike(updateCard);

    const handleLoadMore = useCallback(() => {
        loadMoreCards();
        setTimeout(() => {
            setSnack("success", loadedCardsMessage);
        }, 350);
    }, [loadMoreCards, loadedCardsMessage, setSnack]);

    useEffect(() => {
        if (allCards.length > 0 && !isInitializedRef.current) {
            initializeCardPagination();
            isInitializedRef.current = true;
        } else if (allCards.length > 0 && isInitializedRef.current) {

            syncWithAllCards();
        }
    }, [allCards, initializeCardPagination, syncWithAllCards]);

    const cardsToShow = isSearching ? filteredCards : displayedCards;

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ width: '100%' }}>
                <Typography color="primary" variant="h4" sx={{ mb: 2, ml: 2 }}>Cards Page</Typography>
                <Typography color="text.secondary" variant="h5" sx={{ mb: 2, ml: 2 }}>Here you can find business cards from all categories</Typography>
            </Box>
            {isSearching && (
                <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
                    {hasResults
                        ? `Found ${filteredCount} card(s) matching "${cleanSearchTerm}"`
                        : `No cards found matching "${cleanSearchTerm}"`
                    }
                </Typography>
            )}

            <BCards
                cards={cardsToShow}
                toggleLike={toggleLike}
                onCardDeleted={handleCardDeleted}
                onCardUpdated={updateCard}
            />

            {!isSearching && hasMoreCards && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
                    <Button
                        variant="contained"
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        size="large"
                        sx={{
                            minWidth: 150,
                            py: 1.5
                        }}
                    >
                        {loadingMore ? 'Loading...' : 'Load More'}
                    </Button>
                </Box>
            )}

            {!isSearching && (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: 'center', mt: 2 }}
                >
                    Showing {displayedCards.length} of {totalCards} cards
                </Typography>
            )}
        </Box>
    );
}

export default CardsPage;