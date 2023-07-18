import React from 'react';
import { Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import ProjectTask from './ProjectTask/ProjectTask.js';

import useStyles from './styles';

const ProjectTasks = ({ setCurrentId, currentId, project }) => {
    const projectTasks = useSelector((state) => state?.tasks);
    const classes = useStyles();

    const projectTasksBacklogs = projectTasks?.filter(task=>{
        const notDone = task.is_done===false;
        const date = new Date(task.end_date)
        const timestamp = date.getTime()
        if(notDone){
            return timestamp < Date.now()
        }
        });
    const projectTasksActive = projectTasks?.filter(task=>{
        const notDone = task.is_done===false;
        const date = new Date(task.end_date)
        const timestamp = date.getTime()
        if(notDone){
            return timestamp > Date.now()
        }
        });
    const projectTasksDone = projectTasks?.filter(task=>{
        const done = task.is_done===true;
        if(done){
            return done;
        }
        
        });

    return ( 
            <>
            <Grid container justify="center" margin='-10px 0px 0px 25px'spacing={3}>
            <Grid key={1} item >
            <Paper className={classes.heading} elevation={6}>
            {projectTasksBacklogs.length} Backlogs
            </Paper>
              <Paper className={classes.paper} elevation={6} sx={{ overflowY: "scroll"}}>
              {projectTasksBacklogs?.map((task) => (
                    <Grid key={task.id} item xs={12} sm={15} >
                        <ProjectTask project={project} task={task} currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
              </Paper>
            </Grid>
            <Grid key={2} item>
            <Paper className={classes.heading} elevation={6}>
                {projectTasksActive.length} Active Tasks
            </Paper>
              <Paper className={classes.paper} elevation={6} sx={{ overflowY: "scroll"}}>
              {projectTasksActive?.map((task) => (
                    <Grid key={task.id} item xs={12} sm={15} >
                        <ProjectTask project={project} task={task} currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
                </Paper>
            </Grid>
            <Grid key={3} item>
            <Paper className={classes.heading} elevation={6}>
                Done Tasks
            </Paper>
              <Paper className={classes.paper} elevation={6} sx={{ overflowY: "scroll"}}>
              {projectTasksDone?.map((task) => (
                    <Grid key={task.id} item xs={12} sm={15} >
                        <ProjectTask project={project} task={task} currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
                </Paper>
            </Grid>
            </Grid>
            </>
     );
}
 
export default ProjectTasks;