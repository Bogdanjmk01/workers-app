import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Header = () => {
    const navigate = useNavigate();
    const logout = () => {
        window.localStorage.removeItem('user');
        navigate('/login');
    };

    const drawerWidth = 240;
    const navItems = [<a href="/home" style={{color: '#FFF', textDecoration: 'none', fontSize: '0.8rem'}}>Home</a>, <a style={{color: '#FFF', textDecoration: 'none', fontSize: '0.8rem'}} href="../../../login" onClick={logout}>Logout</a>];

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', backgroundColor: 'black', color: '#FFF', height: '100%' }}>
            <Typography variant="h5" sx={{ my: 2 }}>
                Welcome
            </Typography>
            <Divider />
            <List>
                {navItems?.map((item) => (
                    <ListItem key={item.href} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <div className="font-normal">
            <Box sx={{ display: 'flex',
                '& .MuiToolbar-root': {
                    backgroundColor: 'black',
                    color: '#FFF'
                }}}>
                <AppBar component="nav">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textAlign: 'start' }}>
                            Welcome
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems?.map((item) => (
                                <Button key={item.href} sx={{color: '#fff'}}>
                                    {item}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
            </Box>
        </div>
    );
};

export default Header;
