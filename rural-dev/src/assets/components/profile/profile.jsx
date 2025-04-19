import React, { useState,useEffect } from "react";
import { auth } from "../../../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
export default function ProfileHero() {

   const [user, setUser] = useState(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (u) => {
        if (u) {
          setUser(u);
        } else {
          setUser(null);
        }
      });
      return () => unsubscribe();
    }, []);
  const [editMode, setEditMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    skills: [],
    education: [],
    work: [],
  });
  const [inputs, setInputs] = useState({ skill: "", education: "", work: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addToList = (key) => {
    const inputKey = key === "skills" ? "skill" : key;
    if (inputs[inputKey]?.trim()) {
      setFormData((prev) => ({
        ...prev,
        [key]: [...prev[key], inputs[inputKey]],
      }));
      setInputs((prev) => ({ ...prev, [inputKey]: "" }));
    }
  };

  const removeFromList = (key, index) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    console.log("Exportable Data:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center px-4 sm:px-6 py-10">
      <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
        {/* Left: Profile Section */}
        <div className="w-full md:w-1/3 bg-gradient-to-b from-blue-500 to-blue-400 text-white p-8 flex flex-col items-center justify-center relative">
        { user?.photoURL ? (<img
            src={user.photoURL}
            alt="Profile"
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white shadow-lg mb-4"
          />): (
            <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white shadow-lg mb-4"/>
          )}
          {editMode ? (
            <form onSubmit={handleSubmit} className="w-full space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                className="w-full bg-white text-blue-600 font-semibold py-2 rounded shadow hover:bg-blue-100 transition"
              >
                Save
              </button>
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold">{formData.name}</h2>
              <p className="mt-2">📞 {formData.phone}</p>
              <p className="mt-1">✉ {formData.email}</p>
              <button
                onClick={() => setEditMode(true)}
                className="mt-4 text-sm underline text-white hover:text-blue-200"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Right: Details Section */}
        <div className="w-full md:w-2/3 p-8 bg-white">
          {editMode ? (
            <div className="space-y-6">
              {/* Skills */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Skills
                </label>
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <input
                    type="text"
                    name="skill"
                    placeholder="Add a skill"
                    value={inputs.skill}
                    onChange={handleArrayInputChange}
                    className="flex-1 p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <button
                    type="button"
                    onClick={() => addToList("skills")}
                    className="bg-blue-500 text-white px-3 py-2 text-sm rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <ul className="list-disc list-inside text-gray-600 overflow-x-auto">
                  {formData.skills.map((skill, i) => (
                    <li key={i} className="flex justify-between items-center">
                      {skill}
                      <button
                        onClick={() => removeFromList("skills", i)}
                        className="text-red-500 hover:text-red-700 text-sm ml-4"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Education */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Education Timeline
                </label>
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <input
                    type="text"
                    name="education"
                    placeholder="Add education"
                    value={inputs.education}
                    onChange={handleArrayInputChange}
                    className="flex-1 p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <button
                    type="button"
                    onClick={() => addToList("education")}
                    className="bg-blue-500 text-white px-3 py-2 text-sm rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <ul className="list-disc list-inside text-gray-600 overflow-x-auto">
                  {formData.education.map((item, i) => (
                    <li key={i} className="flex justify-between items-center">
                      {item}
                      <button
                        onClick={() => removeFromList("education", i)}
                        className="text-red-500 hover:text-red-700 text-sm ml-4"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Work */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Current Work
                </label>
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <input
                    type="text"
                    name="work"
                    placeholder="Add work info"
                    value={inputs.work}
                    onChange={handleArrayInputChange}
                    className="flex-1 p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <button
                    type="button"
                    onClick={() => addToList("work")}
                    className="bg-blue-500 text-white px-3 py-2 text-sm rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <ul className="list-disc list-inside text-gray-600 overflow-x-auto">
                  {formData.work.map((item, i) => (
                    <li key={i} className="flex justify-between items-center">
                      {item}
                      <button
                        onClick={() => removeFromList("work", i)}
                        className="text-red-500 hover:text-red-700 text-sm ml-4"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Skills View */}
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  Skill Set
                </h3>
                <div className="overflow-x-auto">
                  <ul className="list-disc list-inside text-gray-700 bg-gray-100 p-3 rounded shadow-inner">
                    {formData.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Education View */}
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  Education Timeline
                </h3>
                <div className="overflow-x-auto">
                  <ul className="list-disc list-inside text-gray-700 bg-gray-100 p-3 rounded shadow-inner">
                    {formData.education.map((edu, i) => (
                      <li key={i}>{edu}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Work View */}
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  Current Work
                </h3>
                <div className="overflow-x-auto">
                  <ul className="list-disc list-inside text-gray-700 bg-gray-100 p-3 rounded shadow-inner">
                    {formData.work.map((job, i) => (
                      <li key={i}>{job}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
