import { useCallback } from 'react';
import axios from 'axios';
import { useCurrentUser } from '../users/providers/UserProvider';
import { useSnack } from '../providers/SnackbarProvider';

export const useToggleLike = (updateCardCallback) => {
    const { token } = useCurrentUser();
    const setSnack = useSnack();

    const toggleLike = useCallback(async (cardId) => {
        try {
            const response = await axios.patch(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
                {},
                { headers: { 'x-auth-token': token } }
            );

            if (updateCardCallback) {
                updateCardCallback(cardId, { likes: response.data.likes });
            }

            return response.data;
        } catch (error) {
            console.error(error);
            setSnack("error", "Failed to update like status");
            throw error;
        }
    }, [token, setSnack, updateCardCallback]);

    return { toggleLike };
};