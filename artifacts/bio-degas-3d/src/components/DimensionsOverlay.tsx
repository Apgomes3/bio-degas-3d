import { useStore, calculateTopDownCrateDatum, calculateTopDownSupportDatum } from '@/store/useStore';
import { Ruler } from 'lucide-react';

export function DimensionsOverlay() {
  const envelope = useStore(s => s.envelope);
  const wallThickness = useStore(s => s.wallThickness);
  const trays = useStore(s => s.trays);
  const stacks = useStore(s => s.stacks);
  const crate = useStore(s => s.crate);
  const topDownTrayClearance = useStore(s => s.topDownTrayClearance);
  const stackFillDirection = useStore(s => s.stackFillDirection);
  
  const internalL = envelope.length - 2 * wallThickness;
  const internalW = envelope.width - 2 * wallThickness;
  const internalH = envelope.height - wallThickness;

  const lowestTrayUnderside = trays.length > 0
    ? Math.min(...trays.map(tray => internalH - tray.height))
    : null;

  const tallestActiveStack = Math.max(0, ...stacks.map(stack => stack.quantity));
  const tallestCrateHeight = tallestActiveStack * crate.height;

  let crateTopDatum: number | null = null;
  let supportDatum: number | null = null;
  let clearance: number | null = null;

  if (stackFillDirection === 'top') {
    crateTopDatum = calculateTopDownCrateDatum(envelope, wallThickness, trays, topDownTrayClearance);
    supportDatum = calculateTopDownSupportDatum(envelope, wallThickness, trays, topDownTrayClearance, stacks, crate.height);
    if (lowestTrayUnderside !== null && crateTopDatum !== null) {
      clearance = lowestTrayUnderside - crateTopDatum;
    }
  } else {
    crateTopDatum = tallestCrateHeight;
    if (lowestTrayUnderside !== null) {
      clearance = lowestTrayUnderside - crateTopDatum;
    }
  }

  return (
    <div className="absolute top-4 right-4 z-10 w-64 bg-card/95 backdrop-blur border border-border rounded-lg shadow-sm flex flex-col pointer-events-auto overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/30">
        <Ruler size={14} className="text-primary" />
        <h3 className="text-xs font-semibold tracking-wider text-foreground">DIMENSIONAL READOUTS</h3>
        <span className="ml-auto font-mono text-[9px] font-bold text-muted-foreground">mm</span>
      </div>
      <div className="flex flex-col p-3 gap-2.5 text-xs">
        <div className="flex justify-between items-baseline">
          <span className="text-muted-foreground font-medium">Envelope</span>
          <span className="font-mono text-foreground font-semibold">
            {envelope.length} <span className="text-muted-foreground/60">×</span> {envelope.width} <span className="text-muted-foreground/60">×</span> {envelope.height}
          </span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-muted-foreground font-medium">Internal Clear</span>
          <span className="font-mono text-foreground font-semibold">
            {internalL} <span className="text-muted-foreground/60">×</span> {internalW} <span className="text-muted-foreground/60">×</span> {internalH}
          </span>
        </div>
        
        <div className="h-px bg-border/50 my-0.5" />
        
        <div className="flex justify-between items-baseline">
          <span className="text-muted-foreground font-medium">Tray Underside</span>
          <span className="font-mono text-foreground font-semibold">
            {lowestTrayUnderside !== null ? lowestTrayUnderside : 'N/A'}
          </span>
        </div>

        {stackFillDirection === 'top' && (
          <div className="flex justify-between items-baseline">
            <span className="text-muted-foreground font-medium truncate mr-2">Top-Down Support</span>
            <span className="font-mono text-foreground font-semibold">
              {supportDatum !== null ? Math.round(supportDatum) : 'N/A'}
            </span>
          </div>
        )}

        <div className="flex justify-between items-baseline">
          <span className="text-muted-foreground font-medium">Tallest Crate Top</span>
          <span className="font-mono text-foreground font-semibold">
            {crateTopDatum !== null ? Math.round(crateTopDatum) : 'N/A'}
          </span>
        </div>
        
        <div className="h-px bg-border/50 my-0.5" />
        
        <div className="flex justify-between items-baseline">
          <span className="text-muted-foreground font-medium">Vertical Clearance</span>
          <span className={`font-mono font-bold ${clearance !== null && clearance < 0 ? 'text-destructive' : 'text-success'}`}>
            {clearance !== null ? Math.round(clearance) : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}
