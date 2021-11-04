export default interface User {
    userName: string;
    id: number;
    isActive: boolean;
    avatar: string;
    isTwoFAuthEnabled: boolean;
    friends: number[];
    blockedUsers: number[];
  }