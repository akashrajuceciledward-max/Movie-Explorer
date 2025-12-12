import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

interface User {
  email: string
  username: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // ✅ VITE environment variable access
      const validUsername = import.meta.env.VITE_AUTH_USERNAME
      const validPassword = import.meta.env.VITE_AUTH_PASSWORD

      console.log("VITE ENV VALUES:", validUsername, validPassword)

      if (email === validUsername && password === validPassword) {
        const userData: User = {
          email,
          username: email.split("@")[0],
        }

        setUser(userData)
        localStorage.setItem("auth_user", JSON.stringify(userData))

        return true
      }

      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
