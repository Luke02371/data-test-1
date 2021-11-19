// a JSON object with endpoints to be called, helping to organize them.
import { ENDPOINTS } from "../endpoints";

// this function is a helper to abstract some of the api request logic to make them more concise and clean
import { createApi } from "../setup";

const useUsersApi = () => {
  const loginToBackend = async () => {
    const API = await createApi();
    await API.post(ENDPOINTS.USERS_LOGIN).then((resp) => {
      console.log("RESPONSE", resp.data);
    });
  };

  return {
    loginToBackend,
  };
};

export default useUsersApi;
