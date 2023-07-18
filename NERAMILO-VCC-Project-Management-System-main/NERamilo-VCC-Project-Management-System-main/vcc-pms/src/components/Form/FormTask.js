import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Autocomplete} from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import {createTask, updateTask} from '../../actions/tasks';

import useStyles from './styles';

const FormTask = ({ id, currentId, projectManager }) => {
    const [taskData, setTaskData] = useState({ task_name: '', start_date: '', end_date: '', description: '', priority: '', project: id, projectManager: projectManager});
    const task = useSelector((state) => currentId ? state.tasks.find((t) => t.tasks_id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
      if(task) setTaskData(task);
    }, [task]);

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if(currentId){
        dispatch(updateTask(currentId, taskData))
      } else {
        dispatch(createTask(taskData))
      }
      clear();
    }

    const clear = () => {
      setTaskData({ task_name: '', start_date: '', end_date: '', description: '', priority: '', project: id});
    }

    const priority = [
      {
        label: "Critical",
        value: 1,
      },
      {
        label: "High",
        value: 2,
      },
      {
        label: "Medium",
        value: 3,
      },
      {
      label: "Low",
          value: 4,
      },
    ]

    return ( 
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Edit' : 'Add'} Task</Typography>
            <TextField required name="task_name" variant="outlined" label="Task Name" fullWidth="true" 
            value={taskData.task_name} onChange={(e) => setTaskData({ ...taskData, task_name: e.target.value })}/>
            <TextField required name="start_date" variant="outlined" label="Start Date" InputLabelProps={{ shrink: true, required: true }} type="date" fullwidth="true" value={taskData.start_date} onChange={(e) => setTaskData({ ...taskData, start_date: e.target.value })}/>
            <TextField required name="end_date" variant="outlined" label="Deadline" InputLabelProps={{ shrink: true, required: true }} type="date" fullwidth="true" value={taskData.end_date} onChange={(e) => setTaskData({ ...taskData, end_date: e.target.value })}/>
            <TextField required name="description" variant="outlined" label="Description" 
            fullWidth="true" value={taskData.description} onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}/>
            <Autocomplete required options={priority} sx={{ width: 380 }} isOptionEqualToValue={(option) => option.label} onChange={(event, newValue) => {setTaskData({ ...taskData, priority: newValue.value });}} renderInput={(params) => (<TextField {...params} placeholder="Priority Level" />)}/>
            <Button className={classes.buttonSubmit} color="primary" size="large" type="submit" fullWidth="true"><strong>Submit</strong></Button>
            <Button color="secondary" size="small" onClick={clear} fullWidth="true">Clear</Button>
            </form>
        </Paper>      
     );
}
 
export default FormTask;