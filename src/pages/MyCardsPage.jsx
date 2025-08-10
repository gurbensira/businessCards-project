import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import CreateBCardForm from '../cards/components/CreateBCardForm'
import { useCurrentUser } from '../users/providers/UserProvider';
import BCards from '../cards/components/BCards';
import { useSnack } from "../providers/SnackbarProvider";
import { Navigate } from 'react-router-dom';
import { useCards } from '../hooks/useCards';
import { useToggleLike } from '../hooks/useToggleLike';
import QueueIcon from '@mui/icons-material/Queue';

function MyCardsPage() {
    const { user, token } = useCurrentUser()
    if (!user) {
        return <Navigate to={'/'} replace />
    }

    const [showForm, setShowForm] = useState(false);
    const { cards, getCardsFromServer, updateCardInState, removeCardFromState } = useCards();
    const [myCards, setMyCards] = useState([])
    const setSnack = useSnack();

    const updateMyCard = useCallback((cardId, updates) => {
        updateCardInState(cardId, updates);
        setMyCards(prev => prev.map(card =>
            card._id === cardId ? { ...card, ...updates } : card
        ));
    }, [updateCardInState]);

    const handleCardDeleted = useCallback((cardId) => {
        removeCardFromState(cardId);
        setMyCards(prev => prev.filter(card => card._id !== cardId));
    }, [removeCardFromState]);

    const { toggleLike } = useToggleLike(updateMyCard);

    const handleCardCreated = useCallback(() => {
        getCardsFromServer();
        setShowForm(false);
        setSnack("success", "Card created successfully!");
    }, [getCardsFromServer, setSnack]);

    useEffect(() => {
        if (user && user._id) {
            setMyCards(cards.filter((c) => c.user_id === user._id))
        }
    }, [cards, user]);

    const handleClick = () => {
        setShowForm(true)
        if (user && user._id) {
            setMyCards(cards.filter((c) => c.user_id === user._id))
        }
    }

    const handleClearClick = () => {
        setShowForm(false)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%', pb: 1 }}>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                flexShrink: 0
            }}>
                <Box sx={{ width: '100%' }}>
                    <Typography color="primary" variant="h4" sx={{ mb: 2, ml: 2 }}>My Card Page</Typography>
                    <Typography color="text.secondary" variant="h5" sx={{ mb: 2, ml: 2 }}>Here you can find all the cards you have created.
                    </Typography>
                    <Box sx={{ display: 'flex', width: 'fit-content', alignItems: 'center', ml: 2 }}>
                        <Typography color='text.secondary' variant="h6"  >
                            To create a new card, click the create button.
                        </Typography>
                    </Box>
                </Box>
                <Button variant='contained' onClick={handleClick} sx={{
                    mr: 1,

                    width: '85px'
                }}><Typography sx={{ fontSize: 12 }}>Create</Typography> <QueueIcon sx={{ fontSize: 16, pl: 0.5 }} /> </Button>
            </Box>

            <Box sx={{
                backgroundColor: '#c3e6ffff',
                borderRadius: '5px',
                position: 'fixed',
                marginTop: '10px',
                height: 'fit-content',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                zIndex: 10000,
            }}>

                {showForm && (
                    <CreateBCardForm
                        onClick={handleClearClick}
                        onCardCreated={handleCardCreated}
                    />
                )}
            </Box>

            <BCards
                cards={myCards}
                toggleLike={toggleLike}
                onCardDeleted={handleCardDeleted}
                onCardUpdated={updateMyCard}
            />
        </Box>
    )
}

export default MyCardsPage