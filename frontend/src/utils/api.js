import axios from "axios";

//prod
//const serverApi = "https://amc-gathertown.informatik.hs-fulda.de:5000/api";
//const serverApi = "https://192.168.72.159:5000/api";

//dev
const serverApi = "https://localhost:5000/api";

export const getRoomExists = async (roomId) => {
  const response = await axios.get(serverApi + "/room-exists/" + roomId);
  return response.data;
};

export const getTurnCredentials = async () => {
  const response = await axios.get(serverApi + "/get-turn-credentials");
  return response.data;
};
