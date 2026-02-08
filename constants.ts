
import { TeacherProfile } from './types';

export const STORAGE_KEY = 'gakri_insight_profiles';

export const GROUPS = [
  '교무실팀', '행정실팀', '1학년팀', '2학년팀', '3학년팀', '4학년팀', 
  '5학년팀', '6학년팀', '비교과-전담교사팀', '식생활관팀', 
  '방과후 돌봄팀', '기타 A팀', '기타 B팀'
];

export const INITIAL_PROFILES: TeacherProfile[] = [
  {
    id: '1',
    name: '최고각리',
    grade: '1학년팀',
    group: '1학년팀',
    food: '떡볶이',
    dream: '아이들이 스스로 행복을 찾는 교실 만들기',
    hobby: '주말 캠핑과 불멍',
    motto: '오늘보다 나은 내일',
    bucketList: '유럽 일주 한 달 살기',
    selfPraise: '언제나 웃음을 잃지 않는 나, 칭찬해!',
    wishToHear: '선생님 덕분에 학교가 즐거워요',
    greeting: '잘 부탁드립니다! 함께 즐거운 한 해 만들어요.',
    createdAt: Date.now()
  },
  {
    id: '2',
    name: '함께행복',
    grade: '비교과-전담교사팀',
    group: '비교과-전담교사팀',
    food: '삼겹살',
    dream: '건강한 신체에 깃든 건강한 정신 전파',
    hobby: '러닝과 크로스핏',
    motto: '포기하는 순간 시합은 끝나는 것이다',
    bucketList: '철인 3종 경기 완주',
    selfPraise: '지치지 않는 체력의 소유자!',
    wishToHear: '선생님 수업이 제일 기다려져요',
    greeting: '파이팅 넘치는 한 해 보냅시다!',
    createdAt: Date.now()
  },
  {
    id: '3',
    name: '테스트샘1',
    grade: '교무실팀',
    group: '교무실팀',
    food: '김치찌개',
    dream: '모두가 즐거운 학교',
    hobby: '독서',
    motto: '성실하게 살자',
    bucketList: '책 100권 읽기',
    selfPraise: '오늘도 수고했어',
    wishToHear: '항상 감사합니다',
    greeting: '안녕하세요!',
    createdAt: Date.now()
  },
  {
    id: '4',
    name: '테스트샘2',
    grade: '교무실팀',
    group: '교무실팀',
    food: '파스타',
    dream: '창의적인 교실',
    hobby: '음악 감상',
    motto: '즐겁게 일하기',
    bucketList: '악기 하나 배우기',
    selfPraise: '넌 할 수 있어',
    wishToHear: '멋지세요',
    greeting: '반갑습니다!',
    createdAt: Date.now()
  },
  {
    id: '5',
    name: '테스트샘3',
    grade: '교무실팀',
    group: '교무실팀',
    food: '초밥',
    dream: '소통하는 교사',
    hobby: '등산',
    motto: '천천히 가도 괜찮아',
    bucketList: '한라산 등반',
    selfPraise: '참 잘했어요',
    wishToHear: '믿음직스러워요',
    greeting: '함께 잘 지내봐요!',
    createdAt: Date.now()
  },
  {
    id: '6',
    name: '테스트샘4',
    grade: '교무실팀',
    group: '교무실팀',
    food: '치킨',
    dream: '성장하는 교사',
    hobby: '사진 찍기',
    motto: '매 순간에 최선을',
    bucketList: '개인 사진전 열기',
    selfPraise: '넌 정말 특별해',
    wishToHear: '아이디어가 좋네요',
    greeting: '잘 부탁드립니다!',
    createdAt: Date.now()
  }
];

export const FORM_FIELDS = [
  { key: 'name', label: '성함', placeholder: '이름을 입력하세요' },
  { key: 'grade', label: '담당 학년 / 업무 (소속 선택)', placeholder: '' },
  { key: 'food', label: '[취향] 소울 푸드', placeholder: '가장 좋아하는 음식은?' },
  { key: 'dream', label: '[꿈] 나의 꿈', placeholder: '교사로서의 꿈 또는 개인적인 꿈' },
  { key: 'hobby', label: '[취미] 퇴근 후 즐거움', placeholder: '나를 힐링 시켜주는 활동' },
  { key: 'motto', label: '[가치관] 삶의 모토', placeholder: '나의 좌우명' },
  { key: 'bucketList', label: '[목표] 올해의 버킷리스트', placeholder: '올해 꼭 하고 싶은 일 한 가지' },
  { key: 'selfPraise', label: '[소통] 셀프 칭찬', placeholder: '나를 힘나게 하는 긍정의 말' },
  { key: 'wishToHear', label: '[듣고 싶은 말] 동료에게', placeholder: '동료 교사에게 듣고 싶은 따뜻한 말' },
  { key: 'greeting', label: '[하고 싶은 말] 첫인사', placeholder: '동료들에게 건네는 첫인사' }
];
