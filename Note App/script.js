const noteInput = document.getElementById("note-input");
const addBtn = document.getElementById("add-btn");
const notesList = document.getElementById("notes-list");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  notesList.innerHTML = "";
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = note;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteNote(index);

    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });
}

function addNote() {
  const note = noteInput.value.trim();
  if (note === "") return;
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  noteInput.value = "";
  renderNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

addBtn.addEventListener("click", addNote);

noteInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addNote();
});

// İlk yüklemede render
renderNotes();
