
import React, { useState, useEffect } from 'react';
import { AppStep, TeacherProfile } from './types';
import { STORAGE_KEY, INITIAL_PROFILES } from './constants';
import ProfileForm from './components/ProfileForm';
import Quiz from './components/Quiz';
import Gallery from './components/Gallery';
import Header from './components/Header';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('HOME');
  const [profiles, setProfiles] = useState<TeacherProfile[]>([]);
  const [showPasswordModal, setShowPasswordModal] = useState<{ target: AppStep; password: string } | null>(null);
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setProfiles(JSON.parse(saved));
    } else {
      setProfiles(INITIAL_PROFILES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROFILES));
    }
  }, []);

  const saveProfile = (profile: TeacherProfile) => {
    const updated = [...profiles, profile];
    setProfiles(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setStep('GALLERY');
  };

  const handleStepRequest = (target: AppStep) => {
    if (target === 'QUIZ') {
      setShowPasswordModal({ target: 'QUIZ', password: '0000' });
    } else if (target === 'GALLERY') {
      const now = new Date();
      // 2026년 1월 23일 00:00:00 ~ 2026년 1월 24일 23:59:59
      const startTime = new Date('2026-01-23T00:00:00');
      const endTime = new Date('2026-01-24T23:59:59');
      
      const isPasswordPeriod = now >= startTime && now <= endTime;
      
      if (isPasswordPeriod) {
        setShowPasswordModal({ target: 'GALLERY', password: '4591' });
      } else {
        setStep('GALLERY');
      }
    } else {
      setStep(target);
    }
    setPasswordInput('');
  };

  const verifyPassword = () => {
    if (showPasswordModal && passwordInput === showPasswordModal.password) {
      setStep(showPasswordModal.target);
      setShowPasswordModal(null);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
      setPasswordInput('');
    }
  };

  const renderContent = () => {
    switch (step) {
      case 'HOME':
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fadeIn">
            <div className="mb-8 p-5 bg-navy rounded-[2rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
               <svg className="w-16 h-16 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
               </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-medium text-slate-500 mb-2">각리 인사이트</h2>
            <h1 className="text-4xl md:text-6xl font-black text-navy mb-6 leading-tight tracking-tight">
              우리들의 각리: <span className="text-coral">함께하는 2026</span>
            </h1>
            <p className="text-lg text-slate-500 mb-12 max-w-xl leading-relaxed">
              새 학기, 처음 만난 동료들과 서로의 가치관과 취향을 나누며<br className="hidden md:block" /> 
              더욱 끈끈한 각리 교육 공동체를 만들어갑니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 w-full max-w-md">
              <button 
                onClick={() => setStep('PROFILE')}
                className="flex-1 bg-navy text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-slate-800 transition-all transform hover:-translate-y-1"
              >
                나의 프로필 작성
              </button>
              <button 
                onClick={() => handleStepRequest('QUIZ')}
                className="flex-1 bg-coral text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-rose-500 transition-all transform hover:-translate-y-1"
              >
                동료 퀴즈 풀기
              </button>
            </div>
            <button 
              onClick={() => handleStepRequest('GALLERY')}
              className="mt-8 text-slate-400 hover:text-navy font-semibold flex items-center gap-2 transition-colors"
            >
              <span>전체 도감 구경하기</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        );
      case 'PROFILE':
        return <ProfileForm onSave={saveProfile} onBack={() => setStep('HOME')} />;
      case 'QUIZ':
        return <Quiz profiles={profiles} onBack={() => setStep('HOME')} />;
      case 'GALLERY':
        return <Gallery profiles={profiles} onBack={() => setStep('HOME')} onAdd={() => setStep('PROFILE')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header onHome={() => setStep('HOME')} />
      <main className="flex-1 container mx-auto py-10 max-w-5xl">
        {renderContent()}
      </main>
      <footer className="py-8 text-center text-slate-400 text-sm border-t bg-white">
        <p className="font-medium">&copy; 2026 각리 인사이트. All Rights Reserved.</p>
      </footer>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy/80 backdrop-blur-md" onClick={() => setShowPasswordModal(null)} />
          <div className="relative bg-white w-full max-w-sm rounded-[2rem] p-10 shadow-2xl animate-scaleIn">
            <h3 className="text-2xl font-bold text-navy mb-2 text-center">보안 확인</h3>
            <p className="text-slate-500 text-center mb-8 text-sm">진입을 위해 비밀번호를 입력해주세요.</p>
            <input 
              type="password"
              autoFocus
              className="w-full text-center text-3xl tracking-[1em] py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-coral focus:ring-0 outline-none transition-all text-navy mb-6"
              maxLength={4}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && verifyPassword()}
            />
            <div className="flex gap-3">
              <button 
                onClick={() => setShowPasswordModal(null)}
                className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-xl font-bold hover:bg-slate-200 transition-colors"
              >
                취소
              </button>
              <button 
                onClick={verifyPassword}
                className="flex-2 px-8 py-4 bg-coral text-white rounded-xl font-bold shadow-lg hover:bg-rose-500 transition-all"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
