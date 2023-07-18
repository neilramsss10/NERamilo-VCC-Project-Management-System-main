import React, { useEffect, useState } from 'react';
import { Paper, Typography, Divider, Grid, Button } from '@mui/material';
import CommentSection from './CommentSection.js';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { getTask, taskDone } from '../../actions/tasks';

const TaskDetails = () => {
    const isDesktop = useMediaQuery('(min-width: 1025px)');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { task } = useSelector((state) => state?.task);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const createdAt = new Date(task[0]?.start_date);
    const startDate = createdAt.toLocaleDateString('en-US');
    const endAt = new Date(task[0]?.end_date);
    const endDate = endAt.toLocaleDateString('en-US');

    const goBack = () => {
		navigate(-1);
	}

    useQuery({
        queryKey: ["task", id],
        queryFn: () => dispatch(getTask(id)),
    });

    const handleDone = () => {
        dispatch(taskDone(task[0]?.tasks_id));
        window.location.reload(false);
    }

    useEffect(() => {
        const isTaskDone = task[0]?.is_done;
        if (isTaskDone === true) {
          setIsButtonDisabled(true);
        } else {
          setIsButtonDisabled(false);
        }
      }, [task]);

    let tPriority = task[0]?.priority;
    let priorityLabel;
    let priorityIcon;
    if ((tPriority === 1)) {
        priorityLabel = "Critical Priority";
        priorityIcon = <FiberManualRecordIcon sx={{ color: '#d50000' }} />
    }
    else if ((tPriority === 2)) {
        priorityLabel = "High Priority"
        priorityIcon = <FiberManualRecordIcon sx={{ color: '#ff6d00' }} />
    }
    else if ((tPriority === 3)) {
        priorityLabel = "Medium Priority"
        priorityIcon = <FiberManualRecordIcon sx={{ color: '#ffff00' }} />
    } 
    else if ((tPriority === 4)) {
        priorityLabel = "Low Priority"
        priorityIcon = <FiberManualRecordIcon sx={{ color: '#00c653' }} />
    }
    return (
        <Grid container margin="30px 0px 0px 0px" sx={{ flexWrap: "wrap", flexDirection: isDesktop ? "row" : "column" }}>
          <Button style={{ borderRadius: '5px', height: '35px', width: '110px', margin: '30px 0px 0px 0px', marginRight: 'auto' }} onClick={goBack} variant="contained" color="primary">Back</Button>
          <Grid item xs={12} md={6} lg={6} sx={{ display: "flex", flexDirection: "column" }}>
            <Paper style={{ borderRadius: '20px', height: 'auto', width: '100%', maxWidth: '400px', margin: '0px 0px 80px 0px' }} elevation={6}>
              <div>
                <Typography gutterBottom marginTop marginLeft variant="h6"><strong>{task[0]?.task_name}</strong></Typography>
              </div>
              <Divider />
              <div>
                <Typography align="left" marginLeft gutterBottom variant="subtitle2"><strong>Start Date: </strong>{startDate} </Typography>
              </div>
              <Typography align="left" marginLeft gutterBottom variant="subtitle2"><strong>End Date: </strong>{endDate} </Typography>
              <Typography align="left" marginLeft gutterBottom variant="h6"><strong>Description</strong></Typography>
              <Typography marginLeft gutterBottom variant="subtitle2">{task[0]?.description}</Typography>
              <Typography marginLeft gutterBottom variant="subtitle2">{priorityIcon}<strong>{priorityLabel}</strong></Typography>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button style={{ margin: '20px auto' }} variant="contained" disabled={isButtonDisabled} onClick={() => { if (window.confirm('Mark as done?')) { handleDone() }; }}>Mark as Done</Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6} sx={{ display: "flex", flexDirection: "column", marginLeft: isDesktop ? "500px" : "0" }}>
            <Grid container sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <Grid item xs={12} sx={{ flex: 1, overflowY: "scroll" }}>
                <CommentSection task={task} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );             
}
 
export default TaskDetails;