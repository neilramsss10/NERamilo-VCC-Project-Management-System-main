import pool from '../db.js';

export const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await pool.query("SELECT projects_id, project_name, budget, start_date, end_date, description, project_manager FROM projects_tbl WHERE projects_id = $1", [id]);
        res.status(200).json(project.rows);
    } catch (error) {
        res.status(404).json({ error });
    }
};

export const getProjectsBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const projects = await pool.query("SELECT projects_id, project_name, budget, start_date, end_date, description, project_manager FROM projects_tbl WHERE project_name ILIKE $1", [`%${searchQuery}%`]);
        res.status(200).json(projects.rows);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getAllProjects = async (req, res) => {
    try {
          const result = await pool.query("SELECT * FROM projects_tbl");
          res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
};

export const getProjects = async (req, res) => {
    try {
      const { page, userId } = req.query;
      const pg = parseInt(page);
      const id = userId ? parseInt(userId) : null;
      if (id && Number.isNaN(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      let limit = 6;
      limit = parseInt(limit);
      const total = await pool.query("SELECT COUNT(projects_id) AS exact_count FROM projects_tbl");
      const totalProjectId = parseInt(total.rows[0].exact_count);
      if (id === null || id <= 0) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      if (id === 1) {
        const result = await pool.query("SELECT * FROM projects_tbl ORDER BY projects_id DESC LIMIT $2 OFFSET (($1 - 1) * $2)", [pg, limit]);
        res.status(200).json({ data: result.rows, currentPage: pg, numberOfPages: Math.ceil(totalProjectId / limit) });
      } else {
        const result = await pool.query("SELECT * FROM projects_tbl WHERE project_manager = $3::int ORDER BY projects_id DESC LIMIT $2 OFFSET (($1 - 1) * $2)", [pg, limit, id]);
        const totalProjects = result.rowCount;
        res.status(200).json({ data: result.rows, currentPage: pg, numberOfPages: Math.ceil(totalProjects / limit) });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }
  };


export const createProjects = async (req, res) => {
    try {
        const { project_name, budget, start_date, end_date, description, project_manager } = req.body;
        const sDate = new Date(start_date);
        const eDate = new Date(end_date);
        const newProject = await pool.query("INSERT INTO projects_tbl (project_name, budget, start_date, end_date, description, project_manager) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [project_name, budget, sDate, eDate, description, project_manager]);
         res.json(newProject.rows[0]);
    } catch (error) {
        res.status(409).json({ message: error });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { project_name, budget, start_date, end_date, description, project_manager } = req.body;
        const updateProject = await pool.query("UPDATE projects_tbl SET project_name = $1, budget = $2, start_date = $3, end_date = $4 , description = $5 , project_manager = $6 WHERE projects_id = $7", [project_name, budget, start_date, end_date, description, project_manager, id]);
        res.json("Project was updated");
    } catch (error) {
        res.status(404).send("No project with that ID");
    }
};

export const deleteProject = async (req, res) => {

    try {
        const { id } = req.params;
        const deleteComments = await pool.query("DELETE FROM comments_tbl WHERE project = $1", [id]);
        const deleteProjectTasks = await pool.query("DELETE FROM tasks_tbl WHERE project = $1", [id]);
        const deleteProject = await pool.query("DELETE FROM projects_tbl WHERE projects_id = $1", [id]);
        res.json("Project was deleted");    
    } catch (error) {
        res.status(404).send("No project with that ID");
    }
};