export default interface User {
  id: number;
  userName: string;
  isActive: boolean;
  avatar: string;
  isTwoFAuthEnabled: boolean;
  friends: number[];
  blockedUsers: number[];
}
