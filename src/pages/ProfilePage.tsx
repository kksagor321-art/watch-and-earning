import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import { User, LogOut, Shield, Trophy, Calendar, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const stats = [
    { label: "Total Coins", value: user?.coins || 0, icon: Trophy },
    { label: "Tasks Done", value: user?.completedTasks.length || 0, icon: Calendar },
    { label: "Member Since", value: user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : "—", icon: Calendar },
  ];

  return (
    <AppLayout>
      <div className="pt-6 pb-4">
        <h1 className="text-xl font-bold text-foreground">Profile</h1>
      </div>

      {/* User Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-primary rounded-3xl p-5 mb-6 shadow-elevated text-primary-foreground"
      >
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
            <User className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{user?.name || "User"}</h2>
            <div className="flex items-center gap-1 opacity-80">
              <Mail className="h-3 w-3" />
              <span className="text-sm">{user?.email || ""}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-3 shadow-card text-center"
          >
            <s.icon className="h-4 w-4 mx-auto text-primary mb-1" />
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Admin Demo Link */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => navigate("/admin")}
        className="w-full bg-card rounded-2xl p-4 shadow-card flex items-center gap-3 mb-3"
      >
        <div className="p-2 rounded-xl bg-secondary/10">
          <Shield className="h-5 w-5 text-secondary" />
        </div>
        <div className="text-left flex-1">
          <h3 className="font-semibold text-sm text-foreground">Admin Panel (Demo)</h3>
          <p className="text-xs text-muted-foreground">Manage tasks, users & analytics</p>
        </div>
      </motion.button>

      {/* Logout */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={handleLogout}
        className="w-full bg-destructive/10 rounded-2xl p-4 flex items-center gap-3 mt-3"
      >
        <LogOut className="h-5 w-5 text-destructive" />
        <span className="font-semibold text-sm text-destructive">Log Out</span>
      </motion.button>
    </AppLayout>
  );
};

export default ProfilePage;
