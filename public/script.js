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
    groupDiv.className = 'mb-6 p-4 border border-gray-400/60 rounded-md';
    groupDiv.innerHTML = `<h2 class="text-2xl font-semibold mb-2">${group}</h2>`;

    const ul = document.createElement('ul');
    ul.className = 'space-y-2';
    paths.forEach((path, index) => {
      const li = document.createElement('li');
      li.className = 'bg-card text-card-foreground p-3 rounded-md shadow flex justify-between items-center';
      li.innerHTML = `
        <span class="text-sm">${path}</span>
        <div class="flex space-x-2">
          <button onclick="openFolder('${group}', ${index})" class="p-1 rounded-md hover:bg-accent hover:text-accent-foreground" aria-label="Open folder">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
          </button>
          <button onclick="openInVSCode('${group}', ${index})" class="p-1 rounded-md hover:bg-accent hover:text-accent-foreground" aria-label="Open in VS Code">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
          </button>
          <button onclick="removeBookmark('${group}', ${index})" class="p-1 rounded-md hover:bg-destructive hover:text-destructive-foreground" aria-label="Remove bookmark">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
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