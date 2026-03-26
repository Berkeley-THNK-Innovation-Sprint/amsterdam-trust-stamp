import MockRideApp from "@/components/MockRideApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      {/* Phone frame */}
      <div className="relative w-full max-w-md rounded-[2.5rem] border-[8px] border-foreground/10 shadow-2xl overflow-hidden bg-background">
        <MockRideApp />
      </div>
    </div>
  );
};

export default Index;
