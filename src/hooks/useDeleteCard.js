import { useCallback } from 'react';
import axios from 'axios';
import { useCurrentUser } from '../users/providers/UserProvider';
import { useSnack } from '../providers/SnackbarProvider';

export const useDeleteCard = (removeCardCallback) => {
    const { token } = useCurrentUser();
    const setSnack = useSnack();

    const deleteCard = useCallback(async (cardId) => {
        try {
            await axios.delete(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
                { headers: { 'x-auth-token': token } }
            );

            if (removeCardCallback) {
                removeCardCallback(cardId);
            }

            setSnack("success", "Card deleted successfully");

            return true;
        } catch (error) {
            console.error('Delete card error:', error);

            if (error.response?.status === 401) {
                setSnack("error", "You must be logged in to delete cards");
            } else if (error.response?.status === 403) {
                setSnack("error", "You can only delete your own cards");
            } else if (error.response?.status === 404) {
                setSnack("error", "Card not found");
            } else {
                setSnack("error", "Failed to delete card");
            }

            throw error;
        }
    }, [token, setSnack, removeCardCallback]);

    return { deleteCard };
};