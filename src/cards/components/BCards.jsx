import { Box } from "@mui/material";
import BCard from "./BCard";
import { useState } from "react";
import EditBCardForm from "./EditBCardForm";

function BCards({ cards, toggleLike, onCardDeleted, onCardUpdated }) {
    const [editingCard, setEditingCard] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);

    const handleEditClick = (card) => {
        setEditingCard(card);
        setShowEditForm(true);
    };

    const handleEditFormClose = () => {
        setShowEditForm(false);
        setEditingCard(null);
    };

    const handleCardUpdated = (updatedCard) => {
        if (onCardUpdated) {
            onCardUpdated(updatedCard._id, updatedCard);
        }

        handleEditFormClose();

        console.log("Card updated successfully:", updatedCard);
    };

    return (
        <>
            {showEditForm && editingCard && (
                <EditBCardForm
                    onClick={handleEditFormClose}
                    onCardUpdated={handleCardUpdated}
                    card={editingCard}
                />
            )}

            <Box sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 2,
                mt: 2,
                width: '85%'
            }}>
                {cards.map((card) => (
                    <BCard
                        key={card._id}
                        card={card}
                        toggleLike={toggleLike}
                        onCardDeleted={onCardDeleted}
                        onEditClick={handleEditClick}
                        disableInternalEdit={true}
                    />
                ))}
            </Box>
        </>
    );
}

export default BCards;