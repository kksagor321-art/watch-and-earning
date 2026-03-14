import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import { Wallet, ArrowUpRight, Building2, CreditCard, Bitcoin, Globe } from "lucide-react";

const paymentMethods = [
  { name: "Bank Transfer", icon: Building2, min: "$100", desc: "Direct bank deposit, 3-5 business days", color: "bg-primary/10 text-primary" },
  { name: "PayPal", icon: CreditCard, min: "$10", desc: "Fast digital payment, instant transfer", color: "bg-secondary/10 text-secondary" },
  { name: "Payoneer", icon: Globe, min: "$20", desc: "Global payments for freelancers", color: "bg-success/10 text-success" },
  { name: "Crypto (USDT)", icon: Bitcoin, min: "$50", desc: "Blockchain payment, low fees", color: "bg-accent/10 text-accent" },
];

const WalletPage = () => {
  const { user } = useAuth();
  const balance = user?.coins || 0;
  const threshold = 500;
  const progress = Math.min((balance / threshold) * 100, 100);

  const transactions = [
    { desc: "Watch Demo Ad", amount: "+10", time: "2 min ago" },
    { desc: "CPM Quiz Complete", amount: "+20", time: "1 hour ago" },
    { desc: "Daily Check-in", amount: "+5", time: "Today" },
    { desc: "Signup Bonus", amount: "+50", time: "On join" },
  ];

  return (
    <AppLayout>
      <div className="pt-6 pb-4">
        <h1 className="text-xl font-bold text-foreground">Wallet</h1>
        <p className="text-sm text-muted-foreground">Your virtual earnings overview</p>
      </div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="gradient-primary rounded-3xl p-5 mb-6 shadow-elevated text-primary-foreground"
      >
        <div className="flex items-center gap-2 mb-1">
          <Wallet className="h-5 w-5 opacity-80" />
          <span className="text-sm opacity-80">Virtual Balance</span>
        </div>
        <p className="text-4xl font-extrabold">{balance} <span className="text-lg opacity-70">coins</span></p>
        <div className="mt-4">
          <div className="flex justify-between text-xs opacity-80 mb-1">
            <span>Payout Threshold</span>
            <span>{balance}/{threshold}</span>
          </div>
          <div className="bg-primary-foreground/20 rounded-full h-2.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-full rounded-full bg-primary-foreground"
            />
          </div>
          {progress >= 100 && (
            <p className="text-xs mt-2 font-medium">🎉 You've reached the payout threshold!</p>
          )}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <div className="mb-6">
        <h3 className="font-semibold text-sm text-foreground mb-3">Recent Activity</h3>
        <div className="bg-card rounded-2xl shadow-card divide-y divide-border">
          {transactions.map((tx, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="flex items-center justify-between p-3"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <ArrowUpRight className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.desc}</p>
                  <p className="text-xs text-muted-foreground">{tx.time}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-success">{tx.amount}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <h3 className="font-semibold text-sm text-foreground mb-3">Payment Methods (Educational)</h3>
        <div className="grid grid-cols-2 gap-3">
          {paymentMethods.map((pm, i) => (
            <motion.div
              key={pm.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="bg-card rounded-2xl p-4 shadow-card"
            >
              <div className={`inline-flex p-2 rounded-xl ${pm.color} mb-2`}>
                <pm.icon className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-sm text-foreground">{pm.name}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{pm.desc}</p>
              <div className="mt-2 px-2 py-1 rounded-lg bg-muted inline-block">
                <span className="text-xs font-medium text-foreground">Min: {pm.min}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default WalletPage;
