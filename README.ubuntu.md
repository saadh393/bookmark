# 📁 Folder Bookmarker

A simple, efficient web application to bookmark and quickly access your frequently used folders. Streamline your workflow and save time by organizing your important directories! 🚀

## 🌟 Features

- 📂 Bookmark folders with easy-to-use interface
- 🏢 Group bookmarks (Office 1, Office 2, Personal)
- 🖥️ Open folders directly in Windows Explorer
- 💻 Open folders in Visual Studio Code
- 🔄 Automatically start on Windows boot

## 🛠️ Installation

1. Clone this repository:
   ```
   git clone https://github.com/saadh393/bookmark.git
   ```
2. Navigate to the project directory:
   ```
   cd bookmark
   ```
3. Install dependencies:
   ```
   npm install
   ```

## 🚀 Usage

1. Start the server:
   ```
   node app.js
   ```
2. Open your web browser and go to `http://localhost:9292`
3. Add folder paths to bookmark them
4. Use the "Open in Explorer" or "Open in VS Code" buttons to quickly access your folders

## ⏰ Time-Saving Benefits

- 🏃‍♂️ Quickly access frequently used folders without navigating through complex directory structures
- 🗂️ Organize folders by groups for better management
- ⚡ Open folders directly in Windows Explorer or VS Code with a single click
- 🖱️ Reduce mouse clicks and time spent searching for important directories

## 🔄 Auto-start on Ubuntu Boot

1. **Create a systemd service file**

   Open a terminal and create a new service file using a text editor. Replace `username` with your actual username:

   ```bash
   sudo nano /etc/systemd/system/bookmark.service
   ```

2. **Add service configuration**

   Paste the following content into the file, replacing `username` and the script path as necessary:

   ```ini
   [Unit]
   Description=Bookmarker Service
   After=network.target

   [Service]
   ExecStart=/home/saad/.nvm/versions/node/v18.18.0/bin/node /home/saad/Programming/Node.js/Bookmarker/app.js
   WorkingDirectory=/home/saad
   Restart=on-failure
   RestartSec=5
   User=saad
   Group=saad
   Environment=PYTHONUNBUFFERED=1
   StandardOutput=append:/home/saad/Programming/Node.js/Bookmarker/bookmarker-script.log
   StandardError=append:/home/saad/Programming/Node.js/Bookmarker/bookmarker-error.log

   [Install]
   WantedBy=multi-user.target
   ```

   Save and close the file (in nano: Ctrl+X, then Y, then Enter).

3. **Set correct permissions**

   ```bash
   sudo chmod 644 /etc/systemd/system/bookmark.service
   ```

4. **Create log file**

   ```bash
   sudo touch /home/saad/Programming/Node.js/Bookmarker/bookmarker-script.log
   sudo chown saad:saad /home/saad/Programming/Node.js/Bookmarker/bookmarker-script.log
   ```

5. **Reload systemd**

   ```bash
   sudo systemctl daemon-reload
   ```

6. **Enable the service**

   ```bash
   sudo systemctl enable bookmark.service
   ```

7. **Start the service**

   ```bash
   sudo systemctl start bookmark.service
   ```

8. **Check the status**

   ```bash
   sudo systemctl status bookmark.service
   ```
