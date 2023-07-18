import * as api from "../api";
import { COMMENT, FETCH_COMMENT_TASKS } from "../constants/actionTypes";

export const commentTask = (value, id, userId, projectId) => async (dispatch) => {
    try {
        const {data} = await api.comment(value, id, userId, projectId);
        dispatch({ type: COMMENT, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const getTaskComments = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchTaskComments(id);
        dispatch({ type: FETCH_COMMENT_TASKS, payload: data });
    } catch (error) {
        console.log(error);
    }
}