import React from 'react'
import { Backdrop, Paper, Button } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const index = ({children, isOpen, onClose}) => {
    return (
        <Backdrop style={{zIndex:500}} open={isOpen}>
            <Paper elevation={3} style={{padding: "52px", position:"relative", maxWidth: '500px'}} >
                {
                    children
                }
                <Button onClick={onClose} style={{position:"absolute" , top: "10px", right:"10px", outline:"none"}} >
                    <Close />
                </Button>
            </Paper>
        </Backdrop>
    )
}

export default index
