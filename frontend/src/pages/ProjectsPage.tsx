import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProjectsPage: React.FC = () => {
  const { logout, role } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  // Add more state for filters, sorting, pagination

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:5200/projects", {
        params: { search },
      });
      setProjects(res.data);
      setLoading(false);
    };
    fetchProjects();
  }, [search]);

  // Example chart data
  const outputs = projects.outputs || {};
  const sources = ["tmy2", "tmy3", "nsrdb"];
  const chartData = {
    labels: sources,
    datasets: [
      {
        label: "Elevation",
        data: sources.map((src) => outputs[src]?.elevation || 0),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl">Renewable Energy Projects</h1>
        <div className="flex gap-2">
          {role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Admin Panel
            </button>
          )}
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
      <input
        className="border p-2 mb-4 w-full"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["tmy2", "tmy3", "nsrdb"].map((src) => {
              const data = projects.outputs?.[src];
              if (!data) return null;
              return (
                <div key={src} className="bg-white p-4 rounded shadow">
                  <h2 className="text-xl">{src.toUpperCase()}</h2>
                  <p>City: {data.city}</p>
                  <p>State: {data.state}</p>
                  <p>Elevation: {data.elevation}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8">
            <Chart type="bar" data={chartData} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectsPage;
