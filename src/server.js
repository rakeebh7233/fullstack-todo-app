import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', authMiddleware, todoRoutes);
 

// Production only: serve React build
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
});