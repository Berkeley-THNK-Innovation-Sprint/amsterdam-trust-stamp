import MockHealthApp from "@/components/MockHealthApp";
import MockFinanceApp from "@/components/MockFinanceApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-muted p-6 space-y-12">
      {/* MedAI — two versions */}
      <div>
        <h2 className="text-center font-display font-bold text-xl text-foreground mb-6">MedAI — Healthcare</h2>
        <div className="flex items-start justify-center gap-8 flex-wrap">
          <div className="text-center space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-trust-green/10 text-trust-green text-xs font-display font-semibold tracking-wider uppercase">
              ✓ Amsterdam AI Verified
            </span>
            <div className="relative w-full max-w-sm rounded-[2.5rem] border-[8px] border-foreground/10 shadow-2xl overflow-hidden bg-background">
              <MockHealthApp approved />
            </div>
          </div>
          <div className="text-center space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-display font-semibold tracking-wider uppercase">
              ✗ Not Approved
            </span>
            <div className="relative w-full max-w-sm rounded-[2.5rem] border-[8px] border-foreground/10 shadow-2xl overflow-hidden bg-background">
              <MockHealthApp approved={false} />
            </div>
          </div>
        </div>
      </div>

      {/* WealthBot — two versions */}
      <div>
        <h2 className="text-center font-display font-bold text-xl text-foreground mb-6">WealthBot — Finance</h2>
        <div className="flex items-start justify-center gap-8 flex-wrap">
          <div className="text-center space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-trust-green/10 text-trust-green text-xs font-display font-semibold tracking-wider uppercase">
              ✓ Amsterdam AI Verified
            </span>
            <div className="relative w-full max-w-sm rounded-[2.5rem] border-[8px] border-foreground/10 shadow-2xl overflow-hidden bg-background">
              <MockFinanceApp approved />
            </div>
          </div>
          <div className="text-center space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-display font-semibold tracking-wider uppercase">
              ✗ Not Approved
            </span>
            <div className="relative w-full max-w-sm rounded-[2.5rem] border-[8px] border-foreground/10 shadow-2xl overflow-hidden bg-background">
              <MockFinanceApp approved={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

export default Index;
