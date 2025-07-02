import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

const Exam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/questions").then((res) => setQuestions(res.data));
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      alert("Time is up! Submitting your answers.");
      handleSubmit();
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // answers array in the order of questions
      const answersArr = questions.map((_, i) => answers[i] || "");
      const res = await API.post("/submit", { answers: answersArr });

      navigate("/result", { state: res.data });
    } catch {
      alert("Submission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Exam {examId}</h2>
        <div className="text-lg font-mono bg-gray-200 rounded px-4 py-2 w-24 text-center">
          {formatTime(timeLeft)}
        </div>
      </div>

      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6"
        >
          {questions.map((q, idx) => (
            <div key={q._id} className="border rounded p-4">
              <p className="font-semibold mb-2">
                {idx + 1}. {q.question}
              </p>
              {q.type === "mcq" ? (
                q.options.map((opt, i) => (
                  <label key={i} className="block mb-1 cursor-pointer">
                    <input
                      type="radio"
                      name={`q${idx}`}
                      value={opt}
                      onChange={() => handleChange(idx, opt)}
                      checked={answers[idx] === opt}
                      className="mr-2"
                      required
                    />
                    {opt}
                  </label>
                ))
              ) : (
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={answers[idx] || ""}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  required
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Exam;
