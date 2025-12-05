export default function SimdGridOverlay() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none animate-pulse-slow"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        maskImage:
          "radial-gradient(circle at center, black 40%, transparent 100%)",
      }}
    ></div>
  );
}
