import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional: For a hamburger menu icon

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      {/* Brand and Hamburger */}
      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className="font-bold text-lg hover:text-gray-200 transition"
        >
          QuizApp
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {user && (
            <Link to="/dashboard" className="hover:text-gray-200 transition">
              Dashboard
            </Link>
          )}
          {user?.role === "admin" && (
            <Link to="/admin" className="hover:text-gray-200 transition">
              Admin Panel
            </Link>
          )}
          {user && (
            <Link to="/scoreboard" className="hover:text-gray-200 transition">
              Leaderboard
            </Link>
          )}
        </div>
      </div>

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <>
            <span className="font-semibold">{user.username}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-200 transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-200 transition">
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-700 flex flex-col items-center space-y-4 py-4 md:hidden z-50">
          {user && (
            <Link
              to="/dashboard"
              className="hover:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="hover:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Panel
            </Link>
          )}
          {user && (
            <Link
              to="/scoreboard"
              className="hover:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
          )}
          {user ? (
            <>
              <span className="font-semibold">{user.username}</span>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   return (
//     <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
//       <div className="flex items-center space-x-6">
//         <Link to="/" className="font-bold text-lg hover:underline">
//           QuizApp
//         </Link>
//         {user && (
//           <Link to="/dashboard" className="hover:underline">
//             Dashboard
//           </Link>
//         )}
//         {user?.role === "admin" && (
//           <Link to="/admin" className="hover:underline">
//             Admin Panel
//           </Link>
//         )}
//         {user && (
//           <Link to="/scoreboard" className="hover:underline">
//             Leaderboard
//           </Link>
//         )}
//       </div>
//       <div>
//         {user ? (
//           <>
//             <span className="mr-4 font-semibold">{user.username}</span>
//             <button
//               onClick={logout}
//               className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="mr-4 hover:underline">
//               Login
//             </Link>
//             <Link to="/register" className="hover:underline">
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
