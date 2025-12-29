export type UserRole = 'student' | 'instructor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image: string;
  points?: string;
  coupon?: number;
}

export const MOCK_USERS: Record<string, User> = {
  student: {
    id: 'user_1',
    name: '홍길동',
    email: 'hong@profit.com',
    role: 'student',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    points: '2,500 P',
    coupon: 2
  },
  instructor: {
    id: 'inst_1',
    name: '김프로',
    email: 'pro@profit.com',
    role: 'instructor',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KimPro',
    points: '500,000 P',
    coupon: 0
  }
};
