import { useEffect, useState } from "react";
import API from "../utils/api";
import { useForm, useWatch } from "react-hook-form";

const AdminPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formMessage, setFormMessage] = useState(null);
  const [formMessageType, setFormMessageType] = useState("success");
  const [listMessage, setListMessage] = useState(null);
  const [listMessageType, setListMessageType] = useState("success");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: "",
      type: "mcq",
      options: ["", "", "", ""],
      answer: "",
      level: "basic",
    },
  });

  const type = useWatch({ control, name: "type" });

  const fetchQuestions = async () => {
    try {
      const res = await API.get("/admin/questions");
      setQuestions(res.data);
    } catch {
      showListMessage("Failed to load questions", "error");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const showFormMessage = (msg, type = "success") => {
    setFormMessage(msg);
    setFormMessageType(type);
    setTimeout(() => setFormMessage(null), 3000);
  };

  const showListMessage = (msg, type = "success") => {
    setListMessage(msg);
    setListMessageType(type);
    setTimeout(() => setListMessage(null), 3000);
  };

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await API.put(`/admin/questions/${editingId}`, data);
        setEditingId(null);
        showFormMessage("Question updated successfully");
      } else {
        await API.post("/admin/upload", data);
        showFormMessage("Question added successfully");
      }
      reset({
        question: "",
        type: "mcq",
        options: ["", "", "", ""],
        answer: "",
        level: "basic",
      });
      fetchQuestions();
    } catch {
      showFormMessage("Failed to save question", "error");
    }
  };

  const handleEdit = (q) => {
    setEditingId(q._id);
    reset({
      question: q.question,
      type: q.type,
      options: q.options?.length === 4 ? q.options : ["", "", "", ""],
      answer: q.answer,
      level: q.level || "basic",
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure to delete this question?")) {
      try {
        await API.delete(`/admin/questions/${id}`);
        showListMessage("Question deleted successfully");
        fetchQuestions();
      } catch {
        showListMessage("Delete failed", "error");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Side - Admin Form */}
      <div className="md:w-1/2 w-full p-8 bg-white shadow-lg rounded-lg m-6">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          {editingId ? "Edit" : "Add"} Question
        </h2>

        {formMessage && (
          <div
            className={`mb-6 p-3 rounded text-center font-medium ${
              formMessageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {formMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Question"
              {...register("question", { required: "Question is required" })}
              className="w-full p-3 rounded-lg shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.question && (
              <p className="text-red-600 mt-1">{errors.question.message}</p>
            )}
          </div>

          <div>
            <select
              {...register("type")}
              className="w-full p-3 rounded-lg shadow-md bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="mcq">Multiple Choice</option>
              <option value="short">Short Answer</option>
            </select>
          </div>

          {/* Level select */}
          <div>
            <select
              {...register("level")}
              className="w-full p-3 rounded-lg shadow-md bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="basic">Basic</option>
              <option value="medium">Medium</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Options two column grid */}
          {type === "mcq" && (
            <div className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i}>
                  <input
                    type="text"
                    placeholder={`Option ${i + 1}`}
                    {...register(`options.${i}`, {
                      required: "Option is required",
                    })}
                    className="w-full p-3 rounded-lg shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.options?.[i] && (
                    <p className="text-red-600 mt-1">
                      {errors.options[i].message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Answer"
              {...register("answer", { required: "Answer is required" })}
              className="w-full p-3 rounded-lg shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.answer && (
              <p className="text-red-600 mt-1">{errors.answer.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-lg w-full shadow-lg hover:bg-green-700 transition"
          >
            {editingId ? "Update Question" : "Add Question"}
          </button>
        </form>
      </div>

      {/* Right Side - Quiz List */}
      <div className="md:w-1/2 w-full p-8 m-6 bg-white shadow-lg rounded-lg">
        {listMessage && (
          <div
            className={`mb-6 p-3 rounded text-center font-medium ${
              listMessageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {listMessage}
          </div>
        )}

        <h2 className="text-3xl font-semibold mb-6 text-center">
          All Questions
        </h2>

        {questions.length === 0 ? (
          <p className="text-center text-gray-600">No questions found.</p>
        ) : (
          <div className="space-y-5">
            {questions.map((q, idx) => (
              <div
                key={q._id}
                className="p-5 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50"
              >
                <div>
                  <p className="font-semibold text-lg">
                    {idx + 1}. {q.question}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Answer: <span className="font-bold">{q.answer}</span>
                  </p>
                  <p className="text-xs mt-1 italic text-gray-500">
                    Level:{" "}
                    <span className="capitalize">{q.level || "basic"}</span>
                  </p>
                </div>
                <div className="space-x-4 mt-4 md:mt-0">
                  <button
                    onClick={() => handleEdit(q)}
                    className="bg-yellow-500 px-4 py-2 rounded-lg shadow hover:bg-yellow-600 text-white transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(q._id)}
                    className="bg-red-600 px-4 py-2 rounded-lg shadow hover:bg-red-700 text-white transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
