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
}

export default new TutorialDataService();