function ProgressBar({ label, progress }) {
    return (
        <div className="progress-item">

            <div className="progress-label">
                <span>{label}</span>
                <span>{progress}%</span>
            </div>

            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

        </div>
    );
}

export default ProgressBar;