import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

const StarknetAgent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [currentResponse, setCurrentResponse] = useState<{ text: string; isTyping: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLoadingMessage, setShowLoadingMessage] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (isLoading) {
      timeoutId = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 5000);
    } else {
      setShowLoadingMessage(false);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isLoading]);

  const shortenTxHash = (hash: string): string => {
    return `0x${hash.slice(2, 4)}...${hash.slice(-3)}`;
  };

  const shortenUrl = (url: string): string => {
    try {
      const { hostname } = new URL(url);
      return `${hostname}/...`;
    } catch {
      return url;
    }
  };

  const parseAndDisplayWithShortLinks = (text: string): JSX.Element[] => {
    const regex = /((?:https?:\/\/starkscan\.co\/tx\/0x[a-fA-F0-9]{64})|0x[a-fA-F0-9]{64}|https?:\/\/[^\s]+)/g;
    const parts: JSX.Element[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const found = match[0];
      const start = match.index;
      const end = regex.lastIndex;

      parts.push(<span key={lastIndex}>{text.slice(lastIndex, start)}</span>);

      if (found.startsWith('0x') && found.length === 66) {
        const shortened = shortenTxHash(found);
        parts.push(
          <a
            key={start}
            href={`https://starkscan.co/tx/${found}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-300 underline transition-colors"
          >
            {shortened}
          </a>
        );
      } else if (found.includes('starkscan.co/tx/0x')) {
        const rawHash = found.split('/tx/')[1] ?? '';
        const shortened = rawHash.startsWith('0x') && rawHash.length === 66
          ? shortenTxHash(rawHash)
          : shortenUrl(found);
        parts.push(
          <a
            key={start}
            href={found}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-300 underline transition-colors"
          >
            {shortened}
          </a>
        );
      } else if (found.startsWith('http')) {
        parts.push(
          <a
            key={start}
            href={found}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-300 underline transition-colors"
          >
            {shortenUrl(found)}
          </a>
        );
      } else {
        parts.push(<span key={start}>{found}</span>);
      }

      lastIndex = end;
    }

    parts.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
    return parts;
  };

  const formatResponse = (jsonString: string): string => {
    try {
      const data = JSON.parse(jsonString);
      if (data.data?.output?.[0]?.text) {
        const cleanText = data.data.output[0].text
          .replace(/\{"input":.?"output":\[.?"text":"|"\]\}$/g, '')
          .replace(/\\n/g, '\n')
          .replace(/\\"/g, '"');
        return cleanText;
      }
      return jsonString;
    } catch {
      return jsonString;
    }
  };

  const typeResponse = (response: { text: string }) => {
    const text = response.text;
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      setCurrentResponse((prevResponse) => {
        if (!prevResponse) return prevResponse;
        return {
          ...prevResponse,
          text: text.slice(0, currentIndex + 1),
          isTyping: currentIndex < text.length - 1,
        };
      });

      currentIndex++;
      if (currentIndex >= text.length) {
        clearInterval(typingInterval);
      }
    }, 10);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setShowLoadingMessage(false);

    const newResponse = {
      text: '',
      timestamp: Date.now(),
      isTyping: true,
    };

    setCurrentResponse(newResponse);

    try {
      const response = await fetch('/api/agent/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'test',
        },
        body: JSON.stringify({ request: input }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const formattedText = formatResponse(JSON.stringify(data));
      typeResponse({ ...newResponse, text: formattedText });
    } catch (error) {
      console.error('Error details:', error);
      const errorMessage = import.meta.env.DEV
        ? `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Sorry, there was an error processing your request. Please try again.';

      typeResponse({
        ...newResponse,
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100 flex items-center justify-center p-4">
      
      <div className="w-full max-w-3xl bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-6 space-y-6">
        <div className="flex items-center gap-4 border-b border-gray-700 pb-4">
          <img
            src="https://pbs.twimg.com/profile_images/1834202903189618688/N4J8emeY_400x400.png"
            alt="Starknet Logo"
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              StarkNet Agent
            </h1>
            <p className="text-sm text-gray-400">AI-powered blockchain assistant</p>
          </div>
        </div>

        <div className="space-y-4">
          {currentResponse && (
            <div className="bg-gray-900/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700/50">
              <div className="font-mono text-sm text-gray-300 whitespace-pre-wrap break-words leading-relaxed">
                {showLoadingMessage
                  ? 'Processing...'
                  : parseAndDisplayWithShortLinks(currentResponse.text)}
                {(currentResponse.isTyping || isLoading) && (
                  <span className="animate-pulse ml-1 text-blue-400">▋</span>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl py-3 px-4 pr-12 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              placeholder="Ask about StarkNet..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-gray-200 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default StarknetAgent;
