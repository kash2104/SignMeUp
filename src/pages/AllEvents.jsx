import React, { useEffect, useState } from "react";
import { getAllEvents } from "../services/operations/eventAPI";
import EventCard from "../component/EventCard";
import { useSearchParams } from "react-router-dom";

const AllEvents = () => {
  const [searchParams] = useSearchParams();
  const sessionID = searchParams.get("user_key");

  const [allEvents, setAllEvents] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllEvents = async () => {
      setLoading(true);

      try {
        const result = await getAllEvents(sessionID);
        console.log("Result : ", result);

        setAllEvents(result);

        console.log("getAllEvents api result: ", result);
        console.log("allEvents", allEvents);
      } catch (error) {
        console.log("Error while fetching all the events");
      }
      setLoading(false);
      //   console.log("allEvents", allEvents);
    };

    if (sessionID) {
      console.log("SessionID: ", sessionID);
      localStorage.setItem("session_id", sessionID);

      fetchAllEvents();
    }
  }, [sessionID]);

  return (
    <div>
      <div className="flex flex-wrap w-11/12 justify-center">
        {allEvents.length !== 0 &&
          allEvents.map((event, index) => {
            return (
              <div key={index}>
                <EventCard
                  title={event?.title}
                  contactname={event?.contactname}
                  group={event?.group}
                  signup={event?.signupurl}
                  thumbnail={event?.thumbnail}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllEvents;
