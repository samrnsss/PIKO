import { useState, useContext, useEffect} from "react";
import DataContext from "../context/DataContext";
import { useSearchParams } from "react-router-dom";

function Learning() {
    const {
        topics,
        addTopic,
        updateTopic,
        toggleTopic,
        deleteTopic,
        recordActivity
    } = useContext(DataContext);

    const [searchParams] = useSearchParams();
const selectedTopicId = searchParams.get("id");

useEffect(() => {

    if (!selectedTopicId) return;

    const element = document.getElementById(
        `learning-${selectedTopicId}`
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

}, [selectedTopicId]);

    const [topic, setTopic] = useState("");
    const [editingTopicId, setEditingTopicId] = useState(null);

    function handleAddTopic() {
        if (topic.trim() === "") {
            return;
        }

        addTopic(topic);
        setTopic("");
    }

    function handleEditTopic(topic) {
        setTopic(topic.name);
        setEditingTopicId(topic.id);
    }

    function handleUpdateTopic() {
        if (topic.trim() === "") {
            return;
        }

        updateTopic(editingTopicId, {
            name: topic
        });

        setTopic("");
        setEditingTopicId(null);
    }

    function handleCancelEdit() {
        setTopic("");
        setEditingTopicId(null);
    }

    return (
        <div className="topic-page">

            <h1>Learning</h1>

            <p className="page-subtitle">
                Aashna, keep tracking what you're learning.
            </p>

            <div className="topic-input">

                <input
                    type="text"
                    value={topic}
                    placeholder="Add a new topic..."
                    onChange={(e) => setTopic(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            if (editingTopicId !== null) {
                                handleUpdateTopic();
                            } else {
                                handleAddTopic();
                            }
                        }
                    }}
                />

                {editingTopicId === null ? (
                    <button onClick={handleAddTopic}>
                        Add Topic
                    </button>
                ) : (
                    <>
                        <button onClick={handleUpdateTopic}>
                            Update Topic
                        </button>

                        <button onClick={handleCancelEdit}>
                            Cancel
                        </button>
                    </>
                )}

            </div>

            <div className="topic-list">

                {topics.map((topic) => (

                    <div className="topic-item" 
                    id={`learning-${topic.id}`}
                    key={topic.id}>

                        <div className="topic-left">

                            <input
                                type="checkbox"
                                checked={topic.completed}
                                onChange={() => {
                                    toggleTopic(topic.id);

                                    if (!topic.completed) {
                                        recordActivity();
                                    }
                                }}
                            />

                            <span
                                className={
                                    topic.completed
                                        ? "completed"
                                        : ""
                                }
                            >
                                {topic.name}
                            </span>

                        </div>

                        <div className="topic-actions">

                            <button
                                className="edit-btn"
                                onClick={() => handleEditTopic(topic)}
                            >
                                Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => deleteTopic(topic.id)}
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

export default Learning;