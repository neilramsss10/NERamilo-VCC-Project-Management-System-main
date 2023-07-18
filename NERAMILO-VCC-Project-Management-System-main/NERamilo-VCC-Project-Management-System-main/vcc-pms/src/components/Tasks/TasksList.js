import React from "react";
import { Grid, Paper } from "@mui/material";
import { useSelector } from 'react-redux';
import Task from "../Tasks/Task/Task.js";
import CalendarComponent from "../Calendar/Calendar.js";

import useStyles from './stylesTasksList';

const TasksList = () => {
    const tasks = useSelector((state) => state?.tasks);
    const classes = useStyles();

    const tasksBacklogs = tasks?.filter(task=>{
        const notDone = task.is_done===false;
        const date = new Date(task.end_date)
        const timestamp = date.getTime()
        if(notDone){
            return timestamp < Date.now()
        }
        });
        const tasksActive = tasks?.filter(task=>{
        const notDone = task.is_done===false;
        const date = new Date(task.end_date)
        const timestamp = date.getTime()
        if(notDone){
            return timestamp > Date.now()
        }
        });

    return ( 
        <>
        <Grid container justify="center" margin='-10px 0px 0px 25px'spacing={3}>
        <Grid key={1} item >
            <Paper className={classes.heading} elevation={6}>
                {tasksBacklogs.length} Backlogs
            </Paper>
            <Paper className={classes.paper} elevation={6} sx={{ overflowY: "scroll"}}>
            {tasksBacklogs?.map((task) => (
                <Grid key={task.id} item xs={12} sm={15} >
                    <Task task={task} />
                </Grid>
            ))}
          </Paper>
        </Grid>
        <Grid key={2} item>
            <Paper className={classes.heading} elevation={6}>
                 {tasksActive.length} Active Tasks
            </Paper>
          <Paper className={classes.paper} elevation={6} sx={{ overflowY: "scroll"}}>
          {tasksActive?.map((task) => (
                <Grid key={task.id} item xs={12} sm={15} >
                    <Task task={task} />
                </Grid>
            ))}
            </Paper>
        </Grid>
        <Grid margin='25px 0px 0px 25px'>
            <CalendarComponent />
        </Grid>
        </Grid>
        </>

    );
}
 
export default TasksList;