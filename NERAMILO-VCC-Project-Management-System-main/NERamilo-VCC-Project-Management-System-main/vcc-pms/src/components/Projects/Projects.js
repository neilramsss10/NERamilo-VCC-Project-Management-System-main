import React, { useState } from "react";
import useStyles from "./styles.js";
import { Container, AppBar, Grow, Grid, Paper, TextField, Button, Modal, Box } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getProjectsBySearch} from "../../actions/projects";
import FormProject from "../Form/FormProject.js";
import ProjectList from "./ProjectList.js";
import Pagination from "../Pagination";
import CalendarComponent from "../Calendar/Calendar.js";

import 'react-calendar/dist/Calendar.css';


function Query() {
 return new URLSearchParams(useLocation().search);
}

const Projects = () => {
    const [currentId, setCurrentId] = useState(null); 
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?.rows[0]?.users_id;
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = Query();
    const navigate  = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleKeyPress = (e) => {
      if(e.keyCode === 13) {
        searchProject();
      }
    }
    const searchProject = () => {
      if(search.trim()) {
        dispatch(getProjectsBySearch({search}));
        navigate(`/projects/search?searchQuery=${search || 'none'}`);
      } else {
        navigate('/projects');
      }
    }

    if (!userId) {
      return <div>Loading...</div>;
    }

    return ( 
      <Container maxwidth="lg">
        <Paper className={classes.heading} elevation={6}>
          Projects
        </Paper>
      <Grow in>
        <Container maxWidth="xl">
          <Grid container justify="space-between" justifyContent="flex-end" alignItems="stretch" spacing={3} className={classes}>
            <Grid item xs={12} sm={7}>
              <ProjectList currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
            <>
              {(userId === 1) && (
                <>
                <Button onClick={handleOpen} variant="contained" color="primary">Add Project</Button>
                  <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box className={classes.box}>
                      <FormProject />
                    </Box>
                </Modal>
                </>
              )}
            </>
            {(!searchQuery) && (
                <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page}/>
                </Paper>
              )}
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField name="search" variant="outlined" label="Search Project" fullWidth onKeyUp={handleKeyPress} value={search} onChange={(e) => setSearch(e.target.value)}/>
                <Button onClick={searchProject} className={classes.searchButton} variant="contained" color="primary">Search</Button>
              </AppBar>
              <CalendarComponent />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
     );
}
 
export default Projects;