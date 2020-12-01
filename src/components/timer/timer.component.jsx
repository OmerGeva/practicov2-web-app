import React, { useState } from 'react'
import { TimerContainer } from './timer.styles'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import axios from 'axios';
import { useSelector } from 'react-redux';

import StopIcon from '@material-ui/icons/Stop';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Timer = ({practice}) => {
    const currentUser = useSelector(state => state.user.currentUser);

    const [counting, setCounting] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    const startTimer = () => {
        setCounting(!counting);
        
    }

    const stopTimer = () => {
        setCounting(!counting);
    }

    if(counting){
        setTimeout(() => {
            if(seconds < 58){
                setSeconds(seconds + 1);
            }
            else if(minutes < 58){
                setSeconds(0);
                setMinutes(minutes + 1);
            }
            else{
                setSeconds(0);
                setMinutes(0);
                setHours(hours + 1);
            }
        }, 1000);
    }
    const createNotification = (message) => {
        return NotificationManager.info(message);
        };

    const handleSubmit = async () => {
        if(minutes >= 1){

            const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/check_ins' : 'https://practico.com/check_ins'
            try{
                const response = await axios.post(
                    apiUrl,
                    {
                        check_in: {
                            duration: `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`,
                            learnings: 'it was a great practice',
                            practice_id: 1
                        }
                    },
                    { headers: { Authorization: `Bearer ${currentUser.token}` } }
                    )
                    await console.log(response.data);
                    
                    // await setAllPractices([...allPractices, response.data.practice])
                    // await handleClose()
                    // await createNotification('Good Luck!')

            }catch(error){
                console.log(error)
            }
        }
        else{
            createNotification('Please practice more.')
        }
    }

    return (
        <TimerContainer>
            <div className="timer-circle">
                <div className="start-stop">
                    {
                        counting ? 
                            <StopIcon className="stop-icon" onClick={stopTimer}/>
                        : 
                            <PlayArrowIcon className="start-icon" onClick={startTimer}/>
                    }
                </div>
                <div className="countdown">
                {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </div>

            </div>
            <div className={counting ? "save-check-in disabled" : "save-check-in"} onClick={counting ? '' : handleSubmit}>
                <p>  Save check in!</p>
            </div>
            <NotificationContainer />
        </TimerContainer>
    )
}

export default Timer;