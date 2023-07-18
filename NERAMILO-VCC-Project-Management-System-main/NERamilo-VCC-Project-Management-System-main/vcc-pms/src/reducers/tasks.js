import { FETCH_PROJECT_TASKS, FETCH_TASKS, CREATE_TASK, UPDATE_TASK, TASK_DONE, DELETE_TASK } from "../constants/actionTypes";

const taskReducer = (tasks = [], action) => {
    switch (action.type) {
      case FETCH_PROJECT_TASKS:
        return action.payload;
      case FETCH_TASKS:
        return action.payload;
      case CREATE_TASK:
        return [...tasks, action.payload];
      case UPDATE_TASK:
        return tasks.map((task) => task.tasks_id === action.payload.tasks_id ? action.payload : task);
      case TASK_DONE:
        return tasks.map((task) => task.tasks_id === action.payload.tasks_id ? action.payload : task);
      case DELETE_TASK:
        return tasks.filter((task) => task.tasks_id !== action.payload);
      default:
        return tasks;
    }
  };
  
  export default taskReducer;