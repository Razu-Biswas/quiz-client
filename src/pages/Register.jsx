import { useForm } from "react-hook-form";
import API from "../utils/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data) => {
    setApiError("");

    if (data.password !== data.confirmPassword) {
      setApiError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await API.post("/register", {
        username: data.username,
        password: data.password,
      });
      alert("User registered successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      setApiError("User already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded shadow">
      <h2 className="text-2xl mb-6 text-center font-semibold">Register</h2>

      {apiError && <p className="text-red-600 mb-4 text-center">{apiError}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          {...register("username", {
            required: "Username is required",
          })}
          className="border p-3 rounded"
        />
        {errors.username && (
          <p className="text-red-600">{errors.username.message}</p>
        )}

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Password must be at least 4 characters",
            },
          })}
          className="border p-3 rounded"
        />
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}

        {/* Confirm Password Input */}
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
          })}
          className="border p-3 rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-600">{errors.confirmPassword.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white py-3 rounded mt-2 hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Login Page Redirect */}
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Login here
        </span>
      </p>
    </div>
  );
};

export default Register;
