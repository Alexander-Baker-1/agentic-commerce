import { useState } from 'react';

function ChatInterface({ onIntentParsed }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm here to help you find the perfect skiing outfit. What are you looking for? Tell me about your budget, size, and when you need it delivered." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      // Parse intent from user message
      const response = await fetch('http://localhost:5000/api/chat/intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      if (data.success && data.intent) {
        // Send parsed intent to parent component
        onIntentParsed(data.intent);
        
        // Add assistant response
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Got it! I'm searching for skiing gear with:\n• Budget: $${data.intent.budget}\n• Size: ${data.intent.size}\n• Delivery: ${data.intent.delivery_days} days\n• Warmth level: ${data.intent.warmth}\n\nLet me find the best options for you...`
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I'm having trouble understanding. Could you tell me your budget, size, and delivery timeline?"
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting. Please try again."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-4 border-b bg-blue-600 text-white rounded-t-lg">
        <h2 className="text-xl font-bold">Shopping Assistant</h2>
        <p className="text-sm text-blue-100">Tell me what you need</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="E.g., I need a ski outfit, budget $400, size M, delivery in 5 days"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;