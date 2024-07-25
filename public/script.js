let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};

// Ensure all bookmark entries are arrays
for (let group in bookmarks) {
  if (!Array.isArray(bookmarks[group])) {
    bookmarks[group] = [bookmarks[group]];
  }
}

function renderBookmarks() {
  const groupsContainer = document.getElementById('bookmarkGroups');
  groupsContainer.innerHTML = '';

  for (const [group, paths] of Object.entries(bookmarks)) {
    if (paths.length === 0) continue; // Skip empty groups

    const groupDiv = document.createElement('div');
    groupDiv.className = 'group';
    groupDiv.innerHTML = `<div class="group-title">${group}</div>`;

    const ul = document.createElement('ul');
    paths.forEach((path, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${path}</span>
        <div>
          <button onclick="openFolder('${group}', ${index})">Open in Explorer</button>
          <button onclick="openInVSCode('${group}', ${index})">Open in VS Code</button>
          <button onclick="removeBookmark('${group}', ${index})">Remove</button>
        </div>
      `;
      ul.appendChild(li);
    });

    groupDiv.appendChild(ul);
    groupsContainer.appendChild(groupDiv);
  }
}

function addBookmark() {
  const path = document.getElementById('pathInput').value.trim();
  const group = document.getElementById('groupSelect').value;

  if (path) {
    if (!bookmarks[group]) {
      bookmarks[group] = [];
    }
    if (!bookmarks[group].includes(path)) {
      bookmarks[group].push(path);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      document.getElementById('pathInput').value = '';
      renderBookmarks();
    }
  }
}

function openFolder(group, index) {
  const path = bookmarks[group][index];
  fetch('/open', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path })
  }).then(response => response.json())
    .then(data => {
      if (!data.success) {
        alert(`Failed to open folder: ${data.details || 'Unknown error'}`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert(`Failed to open folder: ${error.message}`);
    });
}

function openInVSCode(group, index) {
  const path = bookmarks[group][index];
  fetch('/open-vscode', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path })
  }).then(response => response.json())
    .then(data => {
      if (!data.success) {
        alert(`Failed to open folder in VS Code: ${data.details || 'Unknown error'}`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert(`Failed to open folder in VS Code: ${error.message}`);
    });
}

function removeBookmark(group, index) {
  bookmarks[group].splice(index, 1);
  if (bookmarks[group].length === 0) {
    delete bookmarks[group];
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  renderBookmarks();
}

// Initialize the app
renderBookmarks();