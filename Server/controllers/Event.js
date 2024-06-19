const Event = require("../models/Event");
const Slotmetrics = require("../models/SlotMetrics");
const { logger } = require("../utils/logger");

const currentDate = new Date();
const currentTimestamp = currentDate.getTime();

exports.getAllEvents = async (req, res) => {
  try {
    const allEvents = await Event.find({
      $or: [
        // Condition for future events
        {
          $or: [
            { enddate: { $gt: currentDate } },
            { enddate: currentDate, entime: { $gt: currentTimestamp } },
          ],
        },
        // Condition for running events
        {
          $and: [
            {
              $or: [
                { startdate: { $lt: currentDate } },
                {
                  startdate: currentDate,
                  starttime: { $lte: currentTimestamp },
                },
              ],
            },
            {
              $or: [
                { enddate: { $gt: currentDate } },
                { enddate: currentDate, entime: { $gte: currentTimestamp } },
              ],
            },
          ],
        },
      ],
    });
    console.log("Running events:", allEvents);

    return res.status(200).json({
      success: true,
      message: "All events found successfully",
      data: allEvents,
    });
  } catch (error) {
    logger.error("allEvents error: ", error);
    return res.status(500).json({
      success: false,
      message: "Error while getting all the events",
      error: error.message,
    });
  }
};
