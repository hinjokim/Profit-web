import React from 'react';
import { ChevronLeft, Search } from 'lucide-react';

interface ChatPreview {
  id: number;
  name: string;
  image: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
}

// Sample Data
const chats: ChatPreview[] = [
  {
    id: 1,
    name: '김프로 강사',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    lastMessage: '네, 금요일 10시 예약 확정해드렸습니다! 스키장에서 뵙겠습니다.',
    time: '방금 전',
    unreadCount: 2,
  },
  {
    id: 2,
    name: '이수정 코치',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Annie',
    lastMessage: '혹시 장비 렌탈도 필요하신가요?',
    time: '30분 전',
    unreadCount: 0,
  },
  {
    id: 3,
    name: '박성훈 매니저',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    lastMessage: '안녕하세요 ProFit 고객센터입니다. 문의주신 내용 확인했습니다.',
    time: '어제',
    unreadCount: 0,
  }
];

interface ChatListProps {
  onBack: () => void;
  onEnterChat: (userName: string) => void;
}

export default function ChatList({ onBack, onEnterChat }: ChatListProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <header className="px-4 py-3 flex items-center border-b border-gray-100 sticky top-0 bg-white z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="flex-1 text-lg font-bold text-gray-900 ml-2">메시지함</h1>
      </header>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="bg-gray-100 rounded-xl flex items-center px-3 py-2.5">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="이름 또는 대화 내용 검색" 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button 
            key={chat.id} 
            onClick={() => onEnterChat(chat.name)}
            className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                <img src={chat.image} alt={chat.name} className="w-full h-full object-cover" />
              </div>
              {chat.unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {chat.unreadCount}
                </div>
              )}
            </div>
            
            <div className="flex-1 text-left overflow-hidden">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-gray-900 text-sm">{chat.name}</span>
                <span className="text-[10px] text-gray-400">{chat.time}</span>
              </div>
              <p className={`text-xs truncate ${chat.unreadCount > 0 ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                {chat.lastMessage}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
