import { useState } from "react";
import { FiUser, FiLock, FiMail, FiEye, FiEyeOff } from "react-icons/fi";
import { auth, db } from "../../../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../userContext";

const AuthHero = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUserEmail} = useUser();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = formData;
    setError("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        await setDoc(doc(db, "users", user.uid), {
          name,
          email,
          uid: user.uid,
          createdAt: new Date(),
        });
        alert("Logged in successfully!");
      } else {
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        alert("Account created successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(
        doc(db, "users", user.uid),
        {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
          provider: "google",
          createdAt: new Date(),
        },
        { merge: true }
      );

      alert("Signed in with Google!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-blue-100 mt-2">
            {isLogin ? "Login to your account" : "Join us today"}
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-blue-800 mb-2">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-blue-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-blue-800 mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-blue-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-blue-800 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-blue-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-blue-400 hover:text-blue-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={toggleAuthMode}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="border-t border-blue-200 flex-grow"></div>
            <span className="px-4 text-blue-500">OR</span>
            <div className="border-t border-blue-200 flex-grow"></div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 border border-blue-200 rounded-lg py-2 px-4 hover:bg-blue-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="w-5 h-5"
                alt="Google"
              />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 border border-blue-200 rounded-lg py-2 px-4 hover:bg-blue-50 transition">
              <img
                src="https://www.svgrepo.com/show/448234/facebook.svg"
                className="w-5 h-5"
                alt="Facebook"
              />
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHero;
