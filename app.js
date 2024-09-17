const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = 9292;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/open', (req, res) => {
  const folderPath = req.body.path;

  // Normalize the path to handle potential issues with slashes
  const normalizedPath = path.normalize(folderPath);

  // Use the 'start' command which handles spaces and special characters better
  exec(`start "" "${normalizedPath}"`, (error) => {
    if (error) {
      console.error(`Error opening folder: ${error}`);
      res.status(500).json({ error: 'Failed to open folder', details: error.message });
    } else {
      res.json({ success: true });
    }
  });
});

// New route to open folder in VS Code
app.post('/open-vscode', (req, res) => {
  const folderPath = req.body.path;
  const normalizedPath = path.normalize(folderPath);

  exec(`code "${normalizedPath}"`, (error) => {
    if (error) {
      console.error(`Error opening folder in VS Code: ${error}`);
      res.status(500).json({ error: 'Failed to open folder in VS Code', details: error.message });
    } else {
      res.json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});