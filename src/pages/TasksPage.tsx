import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import { Play, Share2, HelpCircle, BookOpen, Star, CheckCircle2, Coins } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const tasks = [
  { id: "watch-ad", title: "Watch Demo Ad Video", desc: "Learn how video ads generate revenue", icon: Play, coins: 10, category: "Learning" },
  { id: "share-link", title: "Share Referral Link", desc: "Simulate sharing your referral code", icon: Share2, coins: 15, category: "Social" },
  { id: "quiz-cpm", title: "Complete CPM Quiz", desc: "Test your knowledge about CPM rates", icon: HelpCircle, coins: 20, category: "Quiz" },
  { id: "read-guide", title: "Read Earning Guide", desc: "Go through the beginner's guide", icon: BookOpen, coins: 10, category: "Learning" },
  { id: "daily-check", title: "Daily Check-in", desc: "Come back every day to earn bonus", icon: Star, coins: 5, category: "Daily" },
  { id: "quiz-admob", title: "AdMob Basics Quiz", desc: "Answer questions about AdMob setup", icon: HelpCircle, coins: 25, category: "Quiz" },
];

const TasksPage = () => {
  const { user, addCoins, completeTask } = useAuth();
  const [completing, setCompleting] = useState<string | null>(null);

  const handleComplete = (taskId: string, coins: number) => {
    if (user?.completedTasks.includes(taskId)) return;
    setCompleting(taskId);
    setTimeout(() => {
      addCoins(coins);
      completeTask(taskId);
      setCompleting(null);
      toast.success(`+${coins} coins earned!`, { description: "Keep completing tasks to learn more" });
    }, 1500);
  };

  const completed = user?.completedTasks || [];
  const totalCoins = tasks.reduce((s, t) => s + t.coins, 0);
  const earnedCoins = tasks.filter(t => completed.includes(t.id)).reduce((s, t) => s + t.coins, 0);

  return (
    <AppLayout>
      <div className="pt-6 pb-4">
        <h1 className="text-xl font-bold text-foreground">Learning Tasks</h1>
        <p className="text-sm text-muted-foreground">Complete tasks to earn virtual coins</p>
      </div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-primary rounded-2xl p-4 mb-6 shadow-elevated"
      >
        <div className="flex items-center justify-between text-primary-foreground">
          <div>
            <p className="text-sm opacity-80">Progress</p>
            <p className="text-2xl font-bold">{completed.length}/{tasks.length}</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">Earned</p>
            <div className="flex items-center gap-1">
              <Coins className="h-4 w-4" />
              <p className="text-2xl font-bold">{earnedCoins}/{totalCoins}</p>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-primary-foreground/20 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completed.length / tasks.length) * 100}%` }}
            className="h-full rounded-full bg-primary-foreground"
          />
        </div>
      </motion.div>

      {/* Task List */}
      <div className="space-y-3 mb-6">
        {tasks.map((task, i) => {
          const done = completed.includes(task.id);
          const isLoading = completing === task.id;
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`bg-card rounded-2xl p-4 shadow-card flex items-center gap-3 transition-all ${
                done ? "opacity-60" : ""
              }`}
            >
              <div className={`p-2.5 rounded-xl ${done ? "bg-success/10" : "bg-primary/10"}`}>
                {done ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <task.icon className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-foreground">{task.title}</h3>
                <p className="text-xs text-muted-foreground">{task.desc}</p>
              </div>
              <button
                onClick={() => handleComplete(task.id, task.coins)}
                disabled={done || isLoading}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  done
                    ? "bg-success/10 text-success"
                    : isLoading
                    ? "bg-muted text-muted-foreground animate-pulse"
                    : "gradient-accent text-accent-foreground shadow-card"
                }`}
              >
                {done ? "Done" : isLoading ? "..." : `+${task.coins} 🪙`}
              </button>
            </motion.div>
          );
        })}
      </div>
    </AppLayout>
  );
};

export default TasksPage;
