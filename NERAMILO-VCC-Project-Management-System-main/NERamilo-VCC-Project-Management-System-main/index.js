import dotenv from 'dotenv'; 
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as path from 'path';
import { fileURLToPath } from 'url';
import projectsRoutes from './routes/projects.js';
import authRoutes from './routes/auth.js';
import tasksRoutes from './routes/tasks.js';
import commentsRoutes from './routes/comments.js';

const app = express();
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(cors({
    credentials: true,
    origin: [
      'http://localhost:3000', 
      'http://vcc-project-management-system.herokuapp.com',
      'https://vcc-project-management-system.herokuapp.com'
    ],
  }));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "vcc-pms/build")));
}

app.use('/projects', projectsRoutes);
app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);
app.use('/comments', commentsRoutes);

app.get('*', function (req, res) {
  if (!req.url.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, 'vcc-pms/build', 'index.html'));
  }
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
 });