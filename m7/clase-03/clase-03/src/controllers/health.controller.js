import {
  checkDB,
  getDatabaseDetails,
} from "../services/health.service.js";

export const healthCheck = async (req, res, next) => {
  try {
    await checkDB();

    res.status(200).json({
      status: "ok",
      db: "connected",
    });
  } catch (error) {
    next(error);
  }
};

export const healthDetails = async (req, res, next) => {
  try {
    const details = await getDatabaseDetails();

    res.status(200).json({
      status: "ok",
      database: {
        connected: true,
        name: details.name,
        serverTime: details.server_time,
        version: details.version,
      },
    });
  } catch (error) {
    next(error);
  }
};
