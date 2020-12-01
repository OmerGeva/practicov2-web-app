import React, { useState, useEffect } from 'react'
import { NewChallengeFormContainer } from './new-challenge.form.styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import MenuItem from '@material-ui/core/MenuItem';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const NewChallengeForm = ({handleClose, allPractices, setAllPractices}) => {
    const classes = useStyles();

    const [title, setTitle] = useState('');
    const [goal, setGoal] = useState('');
    const [timeType, setTimeType] = useState('');
    const [allSkills, setAllSkills] = useState([]);
    const [allSkillCategories, setAllSkillCategories] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [skill, setSkill] = useState('');
    const currentUser = useSelector(state => state.user.currentUser);

    const handleDateChange = (date) => {
        setStartDate(date);
      };

    const changeGoalValue = (value) => {
        if(!isNaN(value)){
            setGoal(value);
        } 
    }
    const getAllSkills = async () => {
        const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/skills' : 'https://practico.com/skills'
        try{
            const response = await axios.get(apiUrl, 
            { headers: { Authorization: `Bearer ${currentUser.token}` }
        })
            await setAllSkills(response.data.skills);
        }catch(error){
            console.log(error)
        }
          
    }
    const getAllSkillCategories = async () => {
        const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/skill_categories' : 'https://practico.com/skill_categories'
        try{
            const response = await axios.get(apiUrl, 
            { headers: { Authorization: `Bearer ${currentUser.token}` }
        })

        await setAllSkillCategories(response.data.skill_categories);
        }catch(error){
            console.log(error)
        }
          
    }

    useEffect(() => {
        getAllSkills();
        getAllSkillCategories();
    },[]) 

    const handleSubmit = async () => {
        if(title && goal && timeType && startDate && skill){

            const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/practices' : 'https://practico.com/practices'
            try{
                const response = await axios.post(
                    apiUrl,
                    {
                        practice: {
                            goal: goal,
                            time_type: timeType.toLowerCase(),
                            start_date: startDate,
                            title: title,
                            skill_id: allSkills.filter(individualSkill=> individualSkill.title === skill)[0].id
                        }
                    },
                    { headers: { Authorization: `Bearer ${currentUser.token}` } }
                    )
                    await console.log(response.data)
                    await setAllPractices([...allPractices, response.data.practice])
                    await handleClose()
                    await createNotification('Good Luck!')

            }catch(error){
                console.log(error)
            }
        }
        else{
            createNotification('Please check the information you entered.')
        }
    }
    const createNotification = (message) => {
        return NotificationManager.info(message);
        };
    
    return (
        <NewChallengeFormContainer>
            <div className="top-row">
                <TextField
                id="outlined-secondary"
                label="Title"
                style={{ marginTop: 10 }}
                variant="outlined"
                color="#ED462D"
                value={title}
                onChange={event => setTitle(event.target.value)}
                />
                
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        className='start-date-picker'
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Start Date"
                        value={startDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                </MuiPickersUtilsProvider>

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Skill</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={skill.title}
                    onChange={event => setSkill(event.target.value)}
                    label="Skill"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        allSkills.map(skill => 
                            <MenuItem value={skill.title}>{skill.title}</MenuItem>

                            )
                    }
                    </Select>
                </FormControl>
                {/* <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={skill.title}
                    onChange={event => setSkill(event.target.value)}
                    label="Category"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        allSkillCategories.map(skill => 
                            <MenuItem value={skill.title}>{skill.title}</MenuItem>

                            )
                    }
                    </Select>
                </FormControl> */}

            </div>
            <div className="bottom-row">
                <h3>I want to practice for....</h3>
                <TextField
                id="outlined-secondary"
                placeholder="0"
                style={{ marginRight: 40, width: '10%', fontSize: '24px' }}
                variant="outlined"
                value={goal}
                onChange={event => changeGoalValue(event.target.value)}
                />
                <div className="time-type-chooser">
                    <div className={timeType === 'Day' ? 'option chosen-type': "option"} onClick={() => setTimeType('Day')}>days</div>
                    <div className={timeType === 'Week' ? 'option chosen-type': "option"} onClick={() => setTimeType('Week')}>weeks</div>
                    <div className={timeType === 'Month' ? 'option chosen-type': "option"} onClick={() => setTimeType('Month')}>months</div>
                </div>
            </div>
            
            
            <div className="dialog-actions">
                <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
                Create Practice
            </Button>
            </div>
        <NotificationContainer />
        </NewChallengeFormContainer>
    )
}

export default NewChallengeForm;