import { useContext } from "react";
import DataContext from "../context/DataContext";

function ActivityGraph() {

    const { activity } = useContext(DataContext);
    const today = new Date();

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    // Generate the last 365 days
    const days = [];

    for (let i = 364; i >= 0; i--) {

        const date = new Date(today);
        date.setDate(today.getDate() - i);

        const dateKey = formatDate(date);

        days.push({
            date: dateKey,
            count: activity[dateKey] || 0
        });
    }

    const totalActivity = days.reduce(
        (total, day) => total + day.count,
        0
    );

    function getLevel(count) {

        if (count === 0) {
            return "activity-level-0";
        }

        if (count <= 2) {
            return "activity-level-1";
        }

        if (count <= 4) {
            return "activity-level-2";
        }

        if (count <= 7) {
            return "activity-level-3";
        }

        return "activity-level-4";
    }

    // Calculate current streak
    let streak = 0;

    for (let i = days.length - 1; i >= 0; i--) {

        if (days[i].count > 0) {
            streak++;
        } else {
            break;
        }
    }

    // Split days into weeks
    const weeks = [];

    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }

    return (
        <div className="activity-section">

            <div className="activity-header">

                <div>
                    <h2>PIKO Activity</h2>

                    <p>
                        {totalActivity} activities in the last year
                    </p>
                </div>

                <div className="activity-stats">

                    <div>
                        <strong>{streak}</strong>
                        <span>day streak</span>
                    </div>

                    <div>
                        <strong>{totalActivity}</strong>
                        <span>activities</span>
                    </div>

                </div>

            </div>

            <div className="activity-graph-wrapper">

                <div className="activity-days">

                    {weeks.map((week, weekIndex) => (

                        <div
                            className="activity-week"
                            key={weekIndex}
                        >

                            {week.map((day) => (

                                <div
                                    key={day.date}
                                    className={`activity-square ${getLevel(
                                        day.count
                                    )}`}
                                    title={`${day.count} ${
                                        day.count === 1
                                            ? "activity"
                                            : "activities"
                                    } on ${day.date}`}
                                ></div>

                            ))}

                        </div>

                    ))}

                </div>

            </div>

            <div className="activity-legend">

                <span>Less</span>

                <div className="activity-square activity-level-0"></div>
                <div className="activity-square activity-level-1"></div>
                <div className="activity-square activity-level-2"></div>
                <div className="activity-square activity-level-3"></div>
                <div className="activity-square activity-level-4"></div>

                <span>More</span>

            </div>

        </div>
    );
}

export default ActivityGraph;