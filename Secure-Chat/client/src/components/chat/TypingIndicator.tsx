export function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in" data-testid="typing-indicator">
      <div className="message-bubble-received px-4 py-3">
        <div className="flex gap-1">
          <span className="typing-dot w-2 h-2 bg-zinc-400 rounded-full" />
          <span className="typing-dot w-2 h-2 bg-zinc-400 rounded-full" />
          <span className="typing-dot w-2 h-2 bg-zinc-400 rounded-full" />
        </div>
      </div>
    </div>
  );
}
