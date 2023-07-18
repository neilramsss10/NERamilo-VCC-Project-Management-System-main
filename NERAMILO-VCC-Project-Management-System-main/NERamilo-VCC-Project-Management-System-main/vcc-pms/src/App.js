import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Dashboard from "./components/Dashboard/Dashboard";
import Projects from "./components/Projects/Projects";
import Tasks from "./components/Tasks/Tasks";
import LoginPage from "./components/LoginPage/LoginPage";
import ForgotPasswordPage from "./components/ForgotPassword/ForgotPasswordPage";
import ChangePasswordPage from "./components/ChangePassword/ChangePasswordPage";
import ProjectDetails from './components/ProjectDetails/ProjectDetails';
import TaskDetails from './components/TaskDetails/TaskDetails';
import Sidebar from "./components/Sidebar/Sidebar";
import { indigo } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#EA0500",
    },
    secondary: {
      main: indigo[600],
    },
  },
});

function App() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('profile');

  return (
    <ThemeProvider theme={theme}>
    <div className="App">

    {location.pathname !== '/loginpage' && location.pathname !== '/forgotpasswordpage' && location.pathname !== '/changepasswordpage' ?
      <Sidebar/> : null
    }

        <Routes>
          <Route path="/loginpage" element= {<LoginPage/>} />
          <Route path="/forgotpasswordpage" element= {<ForgotPasswordPage/>} />
          <Route path="/changepasswordpage" element= {<ChangePasswordPage/>} />
          <Route path="/" element= {isLoggedIn ? <Dashboard /> : <Navigate to="/loginpage" />} />
          <Route path="/projects" element= {isLoggedIn ?  <Projects /> : <Navigate to="/loginpage" />} />
          <Route path="/tasks" element= {isLoggedIn ?  <Tasks /> : <Navigate to="/loginpage" />} />
          <Route path="/projects/search" element= {isLoggedIn ? <Projects /> : <Navigate to="/loginpage" />} />
          <Route path="/projects/:id" element= {isLoggedIn ?  <ProjectDetails /> : <Navigate to="/loginpage" />} />
          <Route path="/tasks/:id" element= {isLoggedIn ?  <TaskDetails /> : <Navigate to="/loginpage" />} />
        </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;
