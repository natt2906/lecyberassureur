import { FormEvent, useRef, useState } from 'react';
import { Bot, MessageCircle, Send, ShieldCheck, UserRound, X } from 'lucide-react';

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
};

const CHAT_API_URL = '/api/nvidia-chat';

const initialMessage: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Bonjour, je peux vous aider a comparer les offres cyber, comprendre les garanties ou demander un devis. Que souhaitez-vous savoir ?',
};

const quickPrompts = [
  'Comparer les offres Basic, Silver et Gold',
  'Quel prix pour une PME ?',
  'Je veux etre rappele pour un devis',
];

const createMessage = (role: ChatMessage['role'], content: string): ChatMessage => ({
  id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  role,
  content,
});

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const openChat = () => {
    setIsOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isSending) {
      return;
    }

    const userMessage = createMessage('user', trimmed);
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setError('');
    setIsSending(true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat request failed with ${response.status}`);
      }

      const data = (await response.json()) as { reply?: string };
      if (!data.reply) {
        throw new Error('Missing reply');
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage('assistant', data.reply || ''),
      ]);
    } catch {
      setError(
        "Le chatbot n'est pas disponible pour le moment. Vous pouvez demander un devis directement via le formulaire.",
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <div className={`chatbot${isOpen ? ' chatbot--open' : ''}`}>
      {isOpen ? (
        <section className="chatbot__panel" aria-label="Assistant Le Cyberassureur">
          <header className="chatbot__header">
            <div className="chatbot__identity">
              <span className="chatbot__avatar" aria-hidden="true">
                <ShieldCheck size={20} />
              </span>
              <div>
                <p>Assistant cyber</p>
                <span>Devis, garanties, offres</span>
              </div>
            </div>
            <button
              className="chatbot__close"
              type="button"
              aria-label="Fermer le chatbot"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </header>

          <div className="chatbot__messages" role="log" aria-live="polite">
            {messages.map((message) => (
              <article
                className={`chatbot__message chatbot__message--${message.role}`}
                key={message.id}
              >
                <span className="chatbot__message-icon" aria-hidden="true">
                  {message.role === 'assistant' ? <Bot size={16} /> : <UserRound size={16} />}
                </span>
                <p>{message.content}</p>
              </article>
            ))}
            {isSending ? (
              <article className="chatbot__message chatbot__message--assistant">
                <span className="chatbot__message-icon" aria-hidden="true">
                  <Bot size={16} />
                </span>
                <p>Je regarde la meilleure reponse...</p>
              </article>
            ) : null}
          </div>

          <div className="chatbot__quick-actions" aria-label="Questions rapides">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => void sendMessage(prompt)}
                disabled={isSending}
              >
                {prompt}
              </button>
            ))}
          </div>

          {error ? <p className="chatbot__error">{error}</p> : null}

          <form className="chatbot__form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="chatbot-message">
              Votre message
            </label>
            <input
              ref={inputRef}
              id="chatbot-message"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Posez votre question..."
              maxLength={1200}
              disabled={isSending}
            />
            <button type="submit" aria-label="Envoyer le message" disabled={isSending || !input.trim()}>
              <Send size={18} />
            </button>
          </form>

          <a className="chatbot__cta" href="/#devis-cyber">
            Recevoir mon devis cyber
          </a>
        </section>
      ) : (
        <button
          className="chatbot__launcher"
          type="button"
          aria-label="Ouvrir le chatbot"
          onClick={openChat}
        >
          <MessageCircle size={24} />
          <span>Chat</span>
        </button>
      )}
    </div>
  );
}
