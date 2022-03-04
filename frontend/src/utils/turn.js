import * as api from "./api";

let TURNIceServers = null;
export const fetchTURNCredentials = async () => {
  const responseData = await api.getTurnCredentials();

  /*check if token exist on response 
  => iceServers in token*/
  if (responseData.token?.iceServers) {
    TURNIceServers = responseData.token.iceServers;
    console.log("Type " + TURNIceServers.type);
  }
  return TURNIceServers;
};

//helper function
export const getTurnIceServers = () => {
  return TURNIceServers;
};
