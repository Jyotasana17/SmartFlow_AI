export default function Loading() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="glass-panel rounded-lg px-6 py-5 text-cyan-100 shadow-glow">
        <div className="h-1 w-64 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-1/2 animate-shimmer bg-cyber-cyan" />
        </div>
        <p className="mt-4 text-sm uppercase tracking-[0.2em] text-cyan-100/60">Synchronizing city telemetry</p>
      </div>
    </div>
  );
}
