import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, CardActions, IconButton, Tooltip } from "@mui/material";
import { useCurrentUser } from "../../users/providers/UserProvider";
import { useState } from "react";
import { useDeleteCard } from "../../hooks/useDeleteCard";

function BCardFooter({ toggleLike, cardId, likes, onCardDeleted, card, onEditClick, disableActions = false, isMobile }) {
    const { user } = useCurrentUser();
    const [isLike, setIsLike] = useState(likes.includes(user?._id));

    const { deleteCard } = useDeleteCard(onCardDeleted);

    const canDelete = user && card && card.user_id === user._id && !disableActions;
    const canEdit = user && card && card.user_id === user._id && !disableActions;
    const canLike = !disableActions;
    const canCall = !disableActions;

    const handleDeleteClick = async () => {
        if (disableActions) return;

        if (window.confirm('Are you sure you want to delete this card?')) {
            try {
                await deleteCard(cardId);
            } catch (error) {
                console.error('Failed to delete card:', error);
            }
        }
    };

    const handleEditClick = () => {
        if (disableActions || !onEditClick) return;
        onEditClick(card);
    };

    const handleCallClick = () => {
        if (disableActions) return;
        if (card.phone) {
            window.location.href = `tel:${card.phone}`;
        }
    };

    const handleLikeClick = () => {
        if (disableActions) return;
        setIsLike((prev) => !prev);
        toggleLike(cardId);
    };

    const iconSize = isMobile ? 'small' : 'medium';

    const buttonSize = isMobile ? 'small' : 'medium';

    return (
        <CardActions
            sx={{
                display: "flex",
                justifyContent: 'space-between',
                px: { xs: 1, sm: 2 },
                py: { xs: 0.5, sm: 1 },
                mt: 'auto',
                borderTop: 1,
                borderColor: 'divider'
            }}
            disableSpacing
        >
            <Box sx={{ display: 'flex', gap: { xs: 0, sm: 0.5 } }}>
                <Tooltip title={canDelete ? "Delete card" : "You can only delete your own cards"}>
                    <span>
                        <IconButton
                            onClick={handleDeleteClick}
                            disabled={!canDelete}
                            size={buttonSize}
                            sx={{
                                opacity: canDelete ? 1 : 0.3,
                                cursor: canDelete ? 'pointer' : 'not-allowed',
                                color: canDelete ? 'error.main' : 'inherit',
                                '&:hover': canDelete ? {
                                    backgroundColor: 'error.light',
                                    color: 'error.dark'
                                } : {},
                                minWidth: { xs: 40, sm: 'auto' },
                                minHeight: { xs: 40, sm: 'auto' }
                            }}
                        >
                            <DeleteIcon fontSize={iconSize} />
                        </IconButton>
                    </span>
                </Tooltip>

                <Tooltip title="Edit card">
                    <span>
                        <IconButton
                            onClick={handleEditClick}
                            disabled={!canEdit}
                            size={buttonSize}
                            sx={{
                                opacity: canEdit ? 1 : 0.3,
                                cursor: canEdit ? 'pointer' : 'not-allowed',
                                color: 'primary.main',
                                '&:hover': canEdit ? {
                                    backgroundColor: 'primary.light',
                                    color: 'primary.dark'
                                } : {},
                                minWidth: { xs: 40, sm: 'auto' },
                                minHeight: { xs: 40, sm: 'auto' }
                            }}
                        >
                            <EditIcon fontSize={iconSize} />
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>

            <Box sx={{ display: 'flex', gap: { xs: 0, sm: 0.5 } }}>
                <Tooltip title="Call business">
                    <span>
                        <IconButton
                            onClick={handleCallClick}
                            disabled={!canCall}
                            size={buttonSize}
                            sx={{
                                opacity: canCall ? 1 : 0.3,
                                cursor: canCall ? 'pointer' : 'not-allowed',
                                color: 'success.main',
                                '&:hover': canCall ? {
                                    backgroundColor: 'success.light',
                                    color: 'success.dark'
                                } : {},
                                minWidth: { xs: 40, sm: 'auto' },
                                minHeight: { xs: 40, sm: 'auto' }
                            }}
                        >
                            <CallIcon fontSize={iconSize} />
                        </IconButton>
                    </span>
                </Tooltip>

                <Tooltip title={isLike ? "Remove from favorites" : "Add to favorites"}>
                    <span>
                        <IconButton
                            onClick={handleLikeClick}
                            disabled={!canLike}
                            size={buttonSize}
                            sx={{
                                opacity: canLike ? 1 : 0.3,
                                cursor: canLike ? 'pointer' : 'not-allowed',
                                color: user && isLike && !disableActions ? 'error.main' : 'text.secondary',
                                '&:hover': canLike ? {
                                    backgroundColor: user && isLike ? 'error.light' : 'action.hover',
                                    color: user && isLike ? 'error.dark' : 'text.primary'
                                } : {},
                                minWidth: { xs: 40, sm: 'auto' },
                                minHeight: { xs: 40, sm: 'auto' }
                            }}
                        >
                            <FavoriteIcon fontSize={iconSize} />
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>
        </CardActions>
    );
}

export default BCardFooter;