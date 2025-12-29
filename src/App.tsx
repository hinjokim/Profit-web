import { useState } from 'react';
import { Search, Calendar, User as UserIcon, MessageSquare, Menu } from 'lucide-react';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import InstructorProfile from './pages/InstructorProfile';
import ReservationHistory from './pages/ReservationHistory';
import ChatList from './pages/ChatList';
import ChatRoom from './pages/ChatRoom';
import LoginScreen from './pages/LoginScreen';
import MyPage from './pages/MyPage';
import InstructorDashboard from './pages/InstructorDashboard';
import { type User } from './data/mock';

interface Booking {
  id: number;
  instructorName: string;
  instructorImage: string;
  date: string;
  time: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [activePage, setActivePage] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [chatTarget, setChatTarget] = useState<string>('');

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home'); // Reset tab
    setActivePage(null); // Reset page
  };

  const handleNavigateToProfile = () => {
    setActivePage('instructorProfile');
  };

  const handleNavigateToDashboard = () => {
    setActivePage('instructorDashboard');
  };

  const handleGoBack = () => {
    if (activePage === 'chatRoom') {
      setActivePage('chatList');
    } else {
      setActivePage(null);
    }
  };

  const handleBookLesson = (bookingData: Omit<Booking, 'id' | 'status'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now(),
      status: 'pending',
    };
    setBookings([newBooking, ...bookings]);
    setActivePage(null);
    setActiveTab('history');
  };

  const handleEnterChatList = () => {
    setActivePage('chatList');
  };

  const handleEnterChatRoom = (userName: string) => {
    setChatTarget(userName);
    setActivePage('chatRoom');
  };

  if (!user) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  const renderContent = () => {
    if (activePage === 'instructorDashboard') {
        return <InstructorDashboard onBack={handleGoBack} />;
    }
    if (activePage === 'instructorProfile') {
      return (
        <InstructorProfile 
          onBack={handleGoBack} 
          onBook={handleBookLesson}
          onChat={() => handleEnterChatRoom('김프로 강사')}
        />
      );
    }
    if (activePage === 'chatList') {
      return <ChatList onBack={handleGoBack} onEnterChat={handleEnterChatRoom} />;
    }
    if (activePage === 'chatRoom') {
      return <ChatRoom userName={chatTarget} onBack={handleGoBack} />;
    }

    switch (activeTab) {
      case 'home': return <Home onNavigateToProfile={handleNavigateToProfile} />;
      case 'search': return <SearchPage />;
      case 'history': return <ReservationHistory bookings={bookings} />;
      case 'profile': return <MyPage user={user} onLogout={handleLogout} onSwitchMode={handleNavigateToDashboard} />;
      default: return <Home onNavigateToProfile={handleNavigateToProfile} />;
    }
  };

  const showHeader = activePage === null && activeTab === 'home';
  const showBottomNav = activePage === null;

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto shadow-2xl overflow-hidden relative">
      {/* Header (Only show on Home tab for now) */}
      {showHeader && (
        <header className="bg-white px-4 py-3 flex justify-between items-center shadow-sm z-10 sticky top-0">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg italic">P</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Pro<span className="text-blue-600">Fit</span></h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleEnterChatList}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <MessageSquare className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      {renderContent()}

      {/* Bottom Navigation */}
      {showBottomNav && (
        <nav className="bg-white border-t border-gray-100 py-3 px-6 flex justify-between items-center fixed bottom-0 w-full max-w-md z-30">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <div className="w-6 h-6 flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <span className="text-[10px] font-medium">홈</span>
          </button>
          <button 
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'search' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Search className="w-6 h-6" />
            <span className="text-[10px] font-medium">검색</span>
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'history' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-[10px] font-medium">예약</span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <UserIcon className="w-6 h-6" />
            <span className="text-[10px] font-medium">내 정보</span>
          </button>
        </nav>
      )}
    </div>
  )
}

export default App