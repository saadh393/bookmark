const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const os = require('os');

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

  let command;
  if (os.platform() === 'win32') {
    // Windows
    command = `start "" "${normalizedPath}"`;
  } else if (os.platform() === 'darwin') {
    // macOS
    command = `open "${normalizedPath}"`;
  } else {
    // Linux (Ubuntu and others)
    // Try multiple file managers in order of preference
    const fileManagers = ['xdg-open', 'nautilus', 'nemo', 'caja', 'thunar', 'pcmanfm', 'dolphin'];
    // command = fileManagers.map(fm => `${fm} "${normalizedPath}"`).join(' || ');
    command = `xdg-open ${normalizedPath}`
    console.log(command);
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error opening folder: ${error}`);
      console.error(`stderr: ${stderr}`);
      res.status(500).json({ error: 'Failed to open folder', details: error.message, stderr });
    } else {
      res.json({ success: true });
    }
  });
});

// New route to open folder in VS Code
app.post('/open-vscode', (req, res) => {
  const folderPath = req.body.path;
  const normalizedPath = path.normalize(folderPath);

  exec(`code ${normalizedPath}`, (error) => {
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