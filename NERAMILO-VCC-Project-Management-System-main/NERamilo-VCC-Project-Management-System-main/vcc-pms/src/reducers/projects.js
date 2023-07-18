import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING} from '../constants/actionTypes';

const projectReducer = (state  = { isLoading: true, projects: []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true}
        case END_LOADING:
            return { ...state, isLoading: false}
        case FETCH_ALL:
            return {
                ...state,
                projects: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case FETCH_BY_SEARCH:
            return { ...state, projects: action.payload };
        case CREATE:
            return { ...state, projects:[...state.projects, action.payload]};
        case UPDATE:
            return { ...state, projects: state.projects.map((project) => project.projects_id === action.payload.projects_id ? action.payload : project) };
        case DELETE:
            return { ...state, projects: state.projects.filter((project) => project.projects_id !== action.payload)};
        default:
            return state;
    }
}

export default projectReducer;