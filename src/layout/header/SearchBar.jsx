import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useState, useEffect } from 'react';
import { useSearch } from '../../providers/SearchProvider';
import { useTheme, useMediaQuery } from '@mui/material';

export default function SearchBar() {
    const [inputValue, setInputValue] = useState('');
    const { searchTerm, updateSearchTerm } = useSearch();

    // Responsive breakpoints
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (!searchTerm) {
            setInputValue('');
        }
    }, [searchTerm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSearchTerm(inputValue);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearchClick = () => {
        updateSearchTerm(inputValue);
    };

    const handleClearClick = () => {
        updateSearchTerm('');
    };

    const getSearchBarWidth = () => {
        if (isMobile) return '100%';
        if (isTablet) return 250;
        return 300;
    };

    const getSearchBarHeight = () => {
        if (isMobile) return 36;
        return 40;
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: getSearchBarWidth(),
                maxWidth: { xs: '100%', sm: 300 },
                height: getSearchBarHeight(),
                minWidth: { xs: 'auto', sm: 200 }
            }}
        >
            <InputBase
                sx={{
                    ml: 1,
                    flex: 1,
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
                placeholder={isMobile ? "Search..." : "Search by title or city..."}
                inputProps={{ 'aria-label': 'search cards' }}
                value={inputValue}
                onChange={handleInputChange}
            />

            {searchTerm && (
                <IconButton
                    type="button"
                    sx={{
                        p: { xs: '6px', sm: '8px' },
                        '& .MuiSvgIcon-root': {
                            fontSize: { xs: '1rem', sm: '1.25rem' }
                        }
                    }}
                    aria-label="clear search"
                    onClick={handleClearClick}
                    size="small"
                >
                    <ClearIcon fontSize="small" />
                </IconButton>
            )}

            <IconButton
                type="button"
                sx={{
                    p: { xs: '6px', sm: '10px' },
                    '& .MuiSvgIcon-root': {
                        fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }
                }}
                aria-label="search"
                onClick={handleSearchClick}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}