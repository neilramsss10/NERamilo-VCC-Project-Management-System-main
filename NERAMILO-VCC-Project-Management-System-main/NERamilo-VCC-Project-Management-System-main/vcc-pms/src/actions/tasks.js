import * as api from '../api';
import { FETCH_TASKS, FETCH_PROJECT_TASKS, FETCH_TASK, CREATE_TASK, UPDATE_TASK, DELETE_TASK, TASK_DONE } from "../constants/actionTypes";

export const getTasks = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchTasks(id);
        dispatch({ type: FETCH_TASKS, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const getProjectTasks = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchProjectTasks(id);
        dispatch({ type: FETCH_PROJECT_TASKS, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const getTask = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchTask(id);
        dispatch({ type: FETCH_TASK, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createTask = (task) => async (dispatch) => {
    try {
        const { data } = await api.createTask(task);
        dispatch({ type: CREATE_TASK, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateTask = (id, task) => async (dispatch) => {
    try {
        const { data } = await api.updateTask(id, task);
        dispatch({type: UPDATE_TASK, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deleteTask = (id) => async (dispatch) => {
    try {
        await api.deleteTask(id);
        dispatch({type: DELETE_TASK, payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const taskDone = (id) => async (dispatch) => {
    try {
        const { data } = await api.doneTask(id);
        dispatch({ type: TASK_DONE, payload: data });
    } catch (error) {
        console.log(error)
    }
}