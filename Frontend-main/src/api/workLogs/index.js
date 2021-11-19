// a JSON object with endpoints to be called, helping to organize them.
import { ENDPOINTS } from "../endpoints";

// this function is a helper to abstract some of the api request logic to make them more concise and clean
import { createApi } from "../setup";

const useWorkLogsApi = () => {
  const addWorkLog = async (data, callback) => {
    const API = await createApi();
    await API.post(ENDPOINTS.ADD_WORK_LOG, data)
      .then((resp) => {
        console.log("RESPONSE", resp.data);
        callback(resp.data);
      })
      .catch((resp) => {
        callback(resp);
      });
  };

  return {
    addWorkLog,
  };
};

export default useWorkLogsApi;
