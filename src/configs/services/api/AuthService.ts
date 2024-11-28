import axios, { AxiosResponse } from "axios";

const BASEURL = "https://booking-driver-api.up.railway.app/";

class AuthService {
  getCurrentUser1(): Promise<AxiosResponse> {
    return axios.get(BASEURL + "auth/info", {
      headers: {
        Authorization: `Bearer `,
      },
    });
  }
}

export default new AuthService();
