import React, { useState } from 'react';
import { ChevronLeft, Star, Award, MapPin, Clock, MessageSquare, CheckCircle } from 'lucide-react';

// Sample Data for a single instructor
const instructor = {
  name: '김프로 강사',
  specialty: '스키 (레벨 3), 스노우보드 (초급)',
  experience: '5년',
  rating: 4.9,
  reviews: 128,
  image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  certifications: ['KSIA 스키 레벨3', '생활체육지도자 (스키)', '유아체육지도자'],
  bio: '안녕하세요! 5년 경력의 스키/스노우보드 강사 김프로입니다. 쉽고 재미있게 배우고 싶은 분, 실력을 한 단계 업그레이드하고 싶은 분 모두 환영합니다! 유아 강습 경험이 많아 아이들도 즐겁게 배울 수 있도록 지도합니다.',
  location: '비발디파크 스키장',
  hourlyRate: '70,000원/시간',
  availableSlots: [
    { date: '12월 20일 (금)', time: '10:00 - 12:00', booked: false },
    { date: '12월 20일 (금)', time: '14:00 - 16:00', booked: true },
    { date: '12월 21일 (토)', time: '09:00 - 11:00', booked: false },
  ],
};

interface InstructorProfileProps {
  onBack: () => void;
  onBook: (booking: any) => void;
  onChat: () => void;
}

export default function InstructorProfile({ onBack, onBook, onChat }: InstructorProfileProps) {
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

  const handleBook = () => {
    if (selectedSlotIndex !== null) {
      const slot = instructor.availableSlots[selectedSlotIndex];
      onBook({
        instructorName: instructor.name,
        instructorImage: instructor.image,
        date: slot.date,
        time: slot.time,
        location: instructor.location,
        price: instructor.hourlyRate,
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center shadow-sm z-10 sticky top-0">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-gray-900 pr-8">강사 프로필</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-4 no-scrollbar">
        {/* Profile Header */}
        <div className="bg-white p-4 pb-6 border-b border-gray-100 mb-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden border-2 border-blue-500">
              <img src={instructor.image} alt={instructor.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-xl text-gray-900">{instructor.name}</h2>
              <p className="text-sm text-blue-600 font-medium">{instructor.specialty}</p>
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{instructor.rating} ({instructor.reviews})</span>
              </div>
            </div>
          </div>
          <div className="flex justify-around items-center mt-5 text-gray-600 text-sm font-medium">
            <div className="flex flex-col items-center gap-1">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>{instructor.location}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>{instructor.experience} 경력</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Award className="w-5 h-5 text-blue-600" />
              <span>인증 강사</span>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white p-4 mb-4 shadow-sm">
          <h3 className="font-bold text-gray-900 text-lg mb-2">강사 소개</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{instructor.bio}</p>
        </div>

        {/* Certifications */}
        <div className="bg-white p-4 mb-4 shadow-sm">
          <h3 className="font-bold text-gray-900 text-lg mb-2">자격증 및 경력</h3>
          <ul className="space-y-2">
            {instructor.certifications.map((cert, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700 text-sm">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                {cert}
              </li>
            ))}
          </ul>
        </div>

        {/* Available Schedule */}
        <div className="bg-white p-4 shadow-sm">
          <h3 className="font-bold text-gray-900 text-lg mb-3">예약 가능 시간</h3>
          <p className="text-sm text-gray-500 mb-3">원하시는 시간대를 선택해주세요.</p>
          <div className="space-y-3">
            {instructor.availableSlots.map((slot, index) => (
              <button
                key={index}
                disabled={slot.booked}
                onClick={() => setSelectedSlotIndex(index)}
                className={`w-full flex justify-between items-center p-3 rounded-xl border-2 transition-all ${
                  slot.booked 
                    ? 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed' 
                    : selectedSlotIndex === index
                      ? 'bg-blue-50 border-blue-600 shadow-md'
                      : 'bg-white border-gray-100 hover:border-blue-200'
                }`}
              >
                <div className="text-left">
                  <p className={`font-medium ${selectedSlotIndex === index ? 'text-blue-900' : 'text-gray-800'}`}>
                    {slot.date}
                  </p>
                  <p className={`text-sm ${selectedSlotIndex === index ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
                    {slot.time}
                  </p>
                </div>
                {slot.booked ? (
                  <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded">예약 마감</span>
                ) : selectedSlotIndex === index ? (
                  <CheckCircle className="w-5 h-5 text-blue-600 fill-blue-100" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
                )}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Fixed Action Bar */}
      <div className="bg-white border-t border-gray-100 p-4 flex justify-between items-center shadow-lg sticky bottom-0 z-20">
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs">레슨 비용</span>
          <span className="font-bold text-lg text-gray-900">{instructor.hourlyRate}</span>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onChat}
            className="p-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
          <button 
            onClick={handleBook}
            disabled={selectedSlotIndex === null}
            className={`px-8 py-3 rounded-full font-bold text-md transition-colors ${
              selectedSlotIndex !== null
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedSlotIndex !== null ? '예약 요청하기' : '시간을 선택하세요'}
          </button>
        </div>
      </div>
    </div>
  );
}