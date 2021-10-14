/* eslint-disable */
import http from "@/http-common";

class ChatDataService {
    // maybe replace userName by ID (sauf si userName doit etre unique)
    getMessagesFromUser(userName : string): Promise <any> {
        return (http.get(`/users/`))
    }
}

export default new ChatDataService();
