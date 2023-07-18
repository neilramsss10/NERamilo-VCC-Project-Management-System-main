import React from "react";
import { Container, Grow, Grid, Paper } from "@mui/material";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { getTasks } from "../../actions/tasks.js";
import useStyles from "./styles.js";
import { getAllProjects } from "../../actions/projects.js";

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openTaskPage = () => navigate('/tasks');
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?.rows[0]?.users_id;
  const tasks = useSelector((state) => state?.tasks);
  const projects = useSelector((state) => state?.allProjects);

  useQuery({
    queryKey: ["allprojects"],
    queryFn: () => dispatch(getAllProjects),
  });

  useQuery({
    queryKey: ["tasks", userId],
    queryFn: () => dispatch(getTasks(userId)),
});

  const projectsWithManager = [];
  for (let i = 2; i <= 6; i++) {
    projectsWithManager.push(projects?.allProjects?.filter(project => project.project_manager === i));
  }
  const projectsPM1 = projectsWithManager[0];
  const projectsPM2 = projectsWithManager[1];
  const projectsPM3 = projectsWithManager[2];
  const projectsPM4 = projectsWithManager[3];
  const projectsPM5 = projectsWithManager[4];

  const tasksWithManager = [];
  for (let i = 2; i <= 6; i++) {
    tasksWithManager.push(tasks?.filter(task => task.project_manager === i));
  }
  const tasksPM1 = tasksWithManager[0];
  const tasksPM2 = tasksWithManager[1];
  const tasksPM3 = tasksWithManager[2];
  const tasksPM4 = tasksWithManager[3];
  const tasksPM5 = tasksWithManager[4];


  const generatePDFPM1 = () => {
    // Define the headers and data for the tables
    const projectHeaders = [['Project', 'Start Date', 'Deadline', 'Budget']];
    const taskHeaders = [['Task', 'Start Date', 'Deadline', 'Project']]
    const projectDataPM1 = projectsPM1.map(project => {
      return [project.project_name, project.start_date.slice(0, 10), project.end_date.slice(0, 10), `${project.budget}`];
    });
    const taskDataPM1 = tasksPM1.filter(task => !task.is_done) // Filter out completed tasks
  .sort((a, b) => a.priority - b.priority || b.priority - a.priority) // Sort by priority
  .map(task => [task.task_name, task.start_date.split('T')[0], task.end_date.split('T')[0], task.project_name]); // Map to new format

  
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Add the first page to the PDF document
    addPage1(doc, projectHeaders, taskHeaders, projectDataPM1, taskDataPM1);
  
    // Save and open the PDF file in a new tab
    doc.save('ProjectManager1Reports.pdf');
    window.open(doc.output('bloburl'), '_blank');
  };
  
  // A helper function to add a page with 2 tables
  const addPage1 = (doc, projectHeaders, taskHeaders, projectDataPM1, taskDataPM1) => {
    // Add the title and subtitle to the PDF document
    doc.setFontSize(18);
    doc.text('Project Manager 1', 15, 15);
    doc.setFontSize(12);
    doc.text('Projects', 15, 25);
  
    // Add the first table to the PDF document
    doc.autoTable({
      head: projectHeaders,
      body: projectDataPM1,
      startY: 30,
    });
  
    // Add the second table to the PDF document
    doc.text('Tasks', 15, doc.autoTable.previous.finalY + 10);
    doc.autoTable({
      head: taskHeaders,
      body: taskDataPM1,
      startY: doc.autoTable.previous.finalY + 20,
    });
  };

  const generatePDFPM2 = () => {
    // Define the headers and data for the tables
    const projectHeaders = [['Project', 'Start Date', 'Deadline', 'Budget']];
    const taskHeaders = [['Task', 'Start Date', 'Deadline', 'Project']]
    const projectDataPM2 = projectsPM2.map(project => {
      return [project.project_name, project.start_date.slice(0, 10), project.end_date.slice(0, 10), `${project.budget}`];
    });
    const taskDataPM2 = tasksPM2.filter(task => !task.is_done) // Filter out completed tasks
  .sort((a, b) => a.priority - b.priority || b.priority - a.priority) // Sort by priority
  .map(task => [task.task_name, task.start_date.split('T')[0], task.end_date.split('T')[0], task.project_name]); // Map to new format

  
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Add the first page to the PDF document
    addPage2(doc, projectHeaders, taskHeaders, projectDataPM2, taskDataPM2);
  
    // Save and open the PDF file in a new tab
    doc.save('ProjectManager2Reports.pdf');
    window.open(doc.output('bloburl'), '_blank');
  };
  
  // A helper function to add a page with 2 tables
  const addPage2 = (doc, projectHeaders, taskHeaders, projectDataPM2, taskDataPM2) => {
    // Add the title and subtitle to the PDF document
    doc.setFontSize(18);
    doc.text('Project Manager 2', 15, 15);
    doc.setFontSize(12);
    doc.text('Projects', 15, 25);
  
    // Add the first table to the PDF document
    doc.autoTable({
      head: projectHeaders,
      body: projectDataPM2,
      startY: 30,
    });
  
    // Add the second table to the PDF document
    doc.text('Tasks', 15, doc.autoTable.previous.finalY + 10);
    doc.autoTable({
      head: taskHeaders,
      body: taskDataPM2,
      startY: doc.autoTable.previous.finalY + 20,
    });
  };

  const generatePDFPM3 = () => {
    // Define the headers and data for the tables
    const projectHeaders = [['Project', 'Start Date', 'Deadline', 'Budget']];
    const taskHeaders = [['Task', 'Start Date', 'Deadline', 'Project']]
    const projectDataPM3 = projectsPM3.map(project => {
      return [project.project_name, project.start_date.slice(0, 10), project.end_date.slice(0, 10), `${project.budget}`];
    });
    const taskDataPM3 = tasksPM3.filter(task => !task.is_done) // Filter out completed tasks
  .sort((a, b) => a.priority - b.priority || b.priority - a.priority) // Sort by priority
  .map(task => [task.task_name, task.start_date.split('T')[0], task.end_date.split('T')[0], task.project_name]); // Map to new format

  
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Add the first page to the PDF document
    addPage3(doc, projectHeaders, taskHeaders, projectDataPM3, taskDataPM3);
  
    // Save and open the PDF file in a new tab
    doc.save('ProjectManager3Reports.pdf');
    window.open(doc.output('bloburl'), '_blank');
  };
  
  // A helper function to add a page with 2 tables
  const addPage3 = (doc, projectHeaders, taskHeaders, projectDataPM3, taskDataPM3) => {
    // Add the title and subtitle to the PDF document
    doc.setFontSize(18);
    doc.text('Project Manager 3', 15, 15);
    doc.setFontSize(12);
    doc.text('Projects', 15, 25);
  
    // Add the first table to the PDF document
    doc.autoTable({
      head: projectHeaders,
      body: projectDataPM3,
      startY: 30,
    });
  
    // Add the second table to the PDF document
    doc.text('Tasks', 15, doc.autoTable.previous.finalY + 10);
    doc.autoTable({
      head: taskHeaders,
      body: taskDataPM3,
      startY: doc.autoTable.previous.finalY + 20,
    });
  };

  const generatePDFPM4 = () => {
    // Define the headers and data for the tables
    const projectHeaders = [['Project', 'Start Date', 'Deadline', 'Budget']];
    const taskHeaders = [['Task', 'Start Date', 'Deadline', 'Project']]
    const projectDataPM4 = projectsPM4.map(project => {
      return [project.project_name, project.start_date.slice(0, 10), project.end_date.slice(0, 10), `${project.budget}`];
    });
    const taskDataPM4 = tasksPM4.filter(task => !task.is_done) // Filter out completed tasks
  .sort((a, b) => a.priority - b.priority || b.priority - a.priority) // Sort by priority
  .map(task => [task.task_name, task.start_date.split('T')[0], task.end_date.split('T')[0], task.project_name]); // Map to new format

  
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Add the first page to the PDF document
    addPage4(doc, projectHeaders, taskHeaders, projectDataPM4, taskDataPM4);
  
    // Save and open the PDF file in a new tab
    doc.save('ProjectManager3Reports.pdf');
    window.open(doc.output('bloburl'), '_blank');
  };
  
  // A helper function to add a page with 2 tables
  const addPage4 = (doc, projectHeaders, taskHeaders, projectDataPM4, taskDataPM4) => {
    // Add the title and subtitle to the PDF document
    doc.setFontSize(18);
    doc.text('Project Manager 4', 15, 15);
    doc.setFontSize(12);
    doc.text('Projects', 15, 25);
  
    // Add the first table to the PDF document
    doc.autoTable({
      head: projectHeaders,
      body: projectDataPM4,
      startY: 30,
    });
  
    // Add the second table to the PDF document
    doc.text('Tasks', 15, doc.autoTable.previous.finalY + 10);
    doc.autoTable({
      head: taskHeaders,
      body: taskDataPM4,
      startY: doc.autoTable.previous.finalY + 20,
    });
  };
  const generatePDFPM5 = () => {
    // Define the headers and data for the tables
    const projectHeaders = [['Project', 'Start Date', 'Deadline', 'Budget']];
    const taskHeaders = [['Task', 'Start Date', 'Deadline', 'Project']]
    const projectDataPM5 = projectsPM5.map(project => {
      return [project.project_name, project.start_date.slice(0, 10), project.end_date.slice(0, 10), `${project.budget}`];
    });
    const taskDataPM5 = tasksPM5.filter(task => !task.is_done) // Filter out completed tasks
  .sort((a, b) => a.priority - b.priority || b.priority - a.priority) // Sort by priority
  .map(task => [task.task_name, task.start_date.split('T')[0], task.end_date.split('T')[0], task.project_name]); // Map to new format

  
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Add the first page to the PDF document
    addPage5(doc, projectHeaders, taskHeaders, projectDataPM5, taskDataPM5);
  
    // Save and open the PDF file in a new tab
    doc.save('ProjectManager5Reports.pdf');
    window.open(doc.output('bloburl'), '_blank');
  };
  
  // A helper function to add a page with 2 tables
  const addPage5 = (doc, projectHeaders, taskHeaders, projectDataPM5, taskDataPM5) => {
    // Add the title and subtitle to the PDF document
    doc.setFontSize(18);
    doc.text('Project Manager 5', 15, 15);
    doc.setFontSize(12);
    doc.text('Projects', 15, 25);
  
    // Add the first table to the PDF document
    doc.autoTable({
      head: projectHeaders,
      body: projectDataPM5,
      startY: 30,
    });
  
    // Add the second table to the PDF document
    doc.text('Tasks', 15, doc.autoTable.previous.finalY + 10);
    doc.autoTable({
      head: taskHeaders,
      body: taskDataPM5,
      startY: doc.autoTable.previous.finalY + 20,
    });
  };
  

  const getPriorityActive = (manager, priority) => {
    return tasks.filter((task) => {
      return (new Date(task.end_date).getTime() > Date.now()) && task.project_manager === manager && task.priority === priority
    })
  }
  
  const getPriorityBacklogs = (manager, priority) => {
    return tasks.filter((task) => {
      return (new Date(task.end_date).getTime() < Date.now()) && task.project_manager === manager && task.priority === priority
    })
  }

  const projectManager1ActiveCriticalTasks = getPriorityActive(2, 1);
  const projectManager1ActiveHighTasks = getPriorityActive(2, 2);
  const projectManager1ActiveMediumTasks = getPriorityActive(2, 3);
  const projectManager1ActiveLowTasks = getPriorityActive(2, 4);

  const projectManager2ActiveCriticalTasks = getPriorityActive(3, 1);
  const projectManager2ActiveHighTasks = getPriorityActive(3, 2);
  const projectManager2ActiveMediumTasks = getPriorityActive(3, 3);
  const projectManager2ActiveLowTasks = getPriorityActive(3, 4);

  const projectManager3ActiveCriticalTasks = getPriorityActive(4, 1);
  const projectManager3ActiveHighTasks = getPriorityActive(4, 2);
  const projectManager3ActiveMediumTasks = getPriorityActive(4, 3);
  const projectManager3ActiveLowTasks = getPriorityActive(4, 4);

  const projectManager4ActiveCriticalTasks = getPriorityActive(5, 1);
  const projectManager4ActiveHighTasks = getPriorityActive(5, 2);
  const projectManager4ActiveMediumTasks = getPriorityActive(5, 3);
  const projectManager4ActiveLowTasks = getPriorityActive(5, 4);

  const projectManager5ActiveCriticalTasks = getPriorityActive(6, 1);
  const projectManager5ActiveHighTasks = getPriorityActive(6, 2);
  const projectManager5ActiveMediumTasks = getPriorityActive(6, 3);
  const projectManager5ActiveLowTasks = getPriorityActive(6, 4);

  const projectManager1BacklogsCriticalTasks = getPriorityBacklogs(2, 1);
  const projectManager1BacklogsHighTasks = getPriorityBacklogs(2, 2);
  const projectManager1BacklogsMediumTasks = getPriorityBacklogs(2, 3);
  const projectManager1BacklogsLowTasks = getPriorityBacklogs(2, 4);

  const projectManager2BacklogsCriticalTasks = getPriorityBacklogs(3, 1);
  const projectManager2BacklogsHighTasks = getPriorityBacklogs(3, 2);
  const projectManager2BacklogsMediumTasks = getPriorityBacklogs(3, 3);
  const projectManager2BacklogsLowTasks = getPriorityBacklogs(3, 4);

  const projectManager3BacklogsCriticalTasks = getPriorityBacklogs(4, 1);
  const projectManager3BacklogsHighTasks = getPriorityBacklogs(4, 2);
  const projectManager3BacklogsMediumTasks = getPriorityBacklogs(4, 3);
  const projectManager3BacklogsLowTasks = getPriorityBacklogs(4, 4);

  const projectManager4BacklogsCriticalTasks = getPriorityBacklogs(5, 1);
  const projectManager4BacklogsHighTasks = getPriorityBacklogs(5, 2);
  const projectManager4BacklogsMediumTasks = getPriorityBacklogs(5, 3);
  const projectManager4BacklogsLowTasks = getPriorityBacklogs(5, 4);

  const projectManager5BacklogsCriticalTasks = getPriorityBacklogs(6, 1);
  const projectManager5BacklogsHighTasks = getPriorityBacklogs(6, 2);
  const projectManager5BacklogsMediumTasks = getPriorityBacklogs(6, 3);
  const projectManager5BacklogsLowTasks = getPriorityBacklogs(6, 4);

  const pm1backlogs = [
    {
      name: 'Critical',
      Critical: projectManager1BacklogsCriticalTasks.length,
    },
    {
      name: 'High',
      High: projectManager1BacklogsHighTasks.length,
    },
    {
      name: 'Medium',
      Medium: projectManager1BacklogsMediumTasks.length,
    },
    {
      name: 'Low',
      Low: projectManager1BacklogsLowTasks.length,
    }
  ];
  const pm2backlogs = [
    {
      name: 'Critical',
      Critical: projectManager2BacklogsCriticalTasks.length,
    },
    {
      name: 'High',
      High: projectManager2BacklogsHighTasks.length,
    },
    {
      name: 'Medium',
      Medium: projectManager2BacklogsMediumTasks.length,
    },
    {
      name: 'Low',
      Low: projectManager2BacklogsLowTasks.length,
    }
  ];
  const pm3backlogs = [
    {
      name: 'Critical',
      Critical: projectManager3BacklogsCriticalTasks.length,
    },
    {
      name: 'High',
      High: projectManager3BacklogsHighTasks.length,
    },
    {
      name: 'Medium',
      Medium: projectManager3BacklogsMediumTasks.length,
    },
    {
      name: 'Low',
      Low: projectManager3BacklogsLowTasks.length,
    }
  ];
  const pm4backlogs = [
    {
      name: 'Critical',
      Critical: projectManager4BacklogsCriticalTasks.length,
    },
    {
      name: 'High',
      High: projectManager4BacklogsHighTasks.length,
    },
    {
      name: 'Medium',
      Medium: projectManager4BacklogsMediumTasks.length,
    },
    {
      name: 'Low',
      Low: projectManager4BacklogsLowTasks.length,
    }
  ];
  const pm5backlogs = [
    {
      name: 'Critical',
      Critical: projectManager5BacklogsCriticalTasks.length,
    },
    {
      name: 'High',
      High: projectManager5BacklogsHighTasks.length,
    },
    {
      name: 'Medium',
      Medium: projectManager5BacklogsMediumTasks.length,
    },
    {
      name: 'Low',
      Low: projectManager5BacklogsLowTasks.length,
    }
  ];
  const pm1active = [
    {
      name: 'Critical',
      Critical: projectManager1ActiveCriticalTasks.length,
    },
    {
      name: 'High',
      High: projectManager1ActiveHighTasks.length,
    },
    {
      name: 'Medium',
      Medium: projectManager1ActiveMediumTasks.length,
    },
    {
      name: 'Low',
      Low: projectManager1ActiveLowTasks.length,
    }
  ];
  const pm2active = [
    {
      name: 'Critical',
      Critical: projectManager2ActiveCriticalTasks.length,
    },
    {
      name: 'High',
      High: projectManager2ActiveHighTasks.length,
    },
    {
      name: 'Medium',
      Medium: projectManager2ActiveMediumTasks.length,
    },
    {
      name: 'Low',
      Low: projectManager2ActiveLowTasks.length,
    }
  ];
  const pm3active = [
    {
      name: 'Critical',
      Critical: projectManager3ActiveCriticalTasks.length,
    },
    {
      name: 'High',
      High: projectManager3ActiveHighTasks.length,
    },
    {
      name: 'Medium',
      Medium: projectManager3ActiveMediumTasks.length,
    },
    {
      name: 'Low',
      Low: projectManager3ActiveLowTasks.length,
    }
  ];
  const pm4active = [
    {
      name: 'Critical',
      Critical: projectManager4ActiveCriticalTasks.length,
    },
    {
      name: 'High',
      High: projectManager4ActiveHighTasks.length,
    },
    {
      name: 'Medium',
      Medium: projectManager4ActiveMediumTasks.length,
    },
    {
      name: 'Low',
      Low: projectManager4ActiveLowTasks.length,
    }
  ];
  const pm5active = [
    {
      name: 'Critical',
      Critical: projectManager5ActiveCriticalTasks.length,
    },
    {
      name: 'High',
      High: projectManager5ActiveHighTasks.length,
    },
    {
      name: 'Medium',
      Medium: projectManager5ActiveMediumTasks.length,
    },
    {
      name: 'Low',
      Low: projectManager5ActiveLowTasks.length,
    }
  ];
    return ( 
        <Container maxwidth="lg">
          <Paper className={classes.heading} elevation={6}>
            Dashboard
          </Paper>
          <Grow in>
            <Container>
              <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                {(userId === 1 || userId ===2) && (
                <> 
                <Grid item xs={12} sm={7}>
                  <Paper className={classes.projectManager} elevation={6}>Project Manager 1</Paper>
                </Grid>
                <div style={{ textAlign: 'left' }}>
                <button type="button" onClick={generatePDFPM1} style={{ padding: "8px 16px", margin: "20px 10px 20px 75px", backgroundColor: "#cc0d00", color: "#fff", cursor: "pointer" }}>Generate Reports</button>
                </div>
                <Grid item xs={12} sm={7}>
                  <Paper className={classes.tableDescription} elevation={6}>Backlogs</Paper>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart
                    onClick={openTaskPage}
                    width={500}
                    height={300}
                    data={pm1backlogs}
                    margin={{
                    top: 5,
                    right: 50,
                    left: 50,
                    bottom: 5,
                    }}
                    >
                      <CartesianGrid strokeDasharray="2 2" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Critical" fill="#d50000" />
                      <Bar dataKey="High" fill="#ff6d00" />
                      <Bar dataKey="Medium" fill="#ffff00" />
                      <Bar dataKey="Low" fill="#00c653" />
                    </BarChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Paper className={classes.tableDescription} elevation={6}>Active Tasks</Paper>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart
                    onClick={openTaskPage}
                    width={500}
                    height={300}
                    data={pm1active}
                    margin={{
                    top: 5,
                    right: 50,
                    left: 50,
                    bottom: 5,
                    }}
                    >
                      <CartesianGrid strokeDasharray="2 2" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Critical" fill="#d50000" />
                      <Bar dataKey="High" fill="#ff6d00" />
                      <Bar dataKey="Medium" fill="#ffff00" />
                      <Bar dataKey="Low" fill="#00c653" />
                    </BarChart>
                  </ResponsiveContainer>
                </Grid>
                </>
                )}
                {(userId === 1 || userId ===3) && (
                <> 
                <Grid item xs={12} sm={7}>
                  <Paper className={classes.projectManager} elevation={6}>Project Manager 2</Paper>
                </Grid>
                <div style={{ textAlign: 'left' }}>
                <button type="button" onClick={generatePDFPM2} style={{ padding: "8px 16px", margin: "20px 10px 20px 75px", backgroundColor: "#cc0d00", color: "#fff", cursor: "pointer" }}>Generate Reports</button>
                </div>
                <Grid item xs={12} sm={7}>
                  <Paper className={classes.tableDescription} elevation={6}>Backlogs</Paper>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart
                    onClick={openTaskPage}
                    width={500}
                    height={300}
                    data={pm2backlogs}
                    margin={{
                    top: 5,
                    right: 50,
                    left: 50,
                    bottom: 5,
                    }}
                    >
                      <CartesianGrid strokeDasharray="2 2" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Critical" fill="#d50000" />
                      <Bar dataKey="High" fill="#ff6d00" />
                      <Bar dataKey="Medium" fill="#ffff00" />
                      <Bar dataKey="Low" fill="#00c653" />
                    </BarChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Paper className={classes.tableDescription} elevation={6}>Active Tasks</Paper>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart
                    onClick={openTaskPage}
                    width={500}
                    height={300}
                    data={pm2active}
                    margin={{
                    top: 5,
                    right: 50,
                    left: 50,
                    bottom: 5,
                    }}
                    >
                      <CartesianGrid strokeDasharray="2 2" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Critical" fill="#d50000" />
                      <Bar dataKey="High" fill="#ff6d00" />
                      <Bar dataKey="Medium" fill="#ffff00" />
                      <Bar dataKey="Low" fill="#00c653" />
                    </BarChart>
                  </ResponsiveContainer>
                </Grid>
                </>
                )}
                {(userId === 1 || userId === 4) && (
                <> 
                <Grid item xs={12} sm={7}>
                  <Paper className={classes.projectManager} elevation={6}>Project Manager 3</Paper>
                </Grid>
                <div style={{ textAlign: 'left' }}>
                <button type="button" onClick={generatePDFPM3} style={{ padding: "8px 16px", margin: "20px 10px 20px 75px", backgroundColor: "#cc0d00", color: "#fff", cursor: "pointer" }}>Generate Reports</button>
                </div>
                <Grid item xs={12} sm={7}>
                  <Paper className={classes.tableDescription} elevation={6}>Backlogs</Paper>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart
                    onClick={openTaskPage}
                    width={500}
                    height={300}
                    data={pm3backlogs}
                    margin={{
                    top: 5,
                    right: 50,
                    left: 50,
                    bottom: 5,
                    }}
                    >
                      <CartesianGrid strokeDasharray="2 2" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Critical" fill="#d50000" />
                      <Bar dataKey="High" fill="#ff6d00" />
                      <Bar dataKey="Medium" fill="#ffff00" />
                      <Bar dataKey="Low" fill="#00c653" />
                    </BarChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Paper className={classes.tableDescription} elevation={6}>Active Tasks</Paper>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart
                    onClick={openTaskPage}
                    width={500}
                    height={300}
                    data={pm3active}
                    margin={{
                    top: 5,
                    right: 50,
                    left: 50,
                    bottom: 5,
                    }}
                    >
                      <CartesianGrid strokeDasharray="2 2" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Critical" fill="#d50000" />
                      <Bar dataKey="High" fill="#ff6d00" />
                      <Bar dataKey="Medium" fill="#ffff00" />
                      <Bar dataKey="Low" fill="#00c653" />
                    </BarChart>
                  </ResponsiveContainer>
                </Grid>
                </>
                )}
                {(userId === 1 || userId === 5) && (
                <> 
                <Grid item xs={12} sm={7}>
                  <Paper className={classes.projectManager} elevation={6}>Project Manager 4</Paper>
                </Grid>
                <div style={{ textAlign: 'left' }}>
                <button type="button" onClick={generatePDFPM4} style={{ padding: "8px 16px", margin: "20px 10px 20px 75px", backgroundColor: "#cc0d00", color: "#fff", cursor: "pointer" }}>Generate Reports</button>
                </div>
                <Grid item xs={12} sm={7}>
                  <Paper className={classes.tableDescription} elevation={6}>Backlogs</Paper>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart
                    onClick={openTaskPage}
                    width={500}
                    height={300}
                    data={pm4backlogs}
                    margin={{
                    top: 5,
                    right: 50,
                    left: 50,
                    bottom: 5,
                    }}
                    >
                      <CartesianGrid strokeDasharray="2 2" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Critical" fill="#d50000" />
                      <Bar dataKey="High" fill="#ff6d00" />
                      <Bar dataKey="Medium" fill="#ffff00" />
                      <Bar dataKey="Low" fill="#00c653" />
                    </BarChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Paper className={classes.tableDescription} elevation={6}>Active Tasks</Paper>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart
                    onClick={openTaskPage}
                    width={500}
                    height={300}
                    data={pm4active}
                    margin={{
                    top: 5,
                    right: 50,
                    left: 50,
                    bottom: 5,
                    }}
                    >
                      <CartesianGrid strokeDasharray="2 2" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Critical" fill="#d50000" />
                      <Bar dataKey="High" fill="#ff6d00" />
                      <Bar dataKey="Medium" fill="#ffff00" />
                      <Bar dataKey="Low" fill="#00c653" />
                    </BarChart>
                  </ResponsiveContainer>
                </Grid>
                </>
                )}
                {(userId === 1 || userId === 6) && (
                <> 
                <Grid item xs={12} sm={7}>
                  <Paper className={classes.projectManager} elevation={6}>Project Manager 5</Paper>
                </Grid>
                <div style={{ textAlign: 'left' }}>
                <button type="button" onClick={generatePDFPM5} style={{ padding: "8px 16px", margin: "20px 10px 20px 75px", backgroundColor: "#cc0d00", color: "#fff", cursor: "pointer" }}>Generate Reports</button>
                </div>
                <Grid item xs={12} sm={7}>
                  <Paper className={classes.tableDescription} elevation={6}>Backlogs</Paper>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart
                    onClick={openTaskPage}
                    width={500}
                    height={300}
                    data={pm5backlogs}
                    margin={{
                    top: 5,
                    right: 50,
                    left: 50,
                    bottom: 5,
                    }}
                    >
                      <CartesianGrid strokeDasharray="2 2" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Critical" fill="#d50000" />
                      <Bar dataKey="High" fill="#ff6d00" />
                      <Bar dataKey="Medium" fill="#ffff00" />
                      <Bar dataKey="Low" fill="#00c653" />
                    </BarChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Paper className={classes.tableDescription} elevation={6}>Active Tasks</Paper>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart
                    onClick={openTaskPage}
                    width={500}
                    height={300}
                    data={pm5active}
                    margin={{
                    top: 5,
                    right: 50,
                    left: 50,
                    bottom: 5,
                    }}
                    >
                      <CartesianGrid strokeDasharray="2 2" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Critical" fill="#d50000" />
                      <Bar dataKey="High" fill="#ff6d00" />
                      <Bar dataKey="Medium" fill="#ffff00" />
                      <Bar dataKey="Low" fill="#00c653" />
                    </BarChart>
                  </ResponsiveContainer>
                </Grid>
                </>
                )}
              </Grid>
            </Container>
          </Grow>
        </Container>

    );
}
 
export default Dashboard;