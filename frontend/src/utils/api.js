import axios from "axios";

const serverApi = "https://192.168.2.103:5002/api";

export const getRoomExists = async (roomId) => {
  const response = await axios.get(serverApi + "/room-exists/" + roomId);
  return response.data;
};
