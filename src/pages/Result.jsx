import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  if (!result || !Array.isArray(result)) {
    return (
      <div className="p-6 text-center">
        <p>Result not available.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  const score = result.filter((r) => r.correct).length;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Quiz Result</h2>
      <p className="mb-6 text-lg">
        You scored <span className="font-bold">{score}</span> out of{" "}
        {result.length}
      </p>

      <div className="space-y-4">
        {result.map((r, idx) => (
          <div
            key={idx}
            className={`border p-4 rounded ${
              r.correct ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <p className="font-semibold mb-2">
              {idx + 1}. {r.question}
            </p>
            <p>
              <strong>Your answer was:</strong>{" "}
              <span className={r.correct ? "text-green-700" : "text-red-700"}>
                {r.correct ? "Correct ✅" : "Incorrect ❌"}
              </span>
            </p>
            {!r.correct && (
              <p>
                <strong>Correct answer:</strong>{" "}
                <span className="text-green-800">{r.correctAnswer}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Result;
