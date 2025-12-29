import React from 'react';
import { Search, MapPin, Calendar, Star, Award, ChevronRight } from 'lucide-react';

interface HomeProps {
  onNavigateToProfile: () => void;
}

export default function Home({ onNavigateToProfile }: HomeProps) {
  return (
    <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1 bg-blue-500/50 px-3 py-1 rounded-full text-xs font-medium mb-3 border border-blue-400">
            <Award className="w-3 h-3" />
            <span>안전 결제 & 에스크로 보장</span>
          </div>
          <h2 className="text-2xl font-bold leading-tight mb-2">
            검증된 전문가와<br />
            <span className="text-blue-200">안전한 레슨</span>을 시작하세요
          </h2>
          <p className="text-blue-100 text-sm mb-6 opacity-90">
            투명하고 안전한 레슨 시장의 표준, ProFit
          </p>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full translate-x-10 -translate-y-10 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-700 rounded-full -translate-x-5 translate-y-5 opacity-50"></div>
      </div>

      {/* Quick Search Card */}
      <div className="px-4 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
              <MapPin className="w-5 h-5 text-blue-500" />
              <input type="text" placeholder="지역 또는 스키장 검색" className="flex-1 text-sm outline-none font-medium text-gray-700 placeholder:text-gray-400" />
            </div>
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <input type="text" placeholder="날짜 선택" className="flex-1 text-sm outline-none font-medium text-gray-700 placeholder:text-gray-400" />
            </div>
            <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              맞춤 강사 찾기
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-8 px-4">
        <h3 className="font-bold text-gray-900 mb-4 text-lg">인기 종목</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: '스키', icon: '⛷️' },
            { name: '보드', icon: '🏂' },
            { name: '웨이크', icon: '🏄' },
            { name: '테니스', icon: '🎾' }
          ].map((cat, i) => (
            <button key={i} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-2xl hover:border-blue-500 hover:shadow-md transition-all">
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-gray-600">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Instructors */}
      <div className="mt-8 px-4 pb-4">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">추천 전문가</h3>
            <p className="text-xs text-gray-500">인증된 평점 4.8 이상 전문가</p>
          </div>
          <button className="text-blue-600 text-sm font-medium flex items-center hover:underline">
            전체보기 <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Instructor Card 1 */}
          <button onClick={onNavigateToProfile} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 w-full text-left transition-transform active:scale-95">
            <div className="relative">
              <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border-2 border-white">
                <Award className="w-3 h-3" />
                <span>인증</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-900">김프로 강사</h4>
                  <p className="text-xs text-blue-600 font-medium">스키 레벨 3 · 5년 경력</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-gray-900">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  4.9
                  <span className="text-gray-400 font-normal">(128)</span>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded-md">유아 강습</span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded-md">영어 가능</span>
              </div>
            </div>
          </button>

          {/* Instructor Card 2 */}
          <button onClick={onNavigateToProfile} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 w-full text-left transition-transform active:scale-95">
            <div className="relative">
              <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Annie" alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border-2 border-white">
                <Award className="w-3 h-3" />
                <span>인증</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-900">이수정 코치</h4>
                  <p className="text-xs text-blue-600 font-medium">스노우보드 국가대표 출신</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-gray-900">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  5.0
                  <span className="text-gray-400 font-normal">(85)</span>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded-md">자세 교정</span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded-md">영상 분석</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
