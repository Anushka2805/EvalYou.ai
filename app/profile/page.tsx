export default function ProfilePage() {
  return (
    <div className="min-h-screen pt-24 px-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
      <p className="text-gray-400 mb-8">
        Manage your CV, skills, and interview preferences.
      </p>

      {/* Basic Info */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Full Name"
            className="bg-black border border-white/20 rounded-lg p-3"
          />
          <input
            placeholder="Email"
            className="bg-black border border-white/20 rounded-lg p-3"
          />
          <input
            placeholder="Target Role (e.g. Software Engineer)"
            className="bg-black border border-white/20 rounded-lg p-3"
          />
          <input
            placeholder="Experience Level (e.g. Fresher, 1-3 yrs)"
            className="bg-black border border-white/20 rounded-lg p-3"
          />
        </div>
      </div>

      {/* CV Section */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Your CV</h2>
        <p className="text-gray-400 text-sm mb-4">
          Upload your CV to get personalized interview questions.
        </p>
        <input
          type="file"
          className="block w-full text-sm text-gray-400
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-purple-500 file:text-white
            hover:file:bg-purple-600
          "
        />
        <div className="mt-4 text-sm text-gray-400">
          Current CV: <span className="text-white">resume.pdf</span>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Skills & Tech Stack</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {["React", "Node.js", "Python", "MongoDB", "ML"].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
        <input
          placeholder="Add new skill..."
          className="bg-black border border-white/20 rounded-lg p-3 w-full"
        />
      </div>

      {/* Save Button */}
      <button className="bg-purple-500 hover:bg-purple-600 transition px-6 py-3 rounded-lg font-medium">
        Save Profile
      </button>
    </div>
  );
}