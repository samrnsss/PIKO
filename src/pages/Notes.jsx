import { useState, useContext } from "react";
import DataContext from "../context/DataContext";

function Notes() {

    const {
        notes,
        addNote,
        deleteNote
    } = useContext(DataContext);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    function handleAddNote() {

        if (title.trim() === "" && content.trim() === "") {
            return;
        }

        addNote({
            title,
            content
        });

        setTitle("");
        setContent("");
    }

    return (
        <div className="notes-page">

            <h1>Notes</h1>

            <p className="page-subtitle">
                Write down your thoughts and ideas.
            </p>

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

                <button onClick={handleAddNote}>
                    Add Note
                </button>

            </div>

            <div className="note-list">

                {notes.map((note) => (

                    <div
                        className="note-item"
                        key={note.id}
                    >

                        <div className="note-info">

                            <h3>{note.title}</h3>

                            <p>{note.content}</p>

                        </div>

                        <button
                            className="delete-btn"
                            onClick={() => deleteNote(note.id)}
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Notes;