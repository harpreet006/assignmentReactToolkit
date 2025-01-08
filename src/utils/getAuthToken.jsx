import axios from "axios";
import Cookies from "js-cookie";

// fetch the Authorization token from server
// This token is used as validator in all other apis
const getAuthToken = async () => {
  const accessToken = Cookies.get("clickup");

  if (accessToken) {
    // If the cookie exists, return it
    return accessToken;
  } else {
    // If no accessToken cookie is found, call login API
    try {
      const formData = new FormData();

      // encrypting password
      const password = "Umesh@2024";
      const email = "umesh.kumar@warehousity.com";

      let response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          password: password,
          email: email,
        }
      );

      response = response.data;

      // store the access token in the cookies with expirition time
      const minutes = 25;
      const expiresDate = new Date();
      expiresDate.setTime(expiresDate.getTime() + (minutes - 1) * 60 * 1000);

      Cookies.set("clickup", `Bearer ${response?.data?.access_token}`, {
        expires: expiresDate,
      });

      console.log(response);

      return `Bearer ${response?.data?.access_token}`;
    } catch (error) {
      console.error("Login API Error:", error);
    }
  }
};

export default getAuthToken;
