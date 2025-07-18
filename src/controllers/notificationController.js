import { getNotificationsByUser, createNotification } from "../models/notificationModel.js";

export const create = async (req, res) => {
  try {
    const { actorId, targetId, type, feedId } = req.body;
    const notif = await createNotification({
      actorId,
      targetId,
      type,
      feedId,
    });
    req.io.to(`user_${targetId}`).emit("new_notification", notif);
    res.status(201).json(notif);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create notification" });
  }
};

export const getByUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const notifs = await getNotificationsByUser(userId);
    res.json(notifs);
  } catch (err) {
    res.status(500).json({ error: "Failed to get notifications" });
  }
};
