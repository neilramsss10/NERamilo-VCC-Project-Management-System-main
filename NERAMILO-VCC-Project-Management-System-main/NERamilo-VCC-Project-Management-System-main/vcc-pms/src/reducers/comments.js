import { COMMENT, FETCH_COMMENT_TASKS } from "../constants/actionTypes";

const commentReducer = (comments = [], action) => {
    switch (action.type) {
        case FETCH_COMMENT_TASKS:
            return action.payload;
        case COMMENT:
            return [...comments, action.payload];
        default:
            return comments;
    }
}

export default commentReducer;