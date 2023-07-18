import React from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from "@tanstack/react-query";
import { Container, Grow, Grid, Paper} from '@mui/material';
import { getTasks } from '../../actions/tasks';
import TasksList from './TasksList';
import useStyles from "./styles.js";

const Tasks = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const id = user?.result?.rows[0]?.users_id;

    useQuery({
        queryKey: ["tasks", id],
        queryFn: () => dispatch(getTasks(id)),
    });

    return ( 
        <Container maxWidth="lg">
            <Paper className={classes.heading} elevation={6}>
            Tasks
            </Paper>
            <Grow in>
            <Container>
                    <Grid container justify="space-between" justifyContent="center" alignItems="stretch" spacing={3} className={classes}>
                        <Grid item xs={12} sm={15}>
                            <TasksList />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
     );
}
 
export default Tasks;