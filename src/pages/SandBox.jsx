import { Box } from '@mui/material'
import { useCurrentUser } from '../users/providers/UserProvider'
import { Navigate } from 'react-router-dom'


function SandBox({ }) {

    const { user } = useCurrentUser()

    if (!user) {
        return <Navigate to={'/'} replace />
    }

    return (
        <Box>
            <div>
                sandbox
            </div>

        </Box>
    )
}

export default SandBox