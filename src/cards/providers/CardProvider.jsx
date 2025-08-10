import { createContext, useContext, useState } from 'react';

const CardContext = createContext();

export const CardProvider = ({ children }) => {
    const [selectedCard, setSelectedCard] = useState(null);

    const selectCard = (cardData) => {
        setSelectedCard(cardData);
    };

    const clearCard = () => {
        setSelectedCard(null);
    };

    return (
        <CardContext.Provider value={{
            selectedCard,
            selectCard,
            clearCard
        }}>
            {children}
        </CardContext.Provider>
    );
};

export const useCard = () => {
    const context = useContext(CardContext);
    if (!context) {
        throw new Error('useCard must be used within a CardProvider');
    }
    return context;
};