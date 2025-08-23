import {
  getNotificationsByUser,
  createNotification,
  updateNotif,
} from "../models/notificationModel.js";

export const create = async (req, res) => {
  try {
    const actor_id = req.user?.id;

    const { target_id, type, feed_id } = req.body;

    if (actor_id === target_id) {
      return res
        .status(400)
        .json({ error: "Cannot send notification to yourself" });
    }

    const notif = await createNotification({
      actor_id,
      target_id,
      type,
      feed_id,
    });
    // req.io.to(`user_${target_id}`).emit("new_notification", notif);
    return res.status(201).json(notif);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create notification" });
  }
};

export const getByUser = async (req, res) => {
  try {
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(401).json({ msg: "user id unknown" });
    }

    const notifs = await getNotificationsByUser(user_id);
    return res.status(200).json(notifs);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to get notifications" });
  }
};

export const readNotification = async (req, res) => {
  try {
    const {notif_id} = req.params;

    if (!notif_id) {
      return res.status(400).json({
        msg: "notif id unknown",
      });
    }

    const readNotif = await updateNotif(notif_id);
    return res.status(200).json({
      msg: "read notif success",
      readNotif,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "internal server error",
      error
    });
  }
};
