'use client';

import { useState, useRef, useEffect } from 'react';

const defaultMessages = [
  {
    sender: 'bot',
    text: "Hi! I'm Caxie, your AI assistant. Ask me about our services, pricing, case studies, or how to get started.",
  },
];

const QA_MAP = [
  {
    patterns: ['service', 'offer', 'do you', 'what can', 'skill', 'expertise'],
    reply: 'CAXiE offers: Cybersecurity & Identity Protection, ICT Infrastructure, Data & Intelligence (BI/Analytics), Web Development & Branding, and Fractional CTO engagements. Which area interests you?',
  },
  {
    patterns: ['price', 'pricing', 'cost', 'how much', 'rate', 'fee', 'charge'],
    reply: 'Our pricing is tiered by project scope. See our Pricing page for details, or let us know what you need and we\'ll send a tailored proposal. Use the button below to chat directly!',
  },
  {
    patterns: ['case study', 'project', 'dala', 'orthopedic', 'example', 'portfolio', 'work'],
    reply: 'Our flagship case study is the Dala Orthopedic Hospital project. We\'re also engaged as fractional CTO for 3StarData. Visit our Case Studies page to read the full details.',
  },
  {
    patterns: ['contact', 'reach', 'talk', 'speak', 'call', 'whatsapp', 'email', 'message'],
    reply: 'You can reach us via WhatsApp (+234 816 544 3398) for fast responses, or use the Contact form for detailed project briefs. We respond within 24 hours.',
  },
  {
    patterns: ['founder', 'xavier', 'ceo', 'who', 'charles', 'ekechukwu', 'about'],
    reply: 'CAXiE was founded by Ekechukwuemeka Charles Xavier — a technology strategist and cybersecurity practitioner based in Kano, Nigeria. Visit the About page to learn more.',
  },
  {
    patterns: ['class', 'teach', 'train', 'learn', 'course', 'beginner', 'web dev', 'mentor'],
    reply: 'CAXiE runs beginner web development classes and tech mentorship programs. These are designed for individuals and teams entering the digital economy. Visit our Teaching page for details and how to sign up.',
  },
  {
    patterns: ['location', 'where', 'kano', 'nigeria', 'base', 'office'],
    reply: 'We\'re based in Kano, Nigeria — serving local SMEs, enterprises, and international clients remotely. Our team is available across time zones for global engagements.',
  },
  {
    patterns: ['security', 'cyber', 'hack', 'vulnerab', 'protect', 'data', 'privacy'],
    reply: 'Cybersecurity is our foundation. We offer threat assessment, identity protection, security audits, and hardening. We also publish our own security posture — see our Trust & Security page.',
  },
  {
    patterns: ['cto', 'fractional', 'chief technology', 'technical lead', 'retainer'],
    reply: 'Our Fractional CTO service provides enterprise-level technical leadership on a retainer model — ideal for startups and SMEs that need a senior tech strategist without a full-time hire. Ask us for details!',
  },
  {
    patterns: ['blog', 'article', 'insight', 'read', 'post', 'news'],
    reply: 'Our Blog covers tech strategy, cybersecurity, AI in Africa, and digital transformation. Fresh content drops regularly — check the Blog page!',
  },
];

function getBotReply(input) {
  const lower = input.toLowerCase();
  for (const { patterns, reply } of QA_MAP) {
    if (patterns.some((p) => lower.includes(p))) return reply;
  }
  return "I'm not sure about that one — but our team definitely can help! Send us a WhatsApp message or fill out the Contact form and we'll get back to you within 24 hours.";
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(defaultMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const botMsg = { sender: 'bot', text: getBotReply(input) };
      setMessages((msgs) => [...msgs, botMsg]);
      setTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Floating button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-brand-lg w-14 h-14 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-transparent"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close AI Assistant' : 'Open AI Assistant'}
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 w-80 max-w-[calc(100vw-2rem)] bg-[#0f0a1a] border border-white/10 rounded-2xl shadow-brand-lg flex flex-col z-50 animate-fade-in-up overflow-hidden"
          role="dialog"
          aria-label="CAXiE AI Assistant"
        >
          {/* Header */}
          <div className="bg-brand-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Caxie Assistant</p>
                <p className="text-white/70 text-xs">Usually replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-72 space-y-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-brand-700">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`px-3 py-2 rounded-xl text-sm max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-br-sm'
                      : 'bg-white/10 text-gray-200 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-xl rounded-bl-sm px-3 py-2">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="border-t border-white/10 p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services, pricing..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
            <button
              type="submit"
              className="bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-3 py-2 transition-colors"
              aria-label="Send message"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>

          {/* WhatsApp escalation */}
          <div className="border-t border-white/10 px-4 py-3">
            <a
              href="https://wa.me/2348165443398?text=Hi%20CAXiE%20Technologies%2C%20I%27d%20like%20to%20chat%20about%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full text-xs text-[#25D366] hover:text-[#1ebe57] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Talk to a human on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
