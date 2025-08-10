
import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const updateSearchTerm = (term) => {
        setSearchTerm(term);
    };

    const value = {
        searchTerm,
        updateSearchTerm,
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};