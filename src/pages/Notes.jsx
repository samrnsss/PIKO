import { useState, useContext, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import DataContext from "../context/DataContext";

function Notes() {

    const {
        notes,
        addNote,
        updateNote,
        deleteNote,
        recordActivity
    } = useContext(DataContext);

    const [searchParams] = useSearchParams();
const selectedProjectId = searchParams.get("id");

useEffect(() => {

    if (!selectedProjectId) return;

    const element = document.getElementById(
        `project-${selectedProjectId}`
    );

    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        element.classList.add("search-highlight");

        setTimeout(() => {
            element.classList.remove("search-highlight");
        }, 2000);
    }

}, [selectedProjectId]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    function handleAddNote() {

        if (title.trim() === "" && content.trim() === "") {
            return;
        }

        addNote({
            title,
            content
        });

        recordActivity();

        setTitle("");
        setContent("");
    }

    function handleEditNote(note) {

        setTitle(note.title);
        setContent(note.content);

        setEditingNoteId(note.id);
    }

    function handleUpdateNote() {

        if (title.trim() === "" && content.trim() === "") {
            return;
        }

        updateNote(editingNoteId, {
            title,
            content
        });

        recordActivity();

        setTitle("");
        setContent("");
        setEditingNoteId(null);
    }

    function handleCancelEdit() {

        setTitle("");
        setContent("");
        setEditingNoteId(null);
    }

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="notes-page">

            <h1>Notes</h1>

            <p className="page-subtitle">
                Capture thoughts, ideas, lists, and anything on your mind.
            </p>

            <div className="note-search">

                <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>

            <div className="note-input">

                <input
                    type="text"
                    value={title}
                    placeholder="Note title..."
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    value={content}
                    placeholder="Write your note..."
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>

                {editingNoteId === null ? (

                    <button onClick={handleAddNote}>
                        Add Note
                    </button>

                ) : (

                    <div className="note-edit-buttons">

                        <button onClick={handleUpdateNote}>
                            Update Note
                        </button>

                        <button
                            className="cancel-btn"
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </button>

                    </div>

                )}

            </div>

            <div className="note-list">

                {filteredNotes.map((note) => (

                    <div
                        className="note-item"
                        key={note.id}
                    >

                        <div className="note-info">

                            <h3>{note.title}</h3>

                            <span className="note-date">

                                {note.createdAt
                                    ? new Date(
                                        note.createdAt
                                    ).toLocaleString()
                                    : "Date unavailable"
                                }

                            </span>

                            {note.updatedAt && (
                                <span className="note-date">
                                    Last edited:{" "}
                                    {new Date(
                                        note.updatedAt
                                    ).toLocaleString()}
                                </span>
                            )}

                            <p>{note.content}</p>

                        </div>

                        <div className="note-actions">

                            <button
                                className="edit-btn"
                                onClick={() => handleEditNote(note)}
                            >
                                Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => deleteNote(note.id)}
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Notes;