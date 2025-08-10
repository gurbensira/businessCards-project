import { CardContent, Divider, Typography } from "@mui/material";

function BCardBody({ title, subtitle, phone, city, bizNumber, onClick }) {
    return (
        <CardContent
            sx={{
                '&:hover': { cursor: 'pointer' },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 0.5, sm: 1 },
                py: { xs: 1.5, sm: 2 },
                px: { xs: 1.5, sm: 2 },
                overflow: 'hidden'
            }}
            onClick={onClick}
        >
            <Typography
                variant="h5"
                sx={{
                    fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem' },
                    fontWeight: 600,
                    lineHeight: 1.2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    mb: { xs: 0.5, sm: 0.5 }
                }}
                title={title}
            >
                {title}
            </Typography>

            <Typography
                variant="h6"
                sx={{
                    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                    fontWeight: 400,
                    color: 'text.secondary',
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    mb: { xs: 1, sm: 1 }
                }}
                title={subtitle}
            >
                {subtitle}
            </Typography>

            <Divider sx={{ my: { xs: 0.5, sm: 1 } }} />

            <Typography
                variant="body2"
                sx={{
                    fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
                    mb: { xs: 0.5, sm: 0.5 },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                }}
            >
                <strong>Phone:</strong>
                <span style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {phone}
                </span>
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
                    mb: { xs: 0.5, sm: 0.5 },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                }}
            >
                <strong>Address:</strong>
                <span style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {city}
                </span>
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                    color: 'text.secondary',
                    mt: 'auto',
                    opacity: { xs: 0.7, sm: 1 }
                }}
            >
                Card Number: {bizNumber}
            </Typography>
        </CardContent>
    );
}

export default BCardBody;