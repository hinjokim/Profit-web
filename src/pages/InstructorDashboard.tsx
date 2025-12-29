import React, { useState } from 'react';
import { ChevronLeft, Calendar as CalendarIcon, Clock, CheckCircle, XCircle, Plus, DollarSign, Users } from 'lucide-react';

interface LessonRequest {
  id: number;
  studentName: string;
  date: string;
  time: string;
  location: string;
  status: 'pending' | 'confirmed' | 'rejected';
}

interface InstructorDashboardProps {
  onBack: () => void;
}

export default function InstructorDashboard({ onBack }: InstructorDashboardProps) {
  const [requests, setRequests] = useState<LessonRequest[]>([
    { id: 1, studentName: '이영희', date: '12월 24일 (화)', time: '14:00 - 16:00', location: '비발디파크 초급 슬로프', status: 'pending' },
    { id: 2, studentName: '박철수', date: '12월 25일 (수)', time: '10:00 - 12:00', location: '용평리조트 핑크 슬로프', status: 'confirmed' },
  ]);

  const [activeTab, setActiveTab] = useState<'requests' | 'schedule'>('requests');

  const handleAction = (id: number, action: 'confirmed' | 'rejected') => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: action } : req
    ));
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center shadow-sm z-10 sticky top-0">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-gray-900 pr-4">강사 대시보드</h1>
      </header>

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-100">
        <button 
          onClick={() => setActiveTab('requests')}
          className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'requests' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-400'
          }`}
        >
          예약 관리
        </button>
        <button 
          onClick={() => setActiveTab('schedule')}
          className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'schedule' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-400'
          }`}
        >
          스케줄 관리
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        
        {activeTab === 'requests' && (
          <>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 min-w-[100px]">
                <span className="text-xs text-gray-500 block mb-1">이번 달 수익</span>
                <span className="text-lg font-bold text-gray-900">₩1.2M</span>
              </div>
              <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 min-w-[100px]">
                <span className="text-xs text-gray-500 block mb-1">예약 대기</span>
                <span className="text-lg font-bold text-purple-600">3건</span>
              </div>
               <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 min-w-[100px]">
                <span className="text-xs text-gray-500 block mb-1">진행 중 레슨</span>
                <span className="text-lg font-bold text-blue-600">1건</span>
              </div>
            </div>

            <h3 className="font-bold text-gray-900 mt-2">새로운 예약 요청</h3>
            {requests.filter(r => r.status === 'pending').length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm bg-white rounded-xl border border-gray-100">
                대기 중인 예약 요청이 없습니다.
              </div>
            ) : (
              requests.filter(r => r.status === 'pending').map(req => (
                <div key={req.id} className="bg-white p-4 rounded-2xl shadow-sm border border-purple-100 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{req.studentName} 학생</h4>
                      <p className="text-xs text-purple-600 font-medium">스키 초급 레슨</p>
                    </div>
                    <span className="bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-1 rounded-md">승인 대기</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                      {req.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {req.time}
                    </div>
                     <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-gray-400" />
                      {req.location}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAction(req.id, 'rejected')}
                      className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
                    >
                      <XCircle className="w-4 h-4" /> 거절
                    </button>
                    <button 
                      onClick={() => handleAction(req.id, 'confirmed')}
                      className="flex-1 py-2 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition-colors flex items-center justify-center gap-1 shadow-md shadow-purple-100"
                    >
                      <CheckCircle className="w-4 h-4" /> 승인
                    </button>
                  </div>
                </div>
              ))
            )}

            <h3 className="font-bold text-gray-900 mt-4">확정된 일정</h3>
            {requests.filter(r => r.status === 'confirmed').map(req => (
               <div key={req.id} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 opacity-80">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-gray-700">{req.studentName} 학생</h4>
                    <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> 예약 확정
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{req.date} • {req.time}</p>
                   <p className="text-xs text-gray-500 mt-1">{req.location}</p>
               </div>
            ))}
          </>
        )}

        {activeTab === 'schedule' && (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <CalendarIcon className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">등록된 스케줄이 없습니다</h3>
            <p className="text-gray-500 text-sm mb-6">새로운 레슨 가능 시간을 등록하여<br/>수강생을 모집해보세요!</p>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-purple-200 hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 mx-auto">
              <Plus className="w-4 h-4" />
              스케줄 등록하기
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
