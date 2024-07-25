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

## 🔄 Auto-start on Windows Boot

To make Folder Bookmarker start automatically when Windows boots:

1. Create a batch file named `start_folder_bookmarker.bat` with the following content:
   ```batch
   @echo off
   cd /d "C:\path\to\your\folder-bookmarker"
   start /min cmd /c "node app.js"
   ```
2. Press `Win + R`, type `shell:startup`, and press Enter
3. Copy the `start_folder_bookmarker.bat` file into the opened Startup folder

Now Folder Bookmarker will start automatically when you log in to Windows! 🎉

## 🤝 Contributing

We welcome contributions to Folder Bookmarker! Here's how you can help:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## 🚀 Future Features

Here are some ideas for future enhancements:

- 🌈 Customizable color themes
- 🔐 Password protection for sensitive bookmarks
- 🔍 Search functionality for bookmarks
- 📊 Usage statistics and most frequently accessed folders
- 🔗 Sharing bookmarks between devices
- 🖼️ Custom icons for different folder types
- 🔔 Reminder notifications for important folders

Feel free to implement these features or suggest your own ideas!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape Folder Bookmarker
- Inspired by the need for quick access to project folders in a developer's daily workflow

Happy bookmarking! 📚🔖

This README provides a comprehensive overview of your Folder Bookmarker project, including its features, installation instructions, usage guide, and information for contributors. The emojis add a touch of visual appeal and help highlight key points.

You can further customize this README by:

1. Adding screenshots of your application in action
2. Including a table of contents for easier navigation (especially useful as the project grows)
3. Adding badges for build status, version, license, etc.
4. Including a "Frequently Asked Questions" section as users start using your application

Remember to keep your README updated as you add new features or make significant changes to your project. A well-maintained README is key to attracting users and potential contributors to your open-source project.
