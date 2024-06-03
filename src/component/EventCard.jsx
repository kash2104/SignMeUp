import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ title, contactname, group, signup, thumbnail }) => {
  return (
    <div className="border border-gray-300 m-4 p-4 rounded-lg shadow-md max-w-max">
      <div className="text-xl font-semibold mb-2">{title}</div>
      <div className="text-gray-700 mb-2">Contact: {contactname}</div>
      <div className="text-gray-700 mb-2">Group: {group}</div>
      <div className="mb-2">
        <Link to={`${signup}`} className="text-blue-500 hover:underline">
          Sign up here
        </Link>
      </div>
      <div>
        <img
          src={`${thumbnail}`}
          alt="event thumbnail"
          className="max-w-xs h-max rounded-md"
        />
      </div>
    </div>
  );
};

export default EventCard;
