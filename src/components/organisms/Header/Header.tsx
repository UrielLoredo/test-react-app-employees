import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { UserContext } from '../../../context/UserContext';
import Button from '@mui/material/Button';

import { HeaderProps } from './header.interface';

const Header: React.FC<HeaderProps> = ({
    menu
}) => {
    
    const { userContext, setUserContext } = useContext( UserContext )

    const handleLogout = (e: any) => {
        e.preventDefault()
        setUserContext(false)
    }

    const isAuth = userContext

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="a"
                        href="#/"
                        color="inherit"
                        sx={{
                            textDecoration: 'none',
                            flexGrow: 1
                        }}>
                        React Test
                    </Typography>
                    {menu.map((item, itemIndex: number) => { 
                        return (
                            <Typography
                                key={itemIndex}
                                variant="button"
                                noWrap
                                component="a"
                                href={`#${item.path}`}
                                sx={{
                                    mr: 2,
                                    fontWeight: 600,
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                {item.name}
                            </Typography>
                        )
                    })}
                    {isAuth &&
                        <Button
                            onClick={handleLogout}
                            sx={{
                                mr: 2,
                                fontWeight: 600,
                                color: '#fff',
                                textDecoration: 'none',
                            }}
                            variant="outlined">
                            Salir
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
