import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    setExams([
      { id: 1, name: "EXAM-1-Basic" },
      { id: 2, name: "EXAM-2-Intermediate" },
      { id: 3, name: "EXAM-3-Advanced" },
    ]);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl mb-6">Welcome, {user.username}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <Link
            to={`/exam/${exam.id}`}
            key={exam.id}
            className="bg-blue-200 rounded shadow p-8 text-center text-xl font-semibold hover:bg-blue-300 transition"
          >
            {exam.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
