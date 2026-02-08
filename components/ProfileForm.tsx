
import React, { useState } from 'react';
import { TeacherProfile } from '../types';
import { FORM_FIELDS, GROUPS } from '../constants';

interface ProfileFormProps {
  onSave: (profile: TeacherProfile) => void;
  onBack: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSave, onBack }) => {
  const [formData, setFormData] = useState<Partial<TeacherProfile>>({
    name: '',
    grade: '',
    group: '', // 내부적으로 grade와 동일하게 유지
    food: '',
    dream: '',
    hobby: '',
    motto: '',
    bucketList: '',
    selfPraise: '',
    wishToHear: '',
    greeting: ''
  });

  const filledCount = Object.values(formData).filter(val => typeof val === 'string' && val.trim() !== '').length;
  // group 필드는 내부 처리용이므로 표시 필드 수에서 조정
  const displayFieldsCount = FORM_FIELDS.length;
  const progress = (filledCount / (displayFieldsCount + 1)) * 100; // grade 선택 시 grade, group 둘 다 채워지므로 +1

  const handleChange = (key: string, value: string) => {
    if (key === 'grade') {
      setFormData(prev => ({ ...prev, grade: value, group: value }));
    } else {
      setFormData(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filledCount < displayFieldsCount + 1) {
      alert('모든 항목을 입력해 주세요!');
      return;
    }
    onSave({
      ...formData as TeacherProfile,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 animate-fadeIn">
      <button onClick={onBack} className="mb-6 flex items-center text-slate-500 hover:text-navy transition-colors font-medium">
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        돌아가기
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12 border border-slate-100">
        <div className="bg-navy p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">나의 프로필 카드 작성</h2>
          <p className="text-slate-300">각리 인사이트에서 동료들과 나를 공유하세요.</p>
        </div>

        <div className="h-2 bg-slate-100 w-full sticky top-0 z-10">
          <div 
            className="h-full bg-coral transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {FORM_FIELDS.map((field) => (
            <div key={field.key} className="space-y-3">
              <label className="block text-sm font-bold text-navy">
                {field.label}
                {formData[field.key as keyof TeacherProfile] ? (
                  <span className="ml-2 text-green-500">✓</span>
                ) : (
                  <span className="ml-2 text-rose-400">*</span>
                )}
              </label>

              {field.key === 'grade' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {GROUPS.map((groupName) => (
                    <button
                      key={groupName}
                      type="button"
                      onClick={() => handleChange('grade', groupName)}
                      className={`py-3 px-2 rounded-xl text-sm font-bold transition-all border-2 ${
                        formData.grade === groupName
                          ? 'bg-coral border-coral text-white shadow-md transform scale-[1.02]'
                          : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {groupName}
                    </button>
                  ))}
                </div>
              ) : field.key === 'greeting' ? (
                <textarea
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent outline-none transition-all resize-none text-slate-900"
                  rows={3}
                  placeholder={field.placeholder}
                  value={formData[field.key as keyof TeacherProfile] as string}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent outline-none transition-all text-slate-900"
                  placeholder={field.placeholder}
                  value={formData[field.key as keyof TeacherProfile] as string}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              )}
            </div>
          ))}

          <div className="pt-8 border-t border-slate-100">
            <button
              type="submit"
              disabled={filledCount < displayFieldsCount + 1}
              className={`w-full py-5 rounded-2xl font-bold text-white shadow-lg transition-all text-lg ${
                filledCount >= displayFieldsCount + 1
                  ? 'bg-navy hover:bg-slate-800 transform hover:-translate-y-1' 
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              프로필 저장하고 도감 확인하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
