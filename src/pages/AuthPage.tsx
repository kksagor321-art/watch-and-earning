import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Zap } from "lucide-react";
import OnboardingTutorial from "@/components/OnboardingTutorial";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill all fields"); return; }
    if (!isLogin && !name) { setError("Please enter your name"); return; }

    const success = isLogin ? login(email, password) : signup(name, email, password);
    if (success) navigate("/dashboard");
    else setError("Something went wrong");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-sm mx-auto w-full"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-2xl mb-4">
            <DollarSign className="h-6 w-6" />
            <span className="font-bold text-lg">Ad Earnings Hub</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mt-4">
            {isLogin ? "Welcome Back!" : "Start Learning"}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {isLogin ? "Sign in to continue learning" : "Create your free demo account"}
          </p>
        </div>

        {!isLogin && (
          <div className="flex gap-3 mb-6">
            {[
              { icon: TrendingUp, text: "Learn CPM" },
              { icon: DollarSign, text: "Earn Coins" },
              { icon: Zap, text: "Grow Skills" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex-1 bg-card rounded-xl p-3 shadow-card text-center">
                <Icon className="h-5 w-5 mx-auto text-primary mb-1" />
                <span className="text-xs font-medium text-foreground">{text}</span>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <Input
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="h-12 rounded-xl bg-card border-border"
            />
          )}
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="h-12 rounded-xl bg-card border-border"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="h-12 rounded-xl bg-card border-border"
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold text-base shadow-elevated">
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
            className="text-primary font-semibold"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
