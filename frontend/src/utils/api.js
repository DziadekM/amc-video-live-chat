import axios from "axios";

//prod
//const serverApi = "https://amc-gathertown.informatik.hs-fulda.de:5000/api";

//dev
const serverApi = "https://localhost:5000/api";

console.log("Server-API");

export const getRoomExists = async (roomId) => {
  const response = await axios.get(serverApi + "/room-exists/" + roomId);
  return response.data;
};
