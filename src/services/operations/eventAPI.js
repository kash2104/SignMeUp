import { apiConnector } from "../apiConnector";

const { eventEndpoints } = require("../apis");

const { GET_EVENTS_API } = eventEndpoints;

export const getAllEvents = async (sessionID) => {
  let result = [];

  try {
    const response = await apiConnector("GET", GET_EVENTS_API, null, {
      Authorization: `Bearer ${sessionID}`,
    });

    console.log("GET_EVENTS_API RESPONSE....", response);

    if (!response.data.success) {
      throw new Error("Could not get all the events");
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("GET_EVENTS_API ERROR...", error);
  }

  return result;
};
