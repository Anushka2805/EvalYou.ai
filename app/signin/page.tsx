export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="bg-white/5 p-8 rounded-xl w-full max-w-md border border-white/10">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        <input
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-black border border-white/20"
        />
        <input
          placeholder="Password"
          type="password"
          className="w-full mb-4 p-3 rounded bg-black border border-white/20"
        />
        <button className="w-full bg-purple-500 py-3 rounded hover:bg-purple-600 transition">
          Sign In
        </button>
      </div>
    </div>
  );
}