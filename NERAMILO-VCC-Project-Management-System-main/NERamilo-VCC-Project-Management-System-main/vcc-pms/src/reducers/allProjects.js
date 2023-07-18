import { FETCH_ALL_PROJECTS } from "../constants/actionTypes";

const allProjectsReducer = (state = {allProjects: []}, action) => {
    switch (action.type) {
      case FETCH_ALL_PROJECTS:
        return {...state, allProjects: action.payload};
      default:
        return state;
    }
  };
  
  export default allProjectsReducer;