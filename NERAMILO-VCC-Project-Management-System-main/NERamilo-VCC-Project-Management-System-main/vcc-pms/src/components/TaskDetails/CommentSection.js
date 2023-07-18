import React, { useState, useRef, useEffect } from "react";
import { Typography, TextField, Button, Divider } from "@mui/material";
import FileBase from 'react-file-base64';
import {Buffer} from 'buffer';
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { commentTask, getTaskComments } from '../../actions/comments.js';

import useStyles from './styles';

const CommentSection = ({ task }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comment, setComment] = useState({ commentText:'', selectedFile: ''});
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?.rows[0]?.users_id;
    const taskComments = useSelector((state) => state?.comments);
    const id = task[0]?.tasks_id;
    const commentsRef = useRef();

    useQuery({
        queryKey: ["taskcomments", id],
        queryFn: () => dispatch(getTaskComments(id)),
    });
    const handleClick = () => {
        dispatch(commentTask({...comment}, task[0].tasks_id, userId, task[0].project));

        setComment({ commentText: '', selectedFile: ''})
    }
    let commentUser = {
        1: "General Manager",
        2: "Project Manager 1",
        3: "Project Manager 2",
        4: "Project Manager 3",
        5: "Project Manager 4",
        6: "Project Manager 5",
    }
    useEffect(() => {
        commentsRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [taskComments]);

      return (
        <div>
          <div className={classes.CommentsOuterContainer}>
            <div className={classes.CommentsInnerContainer}>
              <Typography gutterBottom marginTop marginLeft variant="h6"><strong>Comments</strong></Typography>
              <Divider />
              {taskComments?.map((comment) => (
                <Typography marginTop key={comment.id} align="left" marginLeft gutterBottom variant="subtitle1">
                  <strong>{commentUser[comment.comment_user]}: </strong>
                  {comment.comment_text}
                  {comment.comment_image && typeof comment.comment_image === 'string' && comment.comment_image.startsWith('\\x') &&
                    <img src={`data:image/jpeg;base64,${Buffer.from(comment.comment_image.slice(2), 'hex').toString('base64')}`} alt=" " height="300" width="450"/>
                  }
                </Typography>
              ))}
              <div ref={commentsRef} />
            </div>
            <div style={{ width: '90%', marginLeft: '5%', marginBottom: '5%' }}>
              <Typography gutterBottom variant="h6"><strong>Write a Comment</strong></Typography>
              <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment.commentText} onChange={(e) => setComment({...comment, commentText: e.target.value})} />
              <div><FileBase type="image" multiple={false} onDone={({ base64 }) => setComment({ ...comment, selectedFile: base64 })} /></div>
              <Button style={{marginTop: '10px'}} fullWidth disabled={!comment.commentText} variant="contained" onClick={handleClick}>Comment</Button>
            </div>
          </div>
        </div>
      );      
}

export default CommentSection;