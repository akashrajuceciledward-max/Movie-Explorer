import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string; login?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors: any = {}

    if (!email) newErrors.email = "Email is required"
    if (!password) newErrors.password = "Password is required"
    if (password && password.length < 8) newErrors.password = "Password must be at least 8 characters"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    const success = await login(email, password)

    if (success) navigate("/")
    else setErrors({ login: "Invalid email or password" })

    setIsLoading(false)
  }

  return (
    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
          <span className="text-2xl text-white">🎬</span>
        </div>

        <h1 className="text-3xl font-bold text-white mt-4">Welcome Back</h1>
        <p className="text-gray-300 text-sm">Sign in to continue</p>
      </div>

      {/* Login Error */}
      {errors.login && (
        <div className="p-3 mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg text-center animate-pulse">
          {errors.login}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Email */}
        <div>
          <label className="block text-sm text-gray-200 mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-gray-900/60 border text-gray-100 placeholder-gray-500 outline-none transition 
              ${errors.email ? "border-red-500" : "border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"}`}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-200 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-gray-900/60 border text-gray-100 placeholder-gray-500 outline-none transition 
              ${errors.password ? "border-red-500" : "border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"}`}
          />
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold
          shadow-lg hover:scale-[1.02] active:scale-95 transition disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-gray-300 text-sm mt-6">
        Don’t have an account?{" "}
        <a href="/signup" className="text-purple-400 hover:underline">Sign up</a>
      </p>

      {/* Demo credentials */}
      {/* <div className="mt-6 p-4 bg-gray-900/60 border border-gray-700 rounded-xl">
        <p className="text-xs font-semibold text-purple-400 mb-2">Demo Credentials</p>
        <p className="text-xs text-gray-300">📧 {import.meta.env.VITE_AUTH_USERNAME}</p>
        <p className="text-xs text-gray-300">🔐 {import.meta.env.VITE_AUTH_PASSWORD}</p>
      </div> */}
    </div>
  )
}
