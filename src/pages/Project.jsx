import { useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DataContext from "../context/DataContext";

function Projects() {

    const {
        projects,
        addProject,
        deleteProject,
        toggleProject,
        updateProjectStatus,
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

    const [project, setProject] = useState("");
    const [description, setDescription] = useState("");

    function handleAddProject() {

        if (project.trim() === "") {
            return;
        }

        addProject({
            name: project,
            description: description,
            status: "Not Started"
        });

        setProject("");
        setDescription("");
    }

    return (
        <div className="projects-page">

            <h1>Projects</h1>

            <p className="page-subtitle">
                Keep track of what you're building. Add your projects and
                mark them as completed when you're done.
            </p>

            <div className="project-input">

                <input
                    type="text"
                    value={project}
                    placeholder="Add a new project..."
                    onChange={(e) => setProject(e.target.value)}
                />

                <textarea
                    value={description}
                    placeholder="What is this project about?"
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <button onClick={handleAddProject}>
                    Add Project
                </button>

            </div>

            <div className="project-list">

                {projects.map((project) => (

                    <div
                        className="project-item"
                        key={project.id}
                        id={`project-${project.id}`}
                    >

                        <div className="project-left">

                            <input
                                type="checkbox"
                                checked={project.completed}
                                onChange={() => {
                                    toggleProject(project.id);

                                    if (!project.completed) {
                                        recordActivity();
                                    }
                                }}
                            />

                            <div className="project-info">

                                <span
                                    className={
                                        project.completed
                                            ? "completed"
                                            : ""
                                    }
                                >
                                    {project.name}
                                </span>

                                <p>
                                    {project.description}
                                </p>

                                <select
                                    value={project.status}
                                    onChange={(e) =>
                                        updateProjectStatus(
                                            project.id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="Not Started">
                                        Not Started
                                    </option>

                                    <option value="In Progress">
                                        In Progress
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>
                                </select>

                            </div>

                        </div>

                        <button
                            className="delete-btn"
                            onClick={() =>
                                deleteProject(project.id)
                            }
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Projects;