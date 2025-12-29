import QRCode from 'react-qr-code';
import { X, ShieldCheck } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    id: number;
    instructorName: string;
    date: string;
    time: string;
  } | null;
}

export default function QRCodeModal({ isOpen, onClose, bookingData }: QRCodeModalProps) {
  if (!isOpen || !bookingData) return null;

  // Create a JSON string of data to encode in the QR code
  const qrValue = JSON.stringify({
    type: 'PROFIT_LESSON_AUTH',
    bookingId: bookingData.id,
    timestamp: Date.now(),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="bg-blue-600 p-6 text-center text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3 backdrop-blur-md border border-white/30">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold">레슨 체크인</h2>
          <p className="text-blue-100 text-sm mt-1">강사님께 이 QR 코드를 보여주세요</p>
        </div>

        {/* QR Code Area */}
        <div className="p-8 flex flex-col items-center justify-center">
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
            <QRCode 
              value={qrValue} 
              size={200}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox={`0 0 256 256`}
            />
          </div>
          
          <div className="mt-6 text-center space-y-1">
            <p className="font-bold text-gray-900 text-lg">{bookingData.instructorName}</p>
            <p className="text-gray-500 text-sm">{bookingData.date} • {bookingData.time}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-400">
            QR코드가 인증되면 레슨이 시작됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
