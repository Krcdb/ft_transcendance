/* eslint-disable */
import http from "@/http-common";

class TutorialDataService {
  getAll(): Promise<any> {
    return http.get("/users");
  }

  get(id: number): Promise<any> {
    return http.get(`/users/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post("/users", data);
  }

  delete(id: number): Promise<any> {
    return http.delete(`/users/${id}`);
  }
}

export default new TutorialDataService();