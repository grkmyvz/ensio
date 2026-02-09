interface AlertProps {
  type: "warning" | "success" | "error";
  title: string;
  message: string;
  onClose?: () => void;
  link?: {
    href: string;
    text: string;
  };
}

const alertStyles = {
  warning: {
    container: "bg-yellow-950 border-yellow-800",
    icon: "text-yellow-400",
    title: "text-yellow-400",
    message: "text-yellow-200",
    closeButton: "text-yellow-600 hover:text-yellow-400",
  },
  success: {
    container: "bg-emerald-950 border-emerald-800",
    icon: "text-emerald-400",
    title: "text-emerald-400",
    message: "text-emerald-200",
    closeButton: "text-emerald-600 hover:text-emerald-400",
  },
  error: {
    container: "bg-red-950 border-red-800",
    icon: "text-red-400",
    title: "text-red-400",
    message: "text-red-200",
    closeButton: "text-red-600 hover:text-red-400",
  },
};

function Alert({ type, title, message, onClose, link }: AlertProps) {
  const styles = alertStyles[type];

  return (
    <div
      className={`${styles.container} border rounded p-4 animate-in fade-in duration-300`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className={`${styles.title} text-sm font-semibold mb-1`}>
            {title}
          </div>
          <div className={`${styles.message} text-xs ${link ? "mb-2" : ""}`}>
            {message}
          </div>
          {link && (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 hover:text-emerald-200 text-xs underline font-mono"
            >
              {link.text}
            </a>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`${styles.closeButton} text-sm cursor-pointer transition-colors`}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default Alert;
