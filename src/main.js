import "../style.css";

// DOM elements
const notesWallElement = document.getElementById("notes-wall");
const inputNewNote = document.getElementById("new-note");

// Function to create a new array with already existing notes and a new note item
const addNote = (notes, nextNoteId) => [
    ...notes,
    {id: nextNoteId},
];

// function removeNote()

// function editNote()

// Factory function to create sticky note app
const createStickyNoteApp = () => {
    let notes = [];
    let nextNoteId = 1;

    return {
        getNotes: () => {return [...notes]}
    };
}

const stickyNoteApp = createStickyNoteApp();

// Create note text element
const createNoteText = (note) => {
    const noteText = document.createElement("div");
    noteText.classList.add("p-4", "note-text");
    noteText.innerText = note.text;
    return noteText;
  };

// Creates a new note item
const createNoteItem = (note) => {
    const noteItem = document.createElement("div");
    noteItem.classList.add("relative", "w-40", "h-40", "p-0", "m-2", "overflow-y-auto",
         "transition-transform", "transform", "bg-yellow-200", "shadow-lg", 
         "note", "hover:scale-105");
    noteItem.append(createNoteText(note));
    return noteItem;
}

// Render notes to newest state
const renderNotes = () => {
    notesWallElement.innerHTML = ""; // clear existing notes on wall

    const noteElements = stickyNoteApp.getNotes().map(createNoteItem);
    notesWallElement.append(...noteElements);
}

// Event handler to create a new note item
const handleKeyDownToCreateNewNote = (event) => {
    if (event.key === "Enter") {
      const noteText = event.target.value.trim();
      if (noteText) {
        stickyNoteApp.addNote(noteText);
        event.target.value = ""; // Clear the input
        renderNotes();
      }
    }
  };

// Event listeners
document.addEventListener("DOMContentLoaded", renderNotes);
inputNewNote.addEventListener("keydown", handleKeyDownToCreateNewNote);