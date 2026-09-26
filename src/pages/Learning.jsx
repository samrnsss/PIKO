import {useState , useContext} from "react";
import DataContext from "../context/DataContext";

function Learning() {
    const {topics, addTopic, toggleTopic, deleteTopic} = useContext(DataContext);
    const [topic, setTopic] = useState("");

    function handleAddTopic() {
    if (topic.trim() === "") return;

    addTopic(topic);
    setTopic("");
}


        return (
    <div className="topic-page">
        <h1>Learning</h1>

        <p className="page-subtitle">
            Keep track of what you're learning.
        </p>

        <div className="topic-input">
            <input
                type="text"
                value={topic}
                placeholder="Add a new topic..."
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleAddTopic();
                    }
                }}
            />

            <button onClick={handleAddTopic}>
                Add Topic
            </button>
        </div>

        <div className="topic-list">
            {topics.map((topic) => (
                <div className="topic-item" key={topic.id}>

                    <div className="topic-left">
                        <input
                            type="checkbox"
                            checked={topic.completed}
                            onChange={() => toggleTopic(topic.id)}
                        />

                        <span className={topic.completed ? "completed" : ""}>
                            {topic.name}
                        </span>
                    </div>

                    <button
                        className="delete-btn"
                        onClick={() => deleteTopic(topic.id)}
                    >
                        Delete
                    </button>

                </div>
            ))}
        </div>
    </div>
);
}
export default Learning;