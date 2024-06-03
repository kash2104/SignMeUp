import React, { useEffect, useState } from "react";
import { getAllEvents } from "../services/operations/eventAPI";
import EventCard from "../component/EventCard";

const AllEvents = () => {
  const [allEvents, setAllEvents] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchAllEvents = async () => {
    setLoading(true);

    try {
      const result = await getAllEvents();
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

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap w-11/12 justify-center">
        {allEvents.map((event, index) => {
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
