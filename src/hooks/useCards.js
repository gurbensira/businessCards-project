import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useSnack } from '../providers/SnackbarProvider';

export const useCards = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const setSnack = useSnack();

    const getCardsFromServer = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
            );
            setCards(response.data);
            setSnack("success", "Cards loaded successfully");
            return response.data;
        } catch (error) {
            setSnack("error", "Failed to load cards");
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [setSnack]);

    const updateCardInState = useCallback((cardId, updates) => {
        setCards(prev => prev.map(card =>
            card._id === cardId ? { ...card, ...updates } : card
        ));
    }, []);

    const removeCardFromState = useCallback((cardId) => {
        setCards(prev => prev.filter(card => card._id !== cardId));
    }, []);

    useEffect(() => {
        getCardsFromServer();
    }, [getCardsFromServer]);

    return {
        cards,
        setCards,
        loading,
        getCardsFromServer,
        updateCardInState,
        removeCardFromState
    };
};