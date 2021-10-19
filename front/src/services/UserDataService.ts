/* eslint-disable */
import http from "@/http-common";

class TutorialDataService {
  getAll(): Promise<any> {
    return http.get("/users");
  }

  get(userName: string): Promise<any> {
    return http.get(`/users/${userName}`);
  }

  getAvatar(userName: string): Promise<any> {
    return http.get(`/users/${userName}/avatar`);
  }

  create(data: any): Promise<any> {
    return http.post("/users", data);
  }

  login(data: any): Promise<any> {
    return http.get("/login", data);
  }

  uploadAvatar(userName: string, avatar: FormData): Promise<any> {
    return http.post(`/users/${userName}/avatar`, avatar);
  }

  delete(userName: string): Promise<any> {
    return http.delete(`/users/${userName}`);
  }
  deleteAvatar(userName: string): Promise<any> {
    return http.delete(`/users/${userName}/avatar`);
  }
}

export default new TutorialDataService();