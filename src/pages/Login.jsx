import { useForm } from "react-hook-form";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false); // Toggle state

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const endpoint = isRegister ? "/register" : "/login";
      const res = await API.post(endpoint, data);

      if (isRegister) {
        alert("Registration successful! Please log in.");
        setIsRegister(false);
      } else {
        login(res.data.token);
      }
    } catch {
      alert(isRegister ? "Registration failed" : "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded shadow">
      <h2 className="text-2xl mb-6 text-center font-semibold">
        {isRegister ? "Register" : "Login"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
          className="border p-3 rounded"
        />
        {errors.username && (
          <p className="text-red-600">{errors.username.message}</p>
        )}

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

        {isRegister && (
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            })}
            className="border p-3 rounded"
          />
        )}
        {errors.confirmPassword && (
          <p className="text-red-600">{errors.confirmPassword.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded mt-2 hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading
            ? isRegister
              ? "Registering..."
              : "Logging in..."
            : isRegister
            ? "Register"
            : "Login"}
        </button>
      </form>

      <div className="text-center mt-4">
        {isRegister ? (
          <p>
            Already have an account?{" "}
            <button
              onClick={() => setIsRegister(false)}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => setIsRegister(true)}
              className="text-blue-600 hover:underline"
            >
              Register
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
