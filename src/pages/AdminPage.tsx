import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import { Users, BarChart3, Settings, Coins, TrendingUp, Activity } from "lucide-react";

const AdminPage = () => {
  const mockUsers = [
    { name: "Rahim Khan", coins: 150, tasks: 4 },
    { name: "Fatima Ali", coins: 320, tasks: 6 },
    { name: "Karim Ahmed", coins: 85, tasks: 2 },
    { name: "Nusrat Jahan", coins: 210, tasks: 5 },
  ];

  const adUnits = [
    { name: "Banner Ad", type: "Banner", cpm: "$2.50", status: "Active" },
    { name: "Interstitial", type: "Fullscreen", cpm: "$8.00", status: "Active" },
    { name: "Rewarded Video", type: "Video", cpm: "$15.00", status: "Paused" },
  ];

  return (
    <AppLayout>
      <div className="pt-6 pb-4">
        <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
        <p className="text-sm text-muted-foreground">Demo management dashboard</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Total Users", value: "1,247", icon: Users, gradient: "gradient-primary" },
          { label: "Active Tasks", value: "6", icon: Activity, gradient: "gradient-accent" },
          { label: "Total Rewards", value: "24,500", icon: Coins, gradient: "gradient-success" },
          { label: "Growth", value: "+18%", icon: TrendingUp, gradient: "gradient-primary" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className={`${s.gradient} rounded-2xl p-4 text-primary-foreground shadow-elevated`}
          >
            <s.icon className="h-5 w-5 opacity-80 mb-1" />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs opacity-80">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Ad Units */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm text-foreground">Ad Units</h3>
        </div>
        <div className="bg-card rounded-2xl shadow-card divide-y divide-border">
          {adUnits.map((ad, i) => (
            <motion.div
              key={ad.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="p-3 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{ad.name}</p>
                <p className="text-xs text-muted-foreground">{ad.type} • CPM {ad.cpm}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
                ad.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
              }`}>
                {ad.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Users */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm text-foreground">Recent Users</h3>
        </div>
        <div className="bg-card rounded-2xl shadow-card divide-y divide-border">
          {mockUsers.map((u, i) => (
            <motion.div
              key={u.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="p-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {u.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.tasks} tasks completed</p>
                </div>
              </div>
              <span className="text-sm font-bold text-foreground">{u.coins} 🪙</span>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminPage;
