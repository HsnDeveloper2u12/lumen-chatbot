import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "/api/chat";

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Hi, I'm Lumen  Ask me anything. I reply in real time.",
};

function Chat() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  const autoGrow = (el) => {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsThinking(true);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.filter((m) => m !== WELCOME_MESSAGE),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err.message || "Couldn't reach the server. Is the backend running?");
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-shell">
      <div className="chat-shell__intro">
        <span className="eyebrow">Real-time · Groq powered</span>
        <h1>Talk to Lumen, get answers instantly.</h1>
        <p className="chat-shell__subtitle">
          A fast, friendly AI assistant that replies the moment you hit send. No sign-up, no
          waiting — just a conversation.
        </p>
      </div>

      <div className="chat-card">
        <div className="chat-card__header">
          <span className="chat-card__orb" data-thinking={isThinking} aria-hidden="true"></span>
          <div>
            <p className="chat-card__title">Lumen</p>
            <p className="chat-card__status">{isThinking ? "Thinking…" : "Online"}</p>
          </div>
        </div>

        <div className="chat-card__messages" ref={scrollRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`bubble bubble--${msg.role}`}>
              <p>{msg.content}</p>
            </div>
          ))}

          {isThinking && (
            <div className="bubble bubble--assistant bubble--typing">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
        </div>

        {error && <p className="chat-card__error">{error}</p>}

        <div className="chat-card__input-row">
          <textarea
            ref={textareaRef}
            value={input}
            placeholder="Write a message."
            rows={1}
            onChange={(e) => {
              setInput(e.target.value);
              autoGrow(e.target);
            }}
            onKeyDown={handleKeyDown}
          />
          <button
            className="chat-card__send"
            onClick={sendMessage}
            disabled={!input.trim() || isThinking}
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
