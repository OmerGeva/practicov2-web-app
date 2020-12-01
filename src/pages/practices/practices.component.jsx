import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { PracticesPageContainer } from './practices.styles'
import PracticeCard from '../../components/practice-card/practice-card.component'
import NewChallengeForm from '../../components/new-challenge-form/new-challenge-form.component'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

const PracticesPage = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const [open, setOpen] = useState(false);    
    const [allPractices, setAllPractices] = useState([]);


    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
        
    
    const getAllPractices = async () => {
        
        const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/practices' : 'https://practico.com/practices'
        try{
            const response = await axios.get(apiUrl, 
            { headers: { Authorization: `Bearer ${currentUser.token}` }
        })
        // if(JSON.stringify(allPractices) !== JSON.stringify(response.data.practices)){
            await setAllPractices(response.data.practices);
        // }
        }catch(error){
            console.log(error)
        }
          
        }

    useEffect(() => {
        getAllPractices();
    },[]) 


    return (
        <PracticesPageContainer>
            <div className="title-container">
                <h1>My practices</h1>
                <ControlPointIcon onClick={handleClickOpen} className='new-challenge'/>
            </div>
            <div className="practice-cards-container">
                {
                    allPractices.map(practice => 
                        <PracticeCard {...practice}/>
                        )
                }
            </div>


      <Dialog open={open} onClose={handleClose} fullWidth={'md'}
        maxWidth={'md'} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Practice</DialogTitle>
        <DialogContent>
          <NewChallengeForm handleClose={handleClose} allPractices={allPractices} setAllPractices={setAllPractices}/>
        </DialogContent>
      </Dialog>
        </PracticesPageContainer>
    )
}

export default PracticesPage;