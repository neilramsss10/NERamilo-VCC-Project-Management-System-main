import React, {useState} from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Modal, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../../actions/projects';
import { useNavigate } from 'react-router-dom';
import FormProject from '../../Form/FormProject';
import useStyles from './styles';

const Project = ({project, setCurrentId, currentId}) => {
    const createdAt = new Date(project.start_date);
    const startDate = createdAt.toLocaleDateString('en-US');
    const endAt = new Date(project.end_date);
    const endDate = endAt.toLocaleDateString('en-US');
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?.rows[0]?.users_id;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openProject = () => {
        navigate(`/projects/${project.projects_id}`)
    };

    return ( 
        <Card className={classes.card} elevation={6}>
            <CardMedia className={classes.media} title={project.project_name}/>
            <div className={classes.overlay}>
                <Typography variant="h6"><strong>{project.project_name}</strong></Typography>
                <div>
                <Typography variant="body">Project Start: {startDate}</Typography>
                </div>
                <div>
                <Typography variant="body">Deadline: {endDate} </Typography>
                </div>
            </div>
            <div className={classes.overlay2}>
            {(userId === 1) && (
                <>
                    <Button style={{color: 'white'}} size="small" onClick={() => { setCurrentId(project.projects_id); handleOpen(); }}>
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                        <Box className={classes.box}>
                            <FormProject currentId={currentId} setCurrentId={setCurrentId} handleClose={handleClose}/>
                        </Box>
                    </Modal>
                </>
                )}
            </div> 
                        <ButtonBase component="span" className={classes.cardActions} onClick={openProject}>
            <CardContent>
            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">Project Manager {project.project_manager-1}</Typography>
            </div>
            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">Budget: {project.budget}</Typography>
            </div>
            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">Description: {project.description}</Typography>
            </div>
            </CardContent> 
            </ButtonBase>
            <CardActions className={classes.cardActions}>
            {(userId === 1) && (
                    <Button size="small" color="primary" variant="contained" onClick={() => {if(window.confirm('Delete the project?')){dispatch(deleteProject(project.projects_id))}}}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
                )}
            
            </CardActions>    
        </Card>
        );
}
 
export default Project;