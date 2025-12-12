import { SignupForm } from "../components/SignupForm";


export function SignupPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </main>
  );
}

export default SignupPage;
