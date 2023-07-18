import { FETCH_ALL, CREATE, DELETE, UPDATE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_PROJECT, FETCH_ALL_PROJECTS } from '../constants/actionTypes';
import * as api from "../api";

export const getProject = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchProject(id);
        dispatch({ type: FETCH_PROJECT, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }

}

export const getAllProjects = async (dispatch) => {
    try {
        const { data } = await api.fetchAllProjects();
        dispatch({ type: FETCH_ALL_PROJECTS, payload: data });
    } catch (error) {
        console.log(error);
    }
};


export const getProjects = (page, userId) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchProjects(page, userId);
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }

}

export const getProjectsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchProjectsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createProject = (project) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createProject(project);
        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const updateProject = (id, project) => async (dispatch) => {
     try {
        const { data } = await api.updateProject(id, project);
        dispatch({ type: UPDATE, payload: data});
     } catch (error) {
        console.log(error);
     }
}

export const deleteProject= (id) => async (dispatch) => {
    try {
        await api.deleteProject(id);
        dispatch({ type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}