/* eslint-disable */
import http from "@/http-common";

class TutorialDataService {
  getAll(): Promise<any> {
    return http.get("/users");
  }

  get(id: number): Promise<any> {
    return http.get(`/users/${id}`);
  }

  getAvatar(id: number): Promise<any> {
    return http.get(`/users/${id}/avatar`);
  }

  create(data: any): Promise<any> {
    return http.post("/users", data);
  }

  login(data: any): Promise<any> {
    return http.get("/login", data);
  }

  updateUserName(id: number, data: any) : Promise<any>{
    return http.post(`/users/${id}`, data);
  }

  uploadAvatar(id: number, avatar: FormData): Promise<any> {
    return http.post(`/users/${id}/avatar`, avatar);
  }

  delete(id: number): Promise<any> {
    return http.delete(`/users/${id}`);
  }
  deleteAvatar(id: number): Promise<any> {
    return http.delete(`/users/${id}/avatar`);
  }

  get42Token(code: string) : Promise<any> {
    return http.get(`/auth/42?code=${code}`);
  }

  generateQRcode(data:any): Promise<any> {
    return http.post("/2fa/generate", data, { responseType: "arraybuffer" });
  }

  turn2FAon(data: any): Promise<any> {
    return http.post("/2fa/turn-on", data);
  }

  turn2FAoff(data: any): Promise<any> {
    return http.post("/2fa/turn-off", data);
  }

  authenticate2fa(data: any): Promise<any> {
    return http.post("/2fa/authenticate", data);
  }

  addToFriends(id: number, data: any): Promise<any> {
    return http.post(`/users/${id}/friends`, data);
  }

  addToBlocked(id: number, data: any): Promise<any> {
    return http.post(`/users/${id}/block`, data);
  }

  removeFromFriends(id: number, data: any): Promise<any> {
    return http.post(`/users/${id}/remove-friend`, data);
  }

  removeFromBlocked(id: number, data: any): Promise<any> {
    return http.post(`/users/${id}/unblock`, data);
  }

  getFriends(id: number): Promise<any> {
    return http.get(`/users/${id}/friends`);
  }

  getBlocked(id: number): Promise<any> {
    return http.get(`/users/${id}/blocked`);
  }

  getNonBlocked(id: number): Promise<any> {
    return http.get(`/users/${id}/non-block-users`);
  }

  getAchievements(id: number): Promise<any> {
    return http.get(`/users/${id}/achievements`);
  }
}

export default new TutorialDataService();