import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Send, MoreVertical, Phone } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isMe: boolean;
  time: string;
}

interface ChatRoomProps {
  userName: string;
  onBack: () => void;
}

export default function ChatRoom({ userName, onBack }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: '안녕하세요! 레슨 관련해서 문의드립니다.', isMe: true, time: '오후 2:30' },
    { id: 2, text: '네 안녕하세요! 어떤 부분이 궁금하신가요?', isMe: false, time: '오후 2:32' },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Mock auto-reply
    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        text: '문의주셔서 감사합니다. 잠시 후 자세히 답변 드리겠습니다!',
        isMe: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#f2f4f7]">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center shadow-sm z-10 sticky top-0">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1 ml-2">
          <h1 className="text-base font-bold text-gray-900">{userName}</h1>
          <p className="text-xs text-green-600 font-medium">현재 활동 중</p>
        </div>
        <div className="flex gap-1">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center text-xs text-gray-400 my-4">2023년 12월 15일</div>
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm text-sm relative ${
              msg.isMe 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white text-gray-800 rounded-bl-none'
            }`}>
              {msg.text}
              <span className={`text-[10px] absolute bottom-1 ${
                 msg.isMe ? 'left-[-45px] text-gray-400' : 'right-[-45px] text-gray-400'
              }`}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white px-4 py-3 border-t border-gray-100">
        <form onSubmit={handleSend} className="flex gap-2 items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-blue-500 transition-colors">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="메시지를 입력하세요..." 
            className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
          />
          <button 
            type="submit"
            disabled={!inputText.trim()}
            className={`p-2 rounded-full transition-all ${
              inputText.trim() ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
