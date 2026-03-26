import { motion } from "framer-motion";
import { Car, Megaphone, ChevronRight, Sparkles } from "lucide-react";

interface GuidanceItem {
  icon: React.ReactNode;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
}

const guidanceItems: GuidanceItem[] = [
  {
    icon: <Car className="w-4 h-4" />,
    tag: "Live Pilot",
    tagColor: "bg-trust-green/10 text-trust-green",
    title: "Experience Autonomous Driving",
    description: "Join our controlled park pilot next week — experience AI-driven transport in a safe, supervised environment.",
  },
  {
    icon: <Megaphone className="w-4 h-4" />,
    tag: "Workshop",
    tagColor: "bg-trust-amber/10 text-trust-amber",
    title: "AI & Your Rights — Free Workshop",
    description: "Learn GDPR in practice, how to read trust scores, and exercise your data rights. Centraal Bibliotheek, Sat 14:00.",
  },
];

const TrustGuidanceSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
    className="mt-5"
  >
    <div className="flex items-center gap-2 mb-2">
      <Sparkles className="w-3.5 h-3.5 text-primary" />
      <h3 className="font-display font-bold text-foreground text-xs">Get Comfortable with AI</h3>
    </div>

    <div className="space-y-2">
      {guidanceItems.map((item, i) => (
        <motion.button
          key={item.title}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.75 + i * 0.08 }}
          className="w-full flex items-center gap-2.5 p-3 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors text-left"
        >
          <div className="w-7 h-7 rounded-md flex items-center justify-center bg-secondary text-muted-foreground flex-shrink-0">
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className={`text-[9px] px-1 py-px rounded-full font-semibold uppercase tracking-wider ${item.tagColor}`}>
                {item.tag}
              </span>
            </div>
            <p className="text-xs font-semibold text-foreground">{item.title}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{item.description}</p>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
        </motion.button>
      ))}
    </div>
  </motion.div>
);

export default TrustGuidanceSection;
