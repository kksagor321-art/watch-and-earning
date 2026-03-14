import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import { BookOpen, Globe, ChevronRight } from "lucide-react";
import { useState } from "react";

const guides = [
  {
    id: 1,
    titleEn: "What is AdMob?",
    titleBn: "AdMob কি?",
    contentEn: "AdMob is Google's mobile advertising platform that lets app developers earn money by displaying ads in their apps. It supports banner, interstitial, rewarded, and native ads. Revenue is calculated based on CPM (Cost Per Mille) and CPC (Cost Per Click).",
    contentBn: "AdMob হলো Google এর মোবাইল বিজ্ঞাপন প্ল্যাটফর্ম যা অ্যাপ ডেভেলপারদের তাদের অ্যাপে বিজ্ঞাপন দেখিয়ে অর্থ উপার্জন করতে দেয়। এটি ব্যানার, ইন্টারস্টিশিয়াল, রিওয়ার্ডেড এবং নেটিভ বিজ্ঞাপন সমর্থন করে।",
    category: "Basics",
  },
  {
    id: 2,
    titleEn: "What is Adsterra?",
    titleBn: "Adsterra কি?",
    contentEn: "Adsterra is a global advertising network supporting web and mobile publishers. It offers popunder, social bar, native, banner, and video ads. Known for high CPM rates, especially for Tier 1 traffic from USA, UK, and Canada.",
    contentBn: "Adsterra হলো একটি গ্লোবাল বিজ্ঞাপন নেটওয়ার্ক যা ওয়েব এবং মোবাইল পাবলিশারদের সমর্থন করে। এটি পপআন্ডার, সোশ্যাল বার, নেটিভ, ব্যানার এবং ভিডিও বিজ্ঞাপন অফার করে।",
    category: "Basics",
  },
  {
    id: 3,
    titleEn: "Understanding CPM",
    titleBn: "CPM বোঝা",
    contentEn: "CPM stands for Cost Per Mille (thousand impressions). If CPM is $5, you earn $5 for every 1000 ad views. CPM varies by country — USA traffic can have $10-15 CPM while South Asian traffic may be $0.5-2 CPM.",
    contentBn: "CPM মানে হলো Cost Per Mille (প্রতি হাজার ইম্প্রেশন)। যদি CPM $5 হয়, তাহলে আপনি প্রতি ১০০০ বিজ্ঞাপন দেখানোতে $5 আয় করবেন। CPM দেশ অনুযায়ী ভিন্ন হয়।",
    category: "Earning",
  },
  {
    id: 4,
    titleEn: "How to Grow Traffic",
    titleBn: "ট্রাফিক কিভাবে বাড়াবেন",
    contentEn: "Focus on SEO, social media marketing, content quality, and app store optimization. Build organic traffic through YouTube, Facebook groups, and Telegram channels. Consistent content creation is key to sustainable growth.",
    contentBn: "SEO, সোশ্যাল মিডিয়া মার্কেটিং, কন্টেন্ট কোয়ালিটি এবং অ্যাপ স্টোর অপটিমাইজেশনে ফোকাস করুন। YouTube, Facebook গ্রুপ এবং Telegram চ্যানেলের মাধ্যমে অর্গানিক ট্রাফিক তৈরি করুন।",
    category: "Growth",
  },
  {
    id: 5,
    titleEn: "Payment Methods Guide",
    titleBn: "পেমেন্ট মেথড গাইড",
    contentEn: "AdMob pays via wire transfer with a $100 minimum. Adsterra offers PayPal ($5 min), Paxum ($5 min), Wire ($100 min), Bitcoin ($100 min), and WebMoney. Choose based on your country's availability and fees.",
    contentBn: "AdMob ওয়্যার ট্রান্সফারের মাধ্যমে $100 মিনিমামে পেমেন্ট করে। Adsterra PayPal ($5 মিন), Wire ($100 মিন), Bitcoin ($100 মিন) অফার করে। আপনার দেশের প্রাপ্যতা অনুযায়ী বেছে নিন।",
    category: "Payment",
  },
];

const GuidePage = () => {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <AppLayout>
      <div className="pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Earning Guide</h1>
            <p className="text-sm text-muted-foreground">Learn ad monetization basics</p>
          </div>
          <button
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card shadow-card text-sm font-medium text-foreground"
          >
            <Globe className="h-4 w-4 text-primary" />
            {lang === "en" ? "বাংলা" : "English"}
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {guides.map((guide, i) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <button
              onClick={() => setOpenId(openId === guide.id ? null : guide.id)}
              className="w-full bg-card rounded-2xl p-4 shadow-card text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">
                      {lang === "en" ? guide.titleEn : guide.titleBn}
                    </h3>
                    <span className="text-xs text-muted-foreground">{guide.category}</span>
                  </div>
                </div>
                <ChevronRight
                  className={`h-4 w-4 text-muted-foreground transition-transform ${
                    openId === guide.id ? "rotate-90" : ""
                  }`}
                />
              </div>
              {openId === guide.id && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-sm text-muted-foreground mt-3 leading-relaxed"
                >
                  {lang === "en" ? guide.contentEn : guide.contentBn}
                </motion.p>
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
};

export default GuidePage;
