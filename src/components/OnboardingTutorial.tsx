import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { DollarSign, BarChart3, Zap, ListChecks, Wallet, ArrowRight, Sparkles } from "lucide-react";

const slides = [
  {
    icon: Sparkles,
    title: "Welcome to Ad Earnings Hub!",
    titleBn: "Ad Earnings Hub এ স্বাগতম!",
    desc: "Learn how AdMob & Adsterra work in a safe, simulated environment. No real money involved — just pure learning!",
    descBn: "নিরাপদ সিমুলেটেড পরিবেশে AdMob ও Adsterra কিভাবে কাজ করে তা শিখুন। আসল টাকা নয় — শুধুই শেখা!",
    gradient: "from-[hsl(199,89%,48%)] to-[hsl(260,60%,58%)]",
    bg: "bg-primary/5",
  },
  {
    icon: DollarSign,
    title: "What is AdMob?",
    titleBn: "AdMob কি?",
    desc: "AdMob is Google's platform for earning from mobile app ads. It supports banner, interstitial, rewarded & native ads.",
    descBn: "AdMob হলো Google এর প্ল্যাটফর্ম যেখানে মোবাইল অ্যাপের বিজ্ঞাপন থেকে আয় করা যায়। ব্যানার, ইন্টারস্টিশিয়াল, রিওয়ার্ডেড ও নেটিভ অ্যাড সমর্থন করে।",
    gradient: "from-[hsl(38,92%,50%)] to-[hsl(25,95%,53%)]",
    bg: "bg-accent/5",
  },
  {
    icon: BarChart3,
    title: "Understanding CPM",
    titleBn: "CPM কি?",
    desc: "CPM = Cost Per 1000 Impressions. If CPM is $5, you earn $5 for every 1,000 ad views. Rates vary by country — USA pays more than Bangladesh.",
    descBn: "CPM = প্রতি ১০০০ ইম্প্রেশনের খরচ। CPM $5 হলে প্রতি ১,০০০ বিজ্ঞাপন দেখায় $5 আয়। দেশ অনুযায়ী রেট ভিন্ন — USA বেশি দেয় বাংলাদেশের চেয়ে।",
    gradient: "from-[hsl(142,71%,45%)] to-[hsl(168,76%,42%)]",
    bg: "bg-success/5",
  },
  {
    icon: ListChecks,
    title: "Complete Tasks, Earn Coins",
    titleBn: "টাস্ক করুন, কয়েন আয় করুন",
    desc: "Watch demo ads, take quizzes, and read guides to earn virtual coins. Each task teaches you a real monetization concept.",
    descBn: "ডেমো বিজ্ঞাপন দেখুন, কুইজ দিন, গাইড পড়ুন এবং ভার্চুয়াল কয়েন আয় করুন। প্রতিটি টাস্ক আপনাকে সত্যিকারের মনিটাইজেশন ধারণা শেখায়।",
    gradient: "from-[hsl(199,89%,48%)] to-[hsl(260,60%,58%)]",
    bg: "bg-primary/5",
  },
  {
    icon: Wallet,
    title: "Track Your Progress",
    titleBn: "আপনার অগ্রগতি ট্র্যাক করুন",
    desc: "Check your wallet, learn about payment thresholds, and explore real payment methods like PayPal, Payoneer & Crypto.",
    descBn: "আপনার ওয়ালেট চেক করুন, পেমেন্ট থ্রেশহোল্ড সম্পর্কে শিখুন এবং PayPal, Payoneer ও Crypto-এর মতো পেমেন্ট মেথড জানুন।",
    gradient: "from-[hsl(38,92%,50%)] to-[hsl(25,95%,53%)]",
    bg: "bg-accent/5",
  },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

const OnboardingTutorial = ({ onComplete }: { onComplete: () => void }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const isLast = current === slides.length - 1;

  const paginate = (dir: number) => {
    if (dir === 1 && isLast) {
      onComplete();
      return;
    }
    const next = current + dir;
    if (next < 0 || next >= slides.length) return;
    setDirection(dir);
    setCurrent(next);
  };

  const handleDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) paginate(1);
    else if (swipe > swipeConfidenceThreshold) paginate(-1);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
  };

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col">
      {/* Skip */}
      <div className="flex justify-end p-4">
        <button onClick={onComplete} className="text-sm text-muted-foreground font-medium px-3 py-1.5 rounded-lg hover:bg-muted transition-colors">
          Skip
        </button>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="flex flex-col items-center text-center w-full max-w-sm cursor-grab active:cursor-grabbing"
          >
            {/* Icon circle */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${slide.gradient} flex items-center justify-center mb-8 shadow-elevated`}
            >
              <Icon className="h-12 w-12 text-primary-foreground" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-2xl font-extrabold text-foreground mb-2"
            >
              {slide.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-muted-foreground leading-relaxed mb-3"
            >
              {slide.desc}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-sm text-muted-foreground/70 leading-relaxed italic"
            >
              {slide.descBn}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="p-6 pb-8 flex flex-col items-center gap-5">
        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Next / Get Started button */}
        <button
          onClick={() => paginate(1)}
          className={`w-full max-w-xs h-14 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition-all shadow-elevated ${
            isLast
              ? "bg-gradient-to-r from-[hsl(38,92%,50%)] to-[hsl(25,95%,53%)] text-primary-foreground"
              : "gradient-primary text-primary-foreground"
          }`}
        >
          {isLast ? "Get Started" : "Next"}
          <ArrowRight className="h-5 w-5" />
        </button>

        <p className="text-xs text-muted-foreground">
          Swipe left or right to navigate
        </p>
      </div>
    </div>
  );
};

export default OnboardingTutorial;
