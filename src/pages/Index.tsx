import MockHealthApp from "@/components/MockHealthApp";
import MockFinanceApp from "@/components/MockFinanceApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center gap-8 p-4 flex-wrap">
      {/* Approved app — Healthcare */}
      <div className="text-center space-y-3">
        <span className="inline-block px-3 py-1 rounded-full bg-trust-green/10 text-trust-green text-xs font-display font-semibold tracking-wider uppercase">
          ✓ Amsterdam AI Verified
        </span>
        <div className="relative w-full max-w-md rounded-[2.5rem] border-[8px] border-foreground/10 shadow-2xl overflow-hidden bg-background">
          <MockHealthApp />
        </div>
      </div>

      {/* Not approved app — Finance */}
      <div className="text-center space-y-3">
        <span className="inline-block px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-display font-semibold tracking-wider uppercase">
          ✗ Not Approved
        </span>
        <div className="relative w-full max-w-md rounded-[2.5rem] border-[8px] border-foreground/10 shadow-2xl overflow-hidden bg-background">
          <MockFinanceApp />
        </div>
      </div>
    </div>
  );
};

export default Index;
