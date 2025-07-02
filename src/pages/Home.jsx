const Home = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-blue-500  text-white p-8">
    <div className="max-w-2xl text-center space-y-6">
      <h1 className="text-5xl font-extrabold drop-shadow-lg">
        Welcome to QuizApp
      </h1>
      <p className="text-xl mt-4">
        Challenge yourself. Learn something new. Have fun!
      </p>
      <blockquote className="italic text-lg mt-2 text-pink-100">
        "The more you test your knowledge, the more you grow."
      </blockquote>

      <div className="flex justify-center space-x-4 mt-6">
        <a
          href="/register"
          className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:bg-purple-100 transition transform hover:scale-105"
        >
          Register
        </a>
        <a
          href="/login"
          className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:bg-purple-100 transition transform hover:scale-105"
        >
          Login
        </a>
      </div>

      <p className="mt-6 text-pink-200">Start now and be the top scorer!</p>
    </div>
  </div>
);

export default Home;
