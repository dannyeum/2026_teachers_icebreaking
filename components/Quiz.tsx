
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TeacherProfile, QuizQuestion } from '../types';
import { GROUPS } from '../constants';

interface QuizProps {
  profiles: TeacherProfile[];
  onBack: () => void;
}

const QUESTION_FIELDS: (keyof TeacherProfile)[] = [
  'food', 'dream', 'hobby', 'motto', 'bucketList', 'selfPraise'
];

const Quiz: React.FC<QuizProps> = ({ profiles, onBack }) => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // 1. 실제 사용자 프로필만 필터링 (ID 1~6은 예시/테스트용이므로 제외)
  const actualProfiles = useMemo(() => 
    profiles.filter(p => !['1', '2', '3', '4', '5', '6'].includes(p.id)), 
  [profiles]);

  // 2. 선택된 그룹의 프로필 필터링 (메모제이션)
  const filteredProfiles = useMemo(() => 
    selectedGroup ? actualProfiles.filter(p => p.group === selectedGroup) : [], 
  [actualProfiles, selectedGroup]);

  // 3. 문제 생성 함수
  const generateQuestion = useCallback(() => {
    if (filteredProfiles.length === 0) return;

    // 타겟 선정
    const target = filteredProfiles[Math.floor(Math.random() * filteredProfiles.length)];
    
    // 유효한 값이 있는 필드만 추출 (빈 문자열 제외)
    const validFields = QUESTION_FIELDS.filter(field => {
      const value = target[field];
      return typeof value === 'string' && value.trim() !== '';
    });

    if (validFields.length === 0) {
      return;
    }

    const field = validFields[Math.floor(Math.random() * validFields.length)];

    // 보기 생성 (4지 선다 보장)
    const options = [target.name];
    
    // 오답 후보들 (현재 타겟 제외 모든 실제 교사)
    const otherCandidates = actualProfiles.filter(p => p.id !== target.id);
    const shuffledCandidates = [...otherCandidates].sort(() => 0.5 - Math.random());
    
    // 부족하면 채우기
    options.push(...shuffledCandidates.slice(0, 3).map(p => p.name));
    
    // 최종 보기 섞기
    const shuffledOptions = options.sort(() => 0.5 - Math.random());

    setQuestion({
      targetProfile: target,
      questionField: field,
      options: shuffledOptions
    });
    setAnswered(false);
    setShowHint(false);
    setIsCorrect(false);
  }, [filteredProfiles, actualProfiles]);

  // 그룹 선택 시 최초 1회 문제 생성
  useEffect(() => {
    if (selectedGroup && filteredProfiles.length > 0) {
      generateQuestion();
    }
  }, [selectedGroup, filteredProfiles.length, generateQuestion]);

  const handleAnswer = (option: string) => {
    if (answered || !question) return;
    const correct = option === question.targetProfile.name;
    setIsCorrect(correct);
    setAnswered(true);
    if (correct) setScore(s => s + 1);
  };

  if (!selectedGroup) {
    return (
      <div className="max-w-3xl mx-auto px-4 animate-fadeIn">
        <button onClick={onBack} className="mb-6 flex items-center text-slate-500 hover:text-navy transition-colors font-medium">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          돌아가기
        </button>
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center border border-slate-100">
          <h2 className="text-3xl font-bold text-navy mb-4">그룹을 선택하세요</h2>
          <p className="text-slate-500 mb-10">문제를 풀고 싶은 동료 그룹을 선택하면 퀴즈가 시작됩니다.</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {GROUPS.map(group => {
              const count = actualProfiles.filter(p => p.group === group).length;
              return (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                    count > 0 
                      ? 'border-slate-100 bg-slate-50 hover:border-coral hover:bg-rose-50 shadow-sm' 
                      : 'border-slate-50 bg-slate-50/50 opacity-60 cursor-not-allowed'
                  }`}
                  disabled={count === 0}
                >
                  <span className={`text-sm font-bold ${count > 0 ? 'text-navy' : 'text-slate-400'}`}>{group}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${count > 0 ? 'bg-navy text-white' : 'bg-slate-200 text-slate-400'}`}>
                    {count}명
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (filteredProfiles.length < 1) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 bg-white rounded-3xl shadow-lg px-8">
        <h2 className="text-2xl font-bold text-navy mb-4">동료 데이터가 없어요!</h2>
        <p className="text-slate-500 mb-8">{selectedGroup}에 등록된 실제 프로필이 없습니다.</p>
        <button onClick={() => setSelectedGroup(null)} className="bg-navy text-white px-8 py-3 rounded-xl font-bold">다른 그룹 선택하기</button>
      </div>
    );
  }

  if (!question) return (
    <div className="text-center py-20">
      <div className="animate-spin w-10 h-10 border-4 border-coral border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-slate-500">문제를 생성 중입니다...</p>
    </div>
  );

  const fieldLabels: Record<string, string> = {
    food: '소울 푸드가 이것인 주인공은?',
    dream: '교사로서 이런 꿈을 가진 주인공은?',
    hobby: '퇴근 후 이 취미를 즐기는 주인공은?',
    motto: '이런 삶의 모토를 가진 주인공은?',
    bucketList: '이 버킷리스트의 주인공은?',
    selfPraise: '자신에게 이런 칭찬을 건네는 주인공은?'
  };

  return (
    <div className="max-w-2xl mx-auto px-4 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => setSelectedGroup(null)} className="flex items-center text-slate-500 hover:text-navy font-medium">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          그룹 변경
        </button>
        <div className="flex gap-2">
          <div className="bg-navy text-white px-4 py-1 rounded-full text-xs font-bold flex items-center">
            {selectedGroup}
          </div>
          <div className="bg-coral/10 text-coral px-4 py-1 rounded-full text-xs font-bold flex items-center">
            점수: {score}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden relative border border-slate-100">
        <div className="bg-navy p-8 text-white text-center">
          <span className="inline-block bg-coral text-white text-xs px-3 py-1 rounded-full font-bold mb-4 uppercase tracking-wider">Mystery Quiz</span>
          <h2 className="text-2xl font-bold mb-4">{fieldLabels[question.questionField as string]}</h2>
          <div className="bg-white/10 p-6 rounded-2xl italic text-lg leading-relaxed border border-white/10 backdrop-blur-sm">
            "{question.targetProfile[question.questionField as keyof TeacherProfile]}"
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {question.options.map((option, idx) => (
              <button
                key={`${question.targetProfile.id}-${idx}`}
                disabled={answered}
                onClick={() => handleAnswer(option)}
                className={`p-4 rounded-xl border-2 font-bold text-lg transition-all text-left shadow-sm ${
                  answered
                    ? option === question.targetProfile.name
                      ? 'bg-green-50 border-green-500 text-green-700 ring-2 ring-green-200'
                      : 'bg-white border-slate-100 text-slate-300'
                    : 'bg-white border-slate-200 text-navy hover:border-coral hover:bg-rose-50 transform hover:-translate-y-0.5'
                }`}
              >
                {idx + 1}. {option}
              </button>
            ))}
          </div>

          {!answered && (
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setShowHint(true)}
                disabled={showHint}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border flex items-center justify-center gap-2 ${
                  showHint 
                  ? 'bg-slate-50 text-slate-300 border-slate-100' 
                  : 'bg-warm-grey text-slate-600 border-slate-200 hover:text-navy hover:border-slate-300'
                }`}
              >
                💡 {showHint ? '힌트 확인 완료' : '힌트가 필요하신가요?'}
              </button>
              
              <button 
                onClick={generateQuestion}
                className="flex-1 py-3 bg-white text-rose-400 border border-rose-100 rounded-xl text-sm font-bold hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                이 퀴즈 PASS
              </button>
            </div>
          )}

          {showHint && !answered && (
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200 animate-slideUp">
              <p className="text-amber-800 text-sm leading-relaxed">
                <span className="font-bold">힌트:</span> 이 분의 삶의 모토는 <span className="underline font-semibold text-amber-900">"{question.targetProfile.motto}"</span> 입니다.
              </p>
            </div>
          )}

          {answered && (
            <div className={`mt-8 p-6 rounded-2xl animate-scaleIn border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-rose-50 border-rose-200'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm ${isCorrect ? 'bg-green-500' : 'bg-rose-500'}`}>
                   {isCorrect ? (
                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                   ) : (
                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                   )}
                </div>
                <div>
                  <h3 className={`font-bold text-xl ${isCorrect ? 'text-green-800' : 'text-rose-800'}`}>
                    {isCorrect ? '정답입니다!' : '아쉬워요!'} 주인공은 <span className="underline decoration-2">{question.targetProfile.name}</span> 선생님입니다.
                  </h3>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/60 rounded-xl border border-white shadow-sm">
                  <p className="text-xs text-slate-400 font-bold mb-2 uppercase tracking-widest">Wish to hear</p>
                  <p className="text-navy font-semibold italic">"{question.targetProfile.wishToHear}"</p>
                </div>
                <div className="p-4 bg-white/60 rounded-xl border border-white shadow-sm">
                  <p className="text-xs text-slate-400 font-bold mb-2 uppercase tracking-widest">Message</p>
                  <p className="text-navy font-semibold italic">"{question.targetProfile.greeting}"</p>
                </div>
              </div>

              <button 
                onClick={generateQuestion}
                className="mt-8 w-full py-4 bg-navy text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all transform hover:-translate-y-1"
              >
                다음 퀴즈 도전하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
