import React, { useState } from 'react'
import { useDispatch } from "react-redux";

import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import { CustomFormContainer, useStyles } from './custom-form.styles'
import { setCurrentUser } from "../../redux/user/user.actions";

const CustomForm = ({ hasUsername, hasPassword}) =>  {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogIn = (response) => {
          const user = response.data.user;
          const token = response.data.token;
          dispatch(setCurrentUser({username: user.username, id: user.id, token: token}))
          createNotification(`Welcome back!`);
      }
    

    const handleSubmit = async event => {
        event.preventDefault();
        setUsername('');
        setPassword('');
        const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/login' : 'https://practico.com/login'
    
        try{
         const response = await axios.post(
          apiUrl,
            {
                username: username.toLowerCase(),
                password: password
            }
          )

         await handleLogIn(response)
        }catch(error){
          createNotification(error.message);
        }
    
      }
    
      const createNotification = (message) => {
        return NotificationManager.info(message);
        };
    
    return (
        <CustomFormContainer>
            <div className="sign-in-form">
                <form className={classes.root} noValidate autoComplete="off">
                    <div className="text-fields">
                        <TextField
                            id="outlined-secondary"
                            label="Username"
                            style={{ marginTop: 10 }}
                            variant="outlined"
                            color="#ED462D"
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                            />
                        <TextField
                            id="outlined-secondary"
                            label="Password"
                            type="password"
                            style={{ marginTop: 10 }}
                            variant="outlined"
                            color="#ED462D"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            />
                    </div>
                    <Button variant="contained" style={{ marginTop: 30, width: 200}} onClick={handleSubmit}>Enter Practico</Button>
                </form>
            </div>
        <NotificationContainer />
        </CustomFormContainer>
    )
}

export default CustomForm;