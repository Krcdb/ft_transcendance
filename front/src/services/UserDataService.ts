/* eslint-disable */
import http from "@/http-common";

class TutorialDataService {
  getAll(): Promise<any> {
    return http.get("/users");
  }

  get(userName: string): Promise<any> {
    return http.get(`/users/${userName}`);
  }

  create(data: any): Promise<any> {
    return http.post("/users", data);
  }

  delete(userName: string): Promise<any> {
    return http.delete(`/users/${userName}`);
  }
}

export default new TutorialDataService();