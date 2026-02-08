
import React, { useState, useMemo } from 'react';
import { TeacherProfile } from '../types';
import { GROUPS } from '../constants';

interface GalleryProps {
  profiles: TeacherProfile[];
  onBack: () => void;
  onAdd: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ profiles, onBack, onAdd }) => {
  const [selectedProfile, setSelectedProfile] = useState<TeacherProfile | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('전체');

  // 예시 및 테스트용 프로필(ID 1~6)을 제외한 실제 사용자 프로필만 필터링
  const actualProfiles = useMemo(() => 
    profiles.filter(p => !['1', '2', '3', '4', '5', '6'].includes(p.id)),
  [profiles]);

  // 선택된 필터에 따른 프로필 필터링
  const displayedProfiles = useMemo(() => {
    if (activeFilter === '전체') return actualProfiles;
    return actualProfiles.filter(p => p.group === activeFilter);
  }, [actualProfiles, activeFilter]);

  return (
    <div className="px-4 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-navy mb-1">동료 도감</h2>
          <p className="text-slate-500">서로의 취향과 가치관을 한눈에 살펴보세요.</p>
        </div>
        <div className="flex gap-2">
           <button onClick={onBack} className="bg-white border border-slate-200 text-slate-600 px-6 py-2 rounded-xl font-bold hover:bg-slate-50">홈으로</button>
           <button onClick={onAdd} className="bg-coral text-white px-6 py-2 rounded-xl font-bold hover:bg-rose-500 shadow-md">새 프로필 추가</button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="mb-8 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex flex-wrap gap-2 min-w-max md:min-w-0">
          <button
            onClick={() => setActiveFilter('전체')}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all border-2 ${
              activeFilter === '전체'
                ? 'bg-navy border-navy text-white shadow-md'
                : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
            }`}
          >
            전체보기 ({actualProfiles.length})
          </button>
          {GROUPS.map((group) => {
            const groupCount = actualProfiles.filter(p => p.group === group).length;
            if (groupCount === 0) return null;
            
            return (
              <button
                key={group}
                onClick={() => setActiveFilter(group)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all border-2 ${
                  activeFilter === group
                    ? 'bg-coral border-coral text-white shadow-md'
                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                }`}
              >
                {group} ({groupCount})
              </button>
            );
          })}
        </div>
      </div>

      {displayedProfiles.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
          <p className="text-slate-400 mb-6 text-lg">해당 팀에 등록된 프로필이 없습니다.</p>
          <button onClick={() => setActiveFilter('전체')} className="text-navy font-bold hover:underline">전체 보기로 돌아가기</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProfiles.map((profile) => (
            <div 
              key={profile.id}
              onClick={() => setSelectedProfile(profile)}
              className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden border border-slate-100 transform hover:-translate-y-1"
            >
              <div className="h-2 bg-navy group-hover:bg-coral transition-colors" />
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-warm-grey rounded-2xl flex items-center justify-center text-navy font-bold text-xl">
                    {profile.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-navy">{profile.name}</h3>
                    <p className="text-sm text-slate-400">{profile.grade}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex gap-2 text-sm">
                    <span className="text-coral font-bold shrink-0">#그룹</span>
                    <span className="text-slate-600 truncate">{profile.group}</span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="text-navy font-bold shrink-0">#모토</span>
                    <span className="text-slate-600 line-clamp-1">{profile.motto}</span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="text-slate-400 font-bold shrink-0">#목표</span>
                    <span className="text-slate-600 line-clamp-1">{profile.bucketList}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex justify-end">
                  <span className="text-xs text-slate-400 group-hover:text-coral font-medium transition-colors">자세히 보기 →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Profile Detail Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={() => setSelectedProfile(null)}
          />
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-scaleIn">
            <button 
              onClick={() => setSelectedProfile(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-warm-grey rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="bg-navy p-10 text-white">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 bg-coral rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-coral/20">
                  {selectedProfile.name[0]}
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-1">{selectedProfile.name}</h2>
                  <p className="text-slate-300 text-lg">{selectedProfile.grade} / {selectedProfile.group}</p>
                </div>
              </div>
              <div className="bg-white/10 p-5 rounded-2xl italic text-slate-200">
                "{selectedProfile.greeting}"
              </div>
            </div>

            <div className="p-10 space-y-8 max-h-[50vh] overflow-y-auto custom-scrollbar">
              <DetailRow label="소울 푸드" value={selectedProfile.food} emoji="🍲" />
              <DetailRow label="교사로서의 꿈" value={selectedProfile.dream} emoji="✨" />
              <DetailRow label="나의 취미" value={selectedProfile.hobby} emoji="🧘" />
              <DetailRow label="삶의 모토" value={selectedProfile.motto} emoji="📜" />
              <DetailRow label="올해의 목표" value={selectedProfile.bucketList} emoji="🎯" />
              <DetailRow label="셀프 칭찬" value={selectedProfile.selfPraise} emoji="👏" />
              <div className="p-6 bg-coral/5 rounded-2xl border border-coral/20">
                <h4 className="text-xs font-bold text-coral uppercase tracking-widest mb-2">동료에게 듣고 싶은 말</h4>
                <p className="text-lg font-bold text-navy leading-relaxed">"{selectedProfile.wishToHear}"</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailRow: React.FC<{ label: string; value: string; emoji: string }> = ({ label, value, emoji }) => (
  <div>
    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
      <span>{emoji}</span> {label}
    </h4>
    <p className="text-lg text-navy font-medium leading-relaxed">{value}</p>
  </div>
);

export default Gallery;
