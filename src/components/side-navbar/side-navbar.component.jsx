import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentUser } from '../../redux/user/user.actions'
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './side-navbar.styles'
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

import axios from 'axios';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';




const  SideNavbar = () =>  {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


    const handleLogOut = async () => {
      const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/logout' : 'https://practico.com/logout'
      try{
        const response = await axios.post(apiUrl, { withCredentials: true}, 
          { headers: { Authorization: `Bearer ${currentUser.token}` }
      })
        
        await dispatch(setCurrentUser(null));
        await createNotification('You have succesfully logged out.');
      }catch(error){
        console.log(error)
      }
    
    }

    const createNotification = (message) => {
    return NotificationManager.info(message);
    };


  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List classes={{
          linkText: classes.linkText,
        }}>
          {['Home', 'Practices', 'Settings'].map((text, index) => (
            <Link to={text !== 'Home' ? `/${text.toLowerCase()}`: '/'}> 
              <ListItem button key={text}>
                <ListItemIcon>
                  {text  === 'Home' ?
                    <DashboardIcon /> 
                    : 
                    text === 'Practices' ? 
                    <FitnessCenterIcon /> 
                    :
                    <SettingsIcon />}
                  </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button key={'Sign Out'} onClick={() => handleLogOut()}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary={'Sign Out'} />
            </ListItem>
        </List>
      </Drawer>
      <NotificationContainer />
    </div>
  );
}

export default SideNavbar;