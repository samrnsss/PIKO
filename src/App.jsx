import { DataProvider } from "./context/DataContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

import Tasks from "./pages/Tasks";
import Goals from "./pages/Goals";
import Habits from "./pages/Habits";
import Learning from "./pages/Learning";
import Projects from "./pages/Project";
import Notes from "./pages/Notes";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="app">
          <Sidebar />
          <main className="main">
            <Navbar />

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/habits" element={<Habits />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/notes" element={<Notes />} />
            </Routes>

          </main>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;