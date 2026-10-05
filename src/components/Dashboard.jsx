import ActivityGraph from "./ActivityGraph";
import ImportantDeadlines from "./ImportantDeadlines";

function Dashboard() {

    return (
        <section className="dashboard">

            <ActivityGraph/>

            <ImportantDeadlines />

        </section>
    );
}

export default Dashboard;