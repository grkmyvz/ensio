interface TerminalHeaderProps {
  title: string;
  onClose?: () => void;
  children?: React.ReactNode;
}

export default function TerminalHeader({
  title,
  onClose,
  children,
}: TerminalHeaderProps) {
  return (
    <div className="bg-zinc-800 border-b border-zinc-700 px-4 py-2 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
      </div>
      <span className="text-zinc-500 text-xs font-mono ml-2">{title}</span>
      {children}
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
        >
          ✕
        </button>
      )}
    </div>
  );
}
