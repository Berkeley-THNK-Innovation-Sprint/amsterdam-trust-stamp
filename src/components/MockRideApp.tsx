import { useState } from "react";
import { MapPin, Navigation, Clock, Star, Menu, User, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import AmsterdamTrustBadge from "./AmsterdamTrustBadge";
import TrustDetailPanel from "./TrustDetailPanel";

const MockRideApp = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto min-h-screen bg-background overflow-hidden font-sans">
      {/* Status bar mock */}
      <div className="flex items-center justify-between px-5 pt-3 pb-2">
        <Menu className="w-5 h-5 text-foreground" />
        <span className="font-display font-bold text-foreground text-lg tracking-tight">RideAI</span>
        <User className="w-5 h-5 text-foreground" />
      </div>

      {/* Map area */}
      <div className="relative h-72 bg-secondary overflow-hidden">
        {/* Stylized map grid */}
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Canal lines */}
          <path d="M 0 120 Q 100 80 200 130 Q 300 160 400 100" stroke="hsl(var(--trust-blue))" strokeWidth="3" fill="none" opacity="0.4" />
          <path d="M 0 180 Q 80 160 180 190 Q 280 210 400 170" stroke="hsl(var(--trust-blue))" strokeWidth="2" fill="none" opacity="0.3" />
        </svg>

        {/* Location pin */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full"
        >
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg">
              <Navigation className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="w-0.5 h-4 bg-accent/60" />
            <div className="w-2 h-2 rounded-full bg-accent/40" />
          </div>
        </motion.div>

        {/* Badge floating on map */}
        <div className="absolute top-4 right-4">
          <AmsterdamTrustBadge onClick={() => setShowDetails(true)} size="md" />
        </div>
      </div>

      {/* Ride booking section */}
      <div className="px-5 pt-5 pb-4 space-y-4">
        {/* Where to? */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-2xl bg-card border border-border shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Pickup</p>
              <p className="font-medium text-foreground text-sm">Centraal Station</p>
            </div>
          </div>
          <div className="ml-1.5 w-0.5 h-4 bg-border -my-1" />
          <div className="flex items-center gap-3 mt-3">
            <div className="w-3 h-3 rounded-sm bg-primary" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Destination</p>
              <p className="font-medium text-foreground text-sm">Vondelpark</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </motion.div>

        {/* Ride options */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="space-y-2"
        >
          <RideOption
            name="Standard"
            time="8 min"
            price="€7.50"
            rating="4.8"
            active
          />
          <RideOption
            name="Green"
            time="10 min"
            price="€8.20"
            rating="4.9"
            tag="Eco"
          />
        </motion.div>

        {/* Trust badge inline callout */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => setShowDetails(true)}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors text-left"
        >
          <AmsterdamTrustBadge onClick={() => setShowDetails(true)} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-display font-semibold text-foreground">Amsterdam AI Verified</p>
            <p className="text-xs text-muted-foreground">Tap to see how this app was evaluated</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </motion.button>

        {/* Book button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-display font-bold text-base tracking-wide hover:opacity-90 transition-opacity"
        >
          Book Ride
        </motion.button>
      </div>

      {/* Detail panel */}
      <TrustDetailPanel
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        appName="RideAI"
      />
    </div>
  );
};

const RideOption = ({
  name,
  time,
  price,
  rating,
  active,
  tag,
}: {
  name: string;
  time: string;
  price: string;
  rating: string;
  active?: boolean;
  tag?: string;
}) => (
  <div
    className={`flex items-center gap-3 p-3.5 rounded-xl border transition-colors ${
      active ? "border-primary bg-primary/5" : "border-border bg-card"
    }`}
  >
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${active ? "bg-primary" : "bg-secondary"}`}>
      <Navigation className={`w-5 h-5 ${active ? "text-primary-foreground" : "text-muted-foreground"}`} />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-foreground text-sm">{name}</span>
        {tag && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-trust-green/10 text-trust-green">
            {tag}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
        <Clock className="w-3 h-3" /> {time}
        <Star className="w-3 h-3 ml-1" /> {rating}
      </div>
    </div>
    <span className="font-display font-bold text-foreground">{price}</span>
  </div>
);

export default MockRideApp;
