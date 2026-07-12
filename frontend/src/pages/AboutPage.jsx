import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal.jsx";

const BENEFITS = [
  {
    title: "Instant replies",
    text: "Powered by Groq's LPU inference engine, so answers arrive in real time instead of after a long wait.",
  },
  {
    title: "Natural conversation",
    text: "Remembers the flow of your chat, so follow-up questions make sense without repeating yourself.",
  },
  {
    title: "Simple, focused design",
    text: "One clear screen, one job — no clutter, no distracting menus, just a conversation.",
  },
  {
    title: "Works everywhere",
    text: "A responsive layout that feels equally at home on a phone, tablet, or desktop screen.",
  },
];

const FLOW = [
  { step: "01", title: "You type", text: "A message leaves the chat box on the Home page." },
  { step: "02", title: "React sends it", text: "The frontend posts your conversation to the backend API." },
  { step: "03", title: "Groq thinks", text: "Express forwards it to Groq's model over a secure request." },
  { step: "04", title: "Reply lands", text: "The answer streams back and appears as a new bubble." },
];

const STACK = [
  { name: "React", role: "Frontend UI" },
  { name: "Vite", role: "Frontend tooling" },
  { name: "React Router", role: "Page navigation" },
  { name: "Node.js", role: "Backend runtime" },
  { name: "Express", role: "Backend API" },
  { name: "Groq API", role: "AI inference" },
];

function AboutPage() {
  return (
    <section className="about-page">
      <div className="about-hero">
        <ScrollReveal direction="left">
          <span className="eyebrow">About Lumen</span>
          <h1>A chatbot built to feel effortless.</h1>
          <p>
            Lumen is a full-stack AI chat app. The frontend is a React interface for holding a
            conversation; the backend is a small Node.js server that securely forwards your
            messages to Groq's language models and sends the reply straight back. The goal is a
            chatbot that feels quick, colorful, and easy to trust.
          </p>
        </ScrollReveal>
      </div>

      <div className="about-page__grid">
        {BENEFITS.map((b, i) => (
          <ScrollReveal
            key={b.title}
            direction={i % 2 === 0 ? "left" : "right"}
            delay={i * 80}
            className="about__card"
          >
            <h3>{b.title}</h3>
            <p>{b.text}</p>
          </ScrollReveal>
        ))}
      </div>

      <div className="flow">
        <ScrollReveal direction="left">
          <h2 className="flow__title">How a message travels</h2>
        </ScrollReveal>
        <div className="flow__row">
          {FLOW.map((f, i) => (
            <ScrollReveal key={f.step} direction="left" delay={i * 120} className="flow__step">
              <span className="flow__number">{f.step}</span>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <ScrollReveal direction="right" className="about-page__stack">
        <h3 className="about__stack-title">Built with</h3>
        <div className="about__stack-tags">
          {STACK.map((s) => (
            <span className="tag" key={s.name}>
              <strong>{s.name}</strong>
              <span>{s.role}</span>
            </span>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal direction="left" className="about-page__cta">
        <p>Ready to see it in action?</p>
        <Link to="/" className="cta-button">
          Start chatting
        </Link>
      </ScrollReveal>
    </section>
  );
}

export default AboutPage;
