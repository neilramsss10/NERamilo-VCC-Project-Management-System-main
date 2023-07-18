import { combineReducers } from "redux";

import projects from "./projects";
import project from "./project";
import allProjects from "./allProjects";
import tasks from "./tasks";
import task from "./task";
import auth from "./auth";
import comments from "./comments";

export default combineReducers({ projects, auth, task, tasks, comments, project, allProjects });