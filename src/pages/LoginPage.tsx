import { LoginForm } from "../components/LoginForm"

export function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* BEAUTIFUL BACKGROUND DECORATION */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* FORM WRAPPER */}
      <div className="w-full max-w-md">
        <LoginForm />
      </div>

    </main>
  )
}
