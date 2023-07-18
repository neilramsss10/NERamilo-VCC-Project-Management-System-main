import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskIcon from '@mui/icons-material/Task';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import vcclogo from '../../images/vcclogo.png';

  const Sidebar = () => {
    const isDesktop = useMediaQuery('(min-width: 1025px)');
    const [isOpen, setIsOpen] = useState(isDesktop);

    const handleDrawerOpen = () => {
      setIsOpen(true);
    };
  
    const handleDrawerClose = () => {
      setIsOpen(false);
    };

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('profile');
    dispatch({ type: 'LOGOUT' });
    navigate('loginpage');
    setUser(null);
  }, [dispatch, navigate, setUser]);
  
  const checkTokenExpiration = useCallback((token) => {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      logout();
    }
  }, [logout]);
  
  useEffect(() => {
    const token = user?.token;
    if (token) {
      checkTokenExpiration(token);
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [checkTokenExpiration, setUser, user?.token]);

  let currentUser = {
    1: "General Manager",
    2: "Project Manager 1",
    3: "Project Manager 2",
    4: "Project Manager 3",
    5: "Project Manager 4",
    6: "Project Manager 5",
  }
  let userId = user?.result?.rows[0]?.users_id;
return (
  <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    {isDesktop && (
      <Box
        background="#FF0000"
        component="nav"
        sx={{
          width: { sm: 240 },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              borderRadius: '25px',
              backgroundColor: '#FAACA8',
              backgroundImage: `linear-gradient(0deg, #FF1913 5%, #FFFFFF 95%)`,
              transition: 'width 0.2s ease-in-out',
            },
            '& .MuiDrawer-paperOpen': {
              width: 240,
            },
          }}
          open={isOpen}
          onClose={handleDrawerClose}
        >
          <Toolbar>
            <img src={vcclogo} alt="vcclogo" height="60px" width="150px" />
          </Toolbar>
          <Toolbar><AccountBoxIcon/>&nbsp;<strong>{currentUser[userId]}</strong></Toolbar>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/projects">
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Projects" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/tasks">
                <ListItemIcon>
                  <TaskIcon />
                </ListItemIcon>
                <ListItemText primary="Tasks" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    )}
<Box
  sx={{
    width: { xs: '100%', sm: '100%', md: 'auto' },
    display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' },
    justifyContent: 'flex-start',
  }}
>
  {isOpen ? null : (
    <IconButton
      color="inherit"
      aria-label="open sidebar"
      onClick={handleDrawerOpen}
      sx={{ display: { xs: 'block', md: 'none' } }}
    >
      <MenuIcon />
    </IconButton>
  )}
  {isDesktop && isOpen && (
    <Toolbar>
      <AccountBoxIcon />
      <strong>{currentUser[userId]}</strong>
    </Toolbar>
  )}
  {!isDesktop && isOpen && (
    <Box
      component="nav"
      sx={{
        width: 240,
        borderRadius: '25px',
        backgroundColor: '#FAACA8',
        backgroundImage: `linear-gradient(0deg, #FF1913 5%, #FFFFFF 95%)`,
        position: 'absolute',
        top: 64,
        left: 0,
        bottom: 0,
        transition: 'all 0.2s ease-in-out',
        zIndex: 1201,
      }}
    >
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <IconButton
          color="inherit"
          aria-label="close sidebar"
          onClick={handleDrawerClose}
          sx={{ ml: 'auto' }}
        >
          <CloseIcon />
          </IconButton>
        </Toolbar>
        <Toolbar>
          <img src={vcclogo} alt="vcclogo" height="60px" width="150px" />
        </Toolbar>
        <Toolbar><AccountBoxIcon/>&nbsp;<strong>{currentUser[userId]}</strong></Toolbar>
        <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/projects">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/tasks">
            <ListItemIcon>
              <TaskIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )}
  </Box>
  <Box sx={{ flexGrow: 1 }} />
  </Box>
  );
}

export default Sidebar;
  