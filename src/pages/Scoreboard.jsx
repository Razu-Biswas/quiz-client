import { useEffect, useState } from "react";
import API from "../utils/api";

const Scoreboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    API.get("/scoreboard")
      .then((res) => setLeaderboard(res.data))
      .catch(() => alert("Failed to load leaderboard"));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-4xl mb-8 text-center font-bold text-indigo-600">
        Leaderboard (Top 10)
      </h2>

      {leaderboard.length === 0 ? (
        <p className="text-center text-gray-500">No scores found yet.</p>
      ) : (
        <ol className="space-y-4">
          {leaderboard.map((user, index) => {
            const totalQuiz = user.totalQuiz || 0;
            const submittedQuiz = user.submittedQuiz || 0;
            const percentage = totalQuiz
              ? ((submittedQuiz / totalQuiz) * 100).toFixed(1)
              : 0;

            return (
              <li
                key={user._id}
                className="flex items-center justify-between p-4 rounded-2xl shadow-md hover:shadow-lg transition-all bg-white"
              >
                <div className="flex items-center space-x-4">
                  <span className="bg-indigo-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-800 font-medium">{user._id}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-indigo-600">
                    Score: {user.totalScore}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quiz Submitted: {percentage}%
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

export default Scoreboard;

//{
//   {
//   "_id": "User Name",
//   "totalScore": 80,
//   "submittedQuiz": 8,
//   "totalQuiz": 10
// }
//
