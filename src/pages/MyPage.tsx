import { CreditCard, Bell, HelpCircle, Phone, ChevronRight, LogOut, Settings, Repeat } from 'lucide-react';
import { type User } from '../data/mock';

interface MyPageProps {
  user: User;
  onLogout: () => void;
  onSwitchMode: () => void;
}

export default function MyPage({ user, onLogout, onSwitchMode }: MyPageProps) {
  const menuItems = [
    { icon: CreditCard, label: '결제 수단 관리', desc: '카드 등록/수정' },
    { icon: Bell, label: '알림 설정', desc: '이벤트 및 예약 알림' },
    { icon: HelpCircle, label: '자주 묻는 질문', desc: '' },
    { icon: Phone, label: '고객센터', desc: '운영시간 09:00 - 18:00' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-3 shadow-sm z-10 sticky top-0">
        <h1 className="text-lg font-bold text-gray-900">내 정보</h1>
      </header>

      <div className="flex-1 overflow-y-auto pb-6 no-scrollbar">
        
        {/* Profile Section */}
        <div className="bg-white p-6 mb-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden border border-gray-100">
              <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {user.name} 
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    user.role === 'instructor' 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {user.role === 'instructor' ? 'INSTRUCTOR' : 'MEMBER'}
                </span>
              </h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <button className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-400">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Instructor Mode Switch */}
          {user.role === 'instructor' && (
            <button 
              onClick={onSwitchMode}
              className="w-full mb-4 bg-purple-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-purple-100"
            >
              <Repeat className="w-4 h-4" />
              강사 모드로 전환
            </button>
          )}

          {/* Stats/Quick Actions */}
          <div className="flex border rounded-xl overflow-hidden">
            <button className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center border-r">
              <span className="font-bold text-blue-600">{user.points}</span>
              <span className="text-xs text-gray-500">포인트</span>
            </button>
            <button className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center">
              <span className="font-bold text-gray-900">{user.coupon}장</span>
              <span className="text-xs text-gray-500">쿠폰함</span>
            </button>
          </div>
        </div>

        {/* Menu List */}
        <div className="bg-white mb-4">
          {menuItems.map((item, index) => (
            <button key={index} className="w-full flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-none">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                  {item.desc && <p className="text-xs text-gray-400">{item.desc}</p>}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="bg-white p-4">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
          <div className="text-center mt-6 mb-2">
            <p className="text-[10px] text-gray-300">ProFit App v1.0.0</p>
          </div>
        </div>

      </div>
    </div>
  );
}
