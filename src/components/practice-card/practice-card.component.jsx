import React, { useState } from 'react'
import { PracticeCardContainer } from './practice-card.styles'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Timer from '../timer/timer.component'
const PracticeCard = ({title, start_date, time_type, total_duration, current_period_duration, goal}) => {
    const [open, setOpen] = useState(false);    

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <PracticeCardContainer>
            <h3>{title}</h3>
            <p>Started: {start_date}</p>
            <p>My Goal: {goal} {time_type}</p>
            <p>I've done: {total_duration}</p>
            <p>My current streak: {current_period_duration}</p>
            <p className="check-in-button" onClick={handleClickOpen}>
                Check In
            </p>
            <Dialog open={open} onClose={handleClose} fullWidth={'sm'}
                maxWidth={'sm'} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Practice</DialogTitle>
                <DialogContent>
                    <Timer />
                </DialogContent>
            </Dialog>
        </PracticeCardContainer>
    )
}

export default PracticeCard;