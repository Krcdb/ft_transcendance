export default interface User {
  id: number;
  userName: string;
  isActive: boolean;
  avatar: string;
  isTwoFAuthEnabled: boolean;
  achievements: number[];
  friends: number[];
  blockedUsers: number[];
  // : string[];
  ladderLevel: number;
}
