import { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, QrCode, Clock as ClockIcon } from 'lucide-react';
import QRCodeModal from '../components/QRCodeModal';

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

interface ReservationHistoryProps {
  bookings: Booking[];
}

export default function ReservationHistory({ bookings }: ReservationHistoryProps) {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleOpenQR = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsQRModalOpen(true);
  };

  const handleCloseQR = () => {
    setIsQRModalOpen(false);
    setSelectedBooking(null);
  };

  if (bookings.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Calendar className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">예약된 레슨이 없습니다</h2>
        <p className="text-gray-500 text-center text-sm">
          원하는 강사님을 찾아<br />첫 번째 레슨을 예약해보세요!
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50 relative">
      <header className="bg-white px-4 py-3 shadow-sm z-10 sticky top-0">
        <h1 className="text-lg font-bold text-gray-900">예약 관리</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative overflow-hidden">
            {/* Status Badge */}
            {booking.status === 'confirmed' && (
              <div className="absolute top-0 right-0 bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-green-200 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                예약 확정
              </div>
            )}
            {booking.status === 'pending' && (
              <div className="absolute top-0 right-0 bg-orange-100 text-orange-700 text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-orange-200 flex items-center gap-1">
                <ClockIcon className="w-3 h-3" />
                승인 대기
              </div>
            )}

            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                <img src={booking.instructorImage} alt={booking.instructorName} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{booking.instructorName}</h3>
                <p className="text-xs text-gray-500">스키/보드 전문 강사</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded-lg">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="font-medium">{booking.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded-lg">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="font-medium">{booking.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 px-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{booking.location}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center gap-2">
              <span className="font-bold text-gray-900">{booking.price}</span>
              <div className="flex gap-2">
                <button className="text-xs text-gray-500 underline px-2">예약 취소</button>
                {booking.status === 'confirmed' && (
                  <button 
                    onClick={() => handleOpenQR(booking)}
                    className="text-xs bg-blue-600 text-white px-3 py-2 rounded-lg font-bold flex items-center gap-1 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                  >
                    <QrCode className="w-3 h-3" />
                    QR 체크인
                  </button>
                )}
                {booking.status === 'pending' && (
                  <button 
                    disabled
                    className="text-xs bg-gray-200 text-gray-400 px-3 py-2 rounded-lg font-bold flex items-center gap-1 cursor-not-allowed"
                  >
                    <ClockIcon className="w-3 h-3" />
                    승인 대기 중
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={isQRModalOpen} 
        onClose={handleCloseQR} 
        bookingData={selectedBooking} 
      />
    </div>
  );
}

