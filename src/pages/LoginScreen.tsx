import React, { useState } from 'react';
import { Mail, Lock, LogIn, Github, MessageCircle, Phone, User, Users } from 'lucide-react';
import { MOCK_USERS, type User as UserType } from '../data/mock';

interface LoginScreenProps {
  onLoginSuccess: (user: UserType) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default to student login for form submission
    console.log('Attempting login with:', { email, password });
    onLoginSuccess(MOCK_USERS.student);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} 로그인 시도`);
    // Simulate social login success as student
    onLoginSuccess(MOCK_USERS.student);
  };

  const handleDemoLogin = (role: 'student' | 'instructor') => {
    const user = role === 'student' ? MOCK_USERS.student : MOCK_USERS.instructor;
    onLoginSuccess(user);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 p-6">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-blue-600 font-bold text-2xl italic">P</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white">Pro<span className="text-blue-200">Fit</span></h1>
      </div>

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center">로그인</h2>
        
        {/* Demo Login Buttons (Dev Only) */}
        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => handleDemoLogin('student')}
            className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg text-xs font-bold border border-blue-200 hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
          >
            <User className="w-3 h-3" />
            학생 데모
          </button>
          <button 
            onClick={() => handleDemoLogin('instructor')}
            className="flex-1 bg-purple-50 text-purple-600 py-2 rounded-lg text-xs font-bold border border-purple-200 hover:bg-purple-100 transition-colors flex items-center justify-center gap-1"
          >
            <Users className="w-3 h-3" />
            강사 데모
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">이메일</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                id="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">비밀번호</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                id="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            로그인
          </button>
        </form>

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">또는</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => handleSocialLogin('Kakao')}
            className="w-full bg-yellow-400 text-gray-900 py-3 rounded-xl font-bold text-md hover:bg-yellow-500 transition-colors flex items-center justify-center gap-3"
          >
            <MessageCircle className="w-5 h-5" />
            카카오 로그인
          </button>
          <button 
            onClick={() => handleSocialLogin('Naver')}
            className="w-full bg-green-500 text-white py-3 rounded-xl font-bold text-md hover:bg-green-600 transition-colors flex items-center justify-center gap-3"
          >
            <Phone className="w-5 h-5" />
            네이버 로그인
          </button>
          <button 
            onClick={() => handleSocialLogin('GitHub')}
            className="w-full bg-gray-800 text-white py-3 rounded-xl font-bold text-md hover:bg-gray-900 transition-colors flex items-center justify-center gap-3"
          >
            <Github className="w-5 h-5" />
            GitHub 로그인
          </button>
        </div>

        <div className="text-center text-sm">
          <button className="text-blue-600 hover:underline">회원가입</button>
          <span className="mx-2 text-gray-400">|</span>
          <button className="text-blue-600 hover:underline">비밀번호 찾기</button>
        </div>
      </div>
    </div>
  );
}
