import { useState, useContext, useEffect } from "react";
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

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedNoteId, setSelectedNoteId] = useState(null);

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

            const timeout = setTimeout(() => {
                element.classList.remove("search-highlight");
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [selectedProjectId]);

    const selectedNote = notes.find(
        (note) => String(note.id) === String(selectedNoteId)
    );

    function handleAddNote() {
        if (!title.trim() && !content.trim()) return;

        addNote({
            title: title.trim(),
            content
        });

        recordActivity();

        setTitle("");
        setContent("");
    }

    function handleEditNote(note) {
        setTitle(note.title || "");
        setContent(note.content || "");
        setEditingNoteId(note.id);
    }

    function handleUpdateNote() {
        if (!title.trim() && !content.trim()) return;

        updateNote(editingNoteId, {
            title: title.trim(),
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

    function handleOpenNote(note) {
        setSelectedNoteId(note.id);
        setEditingNoteId(null);
    }

    function handleCloseNote() {
        setSelectedNoteId(null);
        setEditingNoteId(null);
        setTitle("");
        setContent("");
    }

    function handleDeleteNote(noteId) {
        deleteNote(noteId);

        if (String(selectedNoteId) === String(noteId)) {
            setSelectedNoteId(null);
        }

        if (String(editingNoteId) === String(noteId)) {
            handleCancelEdit();
        }
    }

    const filteredNotes = notes.filter((note) => {
        const noteTitle = (note.title || "").toLowerCase();
        const noteContent = (note.content || "").toLowerCase();
        const search = searchTerm.toLowerCase();

        return (
            noteTitle.includes(search) ||
            noteContent.includes(search)
        );
    });

    // Full-page view for an individual note
    if (selectedNote) {
        const isEditing = editingNoteId === selectedNote.id;

        return (
            <div className="notes-page note-detail-page">
                <button
                    className="back-to-notes"
                    onClick={handleCloseNote}
                >
                    ← Back to Notes
                </button>

                {isEditing ? (
                    <div className="note-detail-editor">
                        <input
                            className="detail-title-input"
                            value={title}
                            placeholder="Note title..."
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            className="detail-content-input"
                            value={content}
                            placeholder="Write your note..."
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <div className="detail-actions">
                            <button
                                className="primary-note-btn"
                                onClick={handleUpdateNote}
                            >
                                Save Changes
                            </button>

                            <button
                                className="secondary-note-btn"
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="note-detail-heading">
                            <div>
                                <span className="detail-label">
                                    YOUR NOTE
                                </span>

                                <h1>
                                    {selectedNote.title || "Untitled note"}
                                </h1>

                                <div className="detail-metadata">
                                    <span>
                                        Created{" "}
                                        {selectedNote.createdAt
                                            ? new Date(
                                                selectedNote.createdAt
                                            ).toLocaleString()
                                            : "Date unavailable"}
                                    </span>

                                    {selectedNote.updatedAt && (
                                        <span>
                                            Last edited{" "}
                                            {new Date(
                                                selectedNote.updatedAt
                                            ).toLocaleString()}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <button
                                className="primary-note-btn"
                                onClick={() => handleEditNote(selectedNote)}
                            >
                                Edit Note
                            </button>
                        </div>

                        <article className="note-full-content">
                            {selectedNote.content || "This note is empty."}
                        </article>

                        <div className="detail-bottom-actions">
                            <button
                                className="delete-btn"
                                onClick={() => {
                                    if (
                                        window.confirm(
                                            "Are you sure you want to delete this note?"
                                        )
                                    ) {
                                        handleDeleteNote(selectedNote.id);
                                    }
                                }}
                            >
                                Delete Note
                            </button>
                        </div>
                    </>
                )}
            </div>
        );
    }

    return (
        <div className="notes-page">
            <div className="notes-heading">
                <div>
                    <h1>Notes</h1>

                    <p className="page-subtitle">
                        Capture thoughts, ideas, lists, and anything on your mind.
                    </p>
                </div>

                <span className="notes-count">
                    {notes.length} {notes.length === 1 ? "note" : "notes"}
                </span>
            </div>

            <div className="note-search">
                <input
                    type="text"
                    placeholder="Search your notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="note-composer">
                <div className="composer-heading">
                    <h2>
                        {editingNoteId === null
                            ? "Create a note"
                            : "Edit note"}
                    </h2>

                    <p>Get your thoughts out of your head and onto the page.</p>
                </div>

                <div className="note-input">
                    <input
                        type="text"
                        value={title}
                        placeholder="Give your note a title..."
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        value={content}
                        placeholder="Start writing here..."
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <div className="composer-actions">
                        {editingNoteId === null ? (
                            <button
                                className="primary-note-btn"
                                onClick={handleAddNote}
                            >
                                + Add Note
                            </button>
                        ) : (
                            <>
                                <button
                                    className="primary-note-btn"
                                    onClick={handleUpdateNote}
                                >
                                    Save Changes
                                </button>

                                <button
                                    className="secondary-note-btn"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="notes-grid">
                {filteredNotes.map((note) => (
                    <article
                        className="note-card"
                        key={note.id}
                        id={`project-${note.id}`}
                    >
                        <button
                            className="note-card-open"
                            onClick={() => handleOpenNote(note)}
                            aria-label={`Open note: ${note.title || "Untitled note"}`}
                        >
                            <div className="note-card-top">
                                <span className="note-card-label">
                                    NOTE
                                </span>
                            </div>

                            <h3>
                                {note.title || "Untitled note"}
                            </h3>

                            <p className="note-preview">
                                {note.content || "No content yet."}
                            </p>

                            <div className="note-card-footer">
                                <span>
                                    {note.createdAt
                                        ? new Date(
                                            note.createdAt
                                        ).toLocaleDateString()
                                        : "Recently created"}
                                </span>

                                <span className="read-note">
                                    Open note →
                                </span>
                            </div>
                        </button>

                        <div className="note-card-actions">
                            <button
                                className="edit-btn"
                                onClick={() => handleEditNote(note)}
                            >
                                Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => {
                                    if (
                                        window.confirm(
                                            "Are you sure you want to delete this note?"
                                        )
                                    ) {
                                        handleDeleteNote(note.id);
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            {filteredNotes.length === 0 && (
                <div className="notes-empty-state">
                    <div className="empty-note-icon">N</div>

                    <h3>
                        {searchTerm ? "No matching notes" : "Your page starts here"}
                    </h3>

                    <p>
                        {searchTerm
                            ? "Try searching with a different word."
                            : "Create your first note and keep your thoughts in one place."}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Notes;