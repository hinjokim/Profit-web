import { useState } from 'react';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';

export default function SearchPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '스키', '보드', '웨이크', '테니스'];
  const locations = ['비발디파크', '용평리조트', '하이원', '곤지암'];

  return (
    <div className="flex-1 flex flex-col h-full bg-white">
      {/* Top Search Bar */}
      <div className="px-4 py-3 border-b border-gray-100 flex gap-3 items-center sticky top-0 bg-white z-10">
        <div className="flex-1 bg-gray-100 rounded-xl flex items-center px-3 py-2.5">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="강사명, 지역, 종목 검색" 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400"
            autoFocus
          />
        </div>
        <button className="p-2 bg-gray-50 rounded-xl border border-gray-100">
          <SlidersHorizontal className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar p-4">
        
        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-3 text-sm">종목 선택</h3>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Locations */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-3 text-sm">인기 지역</h3>
          <div className="flex flex-wrap gap-2">
            {locations.map((loc) => (
              <button key={loc} className="flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors">
                <MapPin className="w-3 h-3" />
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Search (Mockup) */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-900 text-sm">최근 검색어</h3>
            <button className="text-[10px] text-gray-400">지우기</button>
          </div>
          <div className="space-y-2">
            {['김프로', '유아 스키 강습', '곤지암 리조트'].map((term, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-600">{term}</span>
                <span className="text-xs text-gray-300">12.15</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
