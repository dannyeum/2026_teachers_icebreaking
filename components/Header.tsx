
import React from 'react';

interface HeaderProps {
  onHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHome }) => {
  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
        <button onClick={onHome} className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center group-hover:bg-coral transition-colors">
            <span className="text-white font-bold text-xs">GI</span>
          </div>
          <span className="text-navy font-bold text-xl tracking-tight">각리 인사이트</span>
        </button>
        <div className="hidden md:block text-slate-400 text-sm font-medium">
          각리 교육 가족의 소통 플랫폼
        </div>
      </div>
    </header>
  );
};

export default Header;
