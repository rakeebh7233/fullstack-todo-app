import express from 'express';
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';

const app = express()
const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(__dirname))

/*
// Production only: serve React build
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
*/

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})