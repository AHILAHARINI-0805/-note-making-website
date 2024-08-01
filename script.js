let notes = [];

document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
    displayNotes();
    applyDarkMode();
});

function addNote() {
    const noteContent = document.getElementById('noteContent').value;
    const noteCategory = document.getElementById('noteCategory').value;
    const noteColor = document.getElementById('noteColor').value;

    if (noteContent.trim() === '') {
        alert('Note content cannot be empty');
        return;
    }

    const note = { id: Date.now(), content: noteContent, category: noteCategory, color: noteColor };
    notes.push(note);
    saveNotes();
    displayNotes();

    document.getElementById('noteContent').value = '';
    document.getElementById('noteCategory').value = '';
    document.getElementById('noteColor').value = '#ffffff';
}

function editNote(id) {
    const note = notes.find(note => note.id === id);
    if (note) {
        const newContent = prompt('Edit your note:', note.content);
        if (newContent !== null) {
            note.content = newContent;
            saveNotes();
            displayNotes();
        }
    }
}

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    saveNotes();
    displayNotes();
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
    }
}

function displayNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    notes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.style.backgroundColor = note.color;

        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'note-category';
        categoryDiv.textContent = note.category || 'No Category';
        noteDiv.appendChild(categoryDiv);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'note-content';
        contentDiv.textContent = note.content;
        noteDiv.appendChild(contentDiv);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'note-actions';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editNote(note.id);
        actionsDiv.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteNote(note.id);
        actionsDiv.appendChild(deleteButton);

        noteDiv.appendChild(actionsDiv);
        notesList.appendChild(noteDiv);
    });
}

function searchNotes() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredNotes = notes.filter(note => 
        note.content.toLowerCase().includes(searchTerm) || 
        note.category.toLowerCase().includes(searchTerm)
    );
    displayFilteredNotes(filteredNotes);
}

function displayFilteredNotes(filteredNotes) {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    filteredNotes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.style.backgroundColor = note.color;

        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'note-category';
        categoryDiv.textContent = note.category || 'No Category';
        noteDiv.appendChild(categoryDiv);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'note-content';
        contentDiv.textContent = note.content;
        noteDiv.appendChild(contentDiv);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'note-actions';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editNote(note.id);
        actionsDiv.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteNote(note.id);
        actionsDiv.appendChild(deleteButton);

        noteDiv.appendChild(actionsDiv);
        notesList.appendChild(noteDiv);
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');

    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function applyDarkMode() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
        document.querySelector('.container').classList.add('dark-mode');
    }
}
