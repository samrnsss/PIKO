import ActivityGraph from "./ActivityGraph";
import ImportantDeadlines from "./ImportantDeadlines";

function Dashboard() {

    return (
        <section className="dashboard">

            <div className="profile-card">

                <div className="profile-info">

                    <p className="profile-role">
                        Computer Engineering Student
                    </p>

                    <p className="quote-text">
                        Be Curious, Be Creative, Be Committed.
                    </p>

                </div>

            </div>

            <ActivityGraph />

            <ImportantDeadlines />

        </section>
    );
}

export default Dashboard;