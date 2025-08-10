import { Favorite } from '@mui/icons-material'
import { Box, Link, Typography } from '@mui/material'
import React from 'react'

function CardDetails({ card }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
                <Typography variant="h2" color="initial"
                >{card.title}</Typography>
                <Typography variant="h2" color="initial">{card.subtitle}</Typography>
            </Box>
            <Box>
                <Typography variant="h5">Owner description of the business:</Typography>
                <Typography variant="h4" color="initial">{card.description}</Typography>

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='h5'>Email:</Typography>
                <Typography variant='h5'>{card.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='h5'>Website:</Typography>
                <Link href={`https://${card.web}`} target='_blank' rel="noopener noreferrer" >
                    <Typography variant='h5'>{card.web}</Typography></Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Favorite color='error' /> <Typography variant='h5'>{card.likes.length} likes</Typography>
            </Box>
        </Box>
    )
}

export default CardDetails