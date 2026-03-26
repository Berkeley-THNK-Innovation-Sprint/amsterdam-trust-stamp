import { motion } from "framer-motion";
import { GraduationCap, Car, Megaphone, Gift, ChevronRight, Sparkles } from "lucide-react";

interface GuidanceItem {
  icon: React.ReactNode;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
}

const guidanceItems: GuidanceItem[] = [
  {
    icon: <Car className="w-5 h-5" />,
    tag: "Live Pilot",
    tagColor: "bg-trust-green/10 text-trust-green",
    title: "Experience Autonomous Driving",
    description: "Join our controlled park pilot next week — order a cab in a safe, supervised environment to experience AI-driven transport first-hand.",
  },
  {
    icon: <Gift className="w-5 h-5" />,
    tag: "Low Stakes",
    tagColor: "bg-trust-blue/10 text-trust-blue",
    title: "Try AI with Non-Sensitive Data",
    description: "Share only your preferred language to get localised tips. A small, safe step to see how AI personalisation works for you.",
  },
  {
    icon: <Megaphone className="w-5 h-5" />,
    tag: "Workshop",
    tagColor: "bg-trust-amber/10 text-trust-amber",
    title: "AI & Your Rights — Free Workshop",
    description: "Learn what GDPR means in practice, how to read a trust score, and how to exercise your data rights. Next session: Centraal Bibliotheek, Saturday 14:00.",
  },
];

const TrustGuidanceSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
    className="mt-6"
  >
    <div className="flex items-center gap-2 mb-3">
      <Sparkles className="w-4 h-4 text-primary" />
      <h3 className="font-display font-bold text-foreground text-sm">Get Comfortable with AI</h3>
    </div>
    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
      Trust scores inform — but hands-on experience builds real confidence. Explore these Amsterdam-endorsed opportunities to interact with AI safely.
    </p>

    <div className="space-y-3">
      {guidanceItems.map((item, i) => (
        <motion.button
          key={item.title}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.75 + i * 0.08 }}
          className="w-full flex items-start gap-3 p-3.5 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors text-left"
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-secondary text-muted-foreground flex-shrink-0">
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${item.tagColor}`}>
                {item.tag}
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">{item.title}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
        </motion.button>
      ))}
    </div>
  </motion.div>
);

export default TrustGuidanceSection;
