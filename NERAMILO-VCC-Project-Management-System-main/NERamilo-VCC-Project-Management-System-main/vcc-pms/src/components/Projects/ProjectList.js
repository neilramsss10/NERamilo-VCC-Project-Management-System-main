import React from "react";
import { Grid, CircularProgress} from '@mui/material';
import { useSelector } from 'react-redux';
import Project from "./Project/Project.js";
import useStyles from './stylesprojectlist';

const ProjectList = ({setCurrentId, currentId}) => {
    const {projects, isLoading} = useSelector((state) => state.projects);
    const classes = useStyles();

    if(!projects.length && !isLoading) return 'No Projects';
    return ( 
        isLoading ? <CircularProgress /> : (
            <>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {projects.map((project) => (
                        <Grid item key={project._id} xs={12} sm={6}> 
                            <Project project={project} currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))}
                </Grid>
            </>
        )
     );
}
 
export default ProjectList;