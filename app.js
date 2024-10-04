const express = require('express');
const path = require('path');
const { exec, execSync } = require('child_process');
const os = require('os');
const fs = require('fs').promises


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
    command = `gio open "${normalizedPath}" || xdg-open "${normalizedPath}" || nautilus "${normalizedPath}" || nemo "${normalizedPath}" || caja "${normalizedPath}" || thunar "${normalizedPath}" || pcmanfm "${normalizedPath}" || dolphin "${normalizedPath}"`;
    // command = `xdg-open ${normalizedPath}`
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

app.post('/open-vscode', async (req, res) => {
  const folderPath = req.body.path;
  const normalizedPath = path.normalize(folderPath);

  const shFIle = path.join(__dirname, 'open.sh')
  const command = `${shFIle} ${normalizedPath}`;



  exec(command, { timeout: 15000 }, (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (error) {
      console.error(`Error opening folder in VS Code: ${error}`);
      res.status(500).json({
        error: 'Failed to open folder in VS Code',
        details: error.message,
        stderr,
        command
      });
    } else {
      res.json({ success: true, command });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});