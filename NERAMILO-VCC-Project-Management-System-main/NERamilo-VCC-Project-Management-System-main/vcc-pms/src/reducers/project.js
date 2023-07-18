import { FETCH_PROJECT } from "../constants/actionTypes";

const projectReducer = (state = {project: []}, action) => {
    switch (action.type) {
      case FETCH_PROJECT:
        return {...state, project: action.payload};
      default:
        return state;
    }
  };
  
  export default projectReducer;