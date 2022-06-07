import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from "@material-ui/core/styles";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuList from '@mui/material/MenuList';
import GameIcon from '@mui/icons-material/VideogameAsset';

const useStyle = makeStyles(() => ({
    header: {
        background: "#000",
    },

}));


export default function Header() {
    const classes = useStyle();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className={classes.header}>
                    <Button
                        id="basic-button"
                        aria-label="menu"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        size="large"
                        edge="start"
                        color="secondary"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                        Pages
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}

                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuList>

                            <MenuItem onClick={handleClose} ><HomeIcon />
                                <Link to="/" style={{ textDecoration: 'none', display: 'block', color: '#9c27b0' }}>Home Page</Link>
                            </MenuItem>


                            <MenuItem onClick={handleClose}><GameIcon />
                                <Link to="/tictactoe" style={{ textDecoration: 'none', display: 'block', color: '#9c27b0' }}>TicTacToe</Link>
                            </MenuItem>

                        </MenuList>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
