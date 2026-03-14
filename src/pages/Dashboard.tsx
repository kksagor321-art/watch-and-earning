import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import { TrendingUp, Eye, DollarSign, Globe, Calculator, BarChart3 } from "lucide-react";
import { useState } from "react";

const statCards = [
  { label: "Total Coins", icon: DollarSign, value: "coins", gradient: "gradient-primary" },
  { label: "Ad Impressions", icon: Eye, value: "1,247", gradient: "gradient-accent" },
  { label: "Est. CPM", icon: TrendingUp, value: "$2.45", gradient: "gradient-success" },
];

const countries = [
  { name: "🇺🇸 USA", cpm: 12.5, traffic: 35 },
  { name: "🇬🇧 UK", cpm: 9.8, traffic: 15 },
  { name: "🇮🇳 India", cpm: 1.2, traffic: 25 },
  { name: "🇧🇩 Bangladesh", cpm: 0.8, traffic: 20 },
  { name: "🇧🇷 Brazil", cpm: 2.1, traffic: 5 },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [impressions, setImpressions] = useState(1000);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const estimatedEarning = ((impressions / 1000) * selectedCountry.cpm).toFixed(2);

  const chartBars = [65, 40, 80, 55, 90, 45, 70];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <AppLayout>
      <div className="pt-6 pb-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-muted-foreground text-sm">Welcome back,</p>
          <h1 className="text-xl font-bold text-foreground">{user?.name || "Learner"} 👋</h1>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${card.gradient} rounded-2xl p-3 text-primary-foreground shadow-elevated`}
          >
            <card.icon className="h-4 w-4 mb-1 opacity-80" />
            <p className="text-lg font-bold">
              {card.value === "coins" ? user?.coins || 0 : card.value}
            </p>
            <p className="text-[10px] opacity-80">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Mini Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl p-4 shadow-card mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm text-foreground">Weekly Impressions</h3>
          </div>
          <span className="text-xs text-success font-medium">+12.5%</span>
        </div>
        <div className="flex items-end gap-2 h-24">
          {chartBars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                className="w-full rounded-t-lg gradient-primary opacity-80"
              />
              <span className="text-[9px] text-muted-foreground">{days[i]}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CPM Calculator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-card rounded-2xl p-4 shadow-card mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm text-foreground">CPM Earnings Calculator</h3>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground">Impressions</label>
            <input
              type="range"
              min={100}
              max={100000}
              step={100}
              value={impressions}
              onChange={e => setImpressions(Number(e.target.value))}
              className="w-full accent-primary mt-1"
            />
            <p className="text-sm font-medium text-foreground">{impressions.toLocaleString()}</p>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Country Traffic</label>
            <div className="flex gap-2 mt-1 flex-wrap">
              {countries.map(c => (
                <button
                  key={c.name}
                  onClick={() => setSelectedCountry(c)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                    selectedCountry.name === c.name
                      ? "gradient-primary text-primary-foreground shadow-card"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-muted rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Est. Earnings</p>
              <p className="text-xl font-bold text-gradient-primary">${estimatedEarning}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">CPM Rate</p>
              <p className="text-sm font-semibold text-foreground">${selectedCountry.cpm}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Traffic Simulator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-card rounded-2xl p-4 shadow-card mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Globe className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm text-foreground">Traffic Distribution</h3>
        </div>
        <div className="space-y-2">
          {countries.map(c => (
            <div key={c.name} className="flex items-center gap-3">
              <span className="text-sm w-24 shrink-0">{c.name}</span>
              <div className="flex-1 bg-muted rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.traffic}%` }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="h-full rounded-full gradient-primary"
                />
              </div>
              <span className="text-xs text-muted-foreground w-8">{c.traffic}%</span>
            </div>
          ))}
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Dashboard;
