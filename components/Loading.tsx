export default function Loading({ size = 24 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] bg-zinc-950">
      <div
        className="animate-spin rounded-full border-2 border-zinc-700 border-t-zinc-400"
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
}
