import { FormEvent, useEffect, useRef, useState } from 'react';
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
  const messagesRef = useRef<HTMLDivElement>(null);

  const hasUserMessages = messages.some((message) => message.role === 'user');
  const showQuickPrompts = !hasUserMessages;

  const renderTypingDots = () => (
    <span className="chatbot__typing-dots" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );

  useEffect(() => {
    if (!messagesRef.current) {
      return;
    }

    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isOpen]);

  const parseInline = (text: string): Array<string | JSX.Element> => {
    const nodes: Array<string | JSX.Element> = [];
    const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|__([^_]+)__|_([^_]+)_)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        nodes.push(text.slice(lastIndex, match.index));
      }

      const [, , boldA, italicA, boldB, italicB] = match;
      if (boldA || boldB) {
        nodes.push(
          <strong key={match.index}>{boldA || boldB}</strong>,
        );
      } else if (italicA || italicB) {
        nodes.push(
          <em key={match.index}>{italicA || italicB}</em>,
        );
      } else {
        nodes.push(match[0]);
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      nodes.push(text.slice(lastIndex));
    }

    return nodes;
  };

  const renderMessageContent = (content: string) => {
    const lines = content.split(/\r?\n/);
    const nodes: JSX.Element[] = [];
    let listItems: JSX.Element[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        nodes.push(
          <ul key={`list-${nodes.length}`} className="chatbot__message-list">
            {listItems}
          </ul>,
        );
        listItems = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      const bulletMatch = trimmed.match(/^([*+-])\s+(.*)$/);
      const numberedMatch = trimmed.match(/^\d+\.\s+(.*)$/);

      if (bulletMatch) {
        listItems.push(
          <li key={`li-${index}`}>{parseInline(bulletMatch[2])}</li>,
        );
        return;
      }

      if (numberedMatch) {
        listItems.push(
          <li key={`li-${index}`}>{parseInline(numberedMatch[1])}</li>,
        );
        return;
      }

      flushList();

      if (!trimmed) {
        nodes.push(<p key={`empty-${index}`}>&nbsp;</p>);
        return;
      }

      nodes.push(<p key={`p-${index}`}>{parseInline(line)}</p>);
    });

    flushList();
    return nodes;
  };

  const typeAssistantReply = async (reply: string) => {
    const assistantMessage = createMessage('assistant', reply);
    setMessages((currentMessages) => [...currentMessages, assistantMessage]);
  };

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
      // Filter out the initial welcome message and only send conversation messages
      const conversationMessages = nextMessages.filter(msg => msg.id !== 'welcome');

      console.log('[ChatBot] Sending request with', conversationMessages.length, 'messages');

      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversationMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      console.log('[ChatBot] Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[ChatBot] API Error:', response.status, errorText);
        throw new Error(`Chat request failed with ${response.status}: ${errorText}`);
      }

      const data = (await response.json()) as { reply?: string };
      console.log('[ChatBot] Received reply:', data.reply ? 'yes' : 'no');

      if (!data.reply) {
        throw new Error('Missing reply in response');
      }

      await typeAssistantReply(data.reply);
    } catch (error) {
      console.error('[ChatBot] Error:', error);
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

          <div className="chatbot__messages" ref={messagesRef} role="log" aria-live="polite">
            {messages.map((message) => (
              <article
                className={`chatbot__message chatbot__message--${message.role}`}
                key={message.id}
              >
                <span className="chatbot__message-icon" aria-hidden="true">
                  {message.role === 'assistant' ? <Bot size={16} /> : <UserRound size={16} />}
                </span>
                <div className="chatbot__message-body">
                  {renderMessageContent(message.content)}
                </div>
              </article>
            ))}
            {isSending ? (
              <article className="chatbot__message chatbot__message--assistant chatbot__message--typing">
                <span className="chatbot__message-icon" aria-hidden="true">
                  <Bot size={16} />
                </span>
                <div className="chatbot__message-body">
                  {renderTypingDots()}
                </div>
              </article>
            ) : null}
          </div>

          {showQuickPrompts ? (
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
          ) : null}

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
