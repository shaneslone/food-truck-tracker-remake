import axios from "axios";
import { Token } from "../store/actions/users";
import { Credentials } from "../types"
import axiosWithAuth, { baseURL } from "../utils/axoisWithAuth"

export const doLogin = async (credentials: Credentials) => {
    const auth = `${process.env.REACT_APP_OAUTHCLIENTID}:${process.env.REACT_APP_OAUTHCLIENTSECRET}`;
    const res = await axios.post<Token>(
        `${baseURL}/login`,
        `grant_type=password&username=${credentials.username}&password=${credentials.password}`,
        {
          headers: {
            // btoa is converting our client id/client secret into base64
            Authorization: `Basic ${btoa(auth)}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return res.data.access_token
}
