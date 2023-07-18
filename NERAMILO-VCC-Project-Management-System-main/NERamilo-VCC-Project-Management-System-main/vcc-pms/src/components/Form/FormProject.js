import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Autocomplete } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import {createProject, updateProject } from '../../actions/projects';
import useStyles from './styles';

const FormProject = ({ currentId }) => {
    const [projectData, setProjectData] = useState({ project_name: '', budget: '', start_date: '', end_date: '', 
    description: '', project_manager: '' });
    const classes = useStyles();
    const dispatch = useDispatch();
    const project = useSelector((state) => currentId ? state.projects.projects.find((p) => p.projects_id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?.rows[0]?.users_id;

    useEffect(() => {
      if(project) setProjectData(project);
    }, [project]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId) {
          dispatch(updateProject(currentId, projectData));
        }
        else {
          dispatch(createProject(projectData));
        }
        clear();
    }

    const clear = () => {
      setProjectData({ project_name: '', budget: '', start_date: '', end_date: '', 
      description: '', project_manager: '' })
    } 

    const projectManager = [
        {
          label: "Project Manager 1",
          value: 2,
        },
        {
          label: "Project Manager 2",
          value: 3,
        },
        {
          label: "Project Manager 3",
          value: 4,
        },
        {
            label: "Project Manager 4",
            value: 5,
          },
          {
            label: "Project Manager 5",
            value: 6,
          },
      ]
    return ( 
        <>
         {(userId === 1) && (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Edit' : 'Add'} Project</Typography>
            <TextField required name="project_name" variant="outlined" label="Project Name" fullWidth="true" 
            value={projectData.project_name} onChange={(e) => setProjectData({ ...projectData, project_name: e.target.value })}/>
            <TextField required name="budget" variant="outlined" label="Budget" fullWidth="true" 
            value={projectData.budget} onChange={(e) => setProjectData({ ...projectData, budget: e.target.value })}/>
            <TextField required name="start_date" variant="outlined" sx={{ width: 390 }} label="Start Date" InputLabelProps={{ shrink: true, required: true }} type="date" fullwidth="true" value={projectData.start_date} onChange={(e) => setProjectData({ ...projectData, start_date: e.target.value })}/>
            <TextField required name="end_date" variant="outlined" sx={{ width: 390 }} label="Estimated Deadline" InputLabelProps={{ shrink: true, required: true }} type="date" fullwidth="true" value={projectData.end_date} onChange={(e) => setProjectData({ ...projectData, end_date: e.target.value })}/>
            <TextField required name="description" variant="outlined" label="Description" 
            fullWidth="true" value={projectData.description} onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}/>
            <Autocomplete required options={projectManager} sx={{ width: 380 }} isOptionEqualToValue={(option) => option.label} onChange={(event, newValue) => {setProjectData({ ...projectData, project_manager: newValue.value });}} renderInput={(params) => (<TextField {...params} placeholder="Project Manager" />)}/>
            <Button className={classes.buttonSubmit} color="primary" size="large" type="submit" fullWidth="true"><strong>Submit</strong></Button>
            <Button color="secondary" size="small" onClick={clear} fullWidth="true">Clear</Button>
            </form>
        </Paper>
        )}
        </>
        
     );
}
 
export default FormProject;