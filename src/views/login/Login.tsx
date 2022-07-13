import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {UserContext} from '../../context/UserContext'

const Login = () => {

    const fakeAccess = {
        email: 'admin@mail.com',
        password: 'password',
    }

    const handleChange = (e: any): void => {
        e.preventDefault()
    }

    const { setUserContext } = useContext( UserContext )
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const validEmail = data.get('email') === fakeAccess.email
        const validPass = data.get('password') === fakeAccess.password
        if(!validEmail && !validPass)
            throw false
        return setUserContext(true)
    }
    
    return (
        <Container
            component="main"
            maxWidth="xs">
            <CssBaseline />
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Avatar
                    sx={{ m: 1, bgcolor: 'primary.main' }}></Avatar>
                <Typography
                    component="h1"
                    variant="h5">
                    Entrar
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        onCut={handleChange}
                        onCopy={handleChange}
                        onPaste={handleChange}
                        autoFocus/>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password" />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>
                        Entrar
                    </Button>
                </Box>

            </Box>
        </Container>
    )
}

export default Login