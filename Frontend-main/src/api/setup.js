import axios from "axios";

export const API_URL = `${process.env.REACT_APP_SERVER_BASE_URL}`;

export const getAccessToken = () => {
  const { id_token: accessToken } =
    JSON.parse(localStorage.getItem("auth")) || {};
  return accessToken;
};

export const getApiClient = () => {
  const token = getAccessToken();
  const axiosInstance = axios.create({
    baseURL: API_URL,
    method: "get",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // add interceptor to handle token refreshing
  axiosInstance.interceptors.response.use(
    // return a response for codes 2xx
    (response) => response,
    // catch codes other than 2xx
    async (error) => {
      // if (error.response?.status === 401) {
      //   Auth0Api.logoutRedirect()
      // }
      // return errors with a status code other than 401
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export const swrFetcher = (url) => getApiClient()(url).then((res) => res.data);

export const createApi = async () => {
  // const accessToken = await getIdTokenClaims();
  const accessToken = JSON.parse(localStorage.getItem("auth"));
  console.log("ACCESS TOKEN", accessToken?.id_token);
  const API = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${accessToken?.id_token}`,
    },
  });
  return API;
};
