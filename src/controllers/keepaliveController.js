import { createKeepAlive, getKeepalive } from "../models/keepaliveModel.js";

export const selectKeepAlive = async (req, res) => {
  try {
    const { id } = req.params;
    const apikey = req.headers["x-apikey-keepalive"];

    if (apikey !== process.env.X_APIKEY_KEEPALIVE) {
      return res.status(403).json({ error: "Forbidden" });
    }

    if (!id) {
      return res.status(400).json({ error: "id unfound" });
    }

    const keepalive = await getKeepalive(id);
    return res.status(200).json({
      msg: "success",
      data: keepalive,
    });
  } catch (error) {
    return res.status(500).json({
      status: error,
      msg: "Internal Server Error",
    });
  }
};

export const createKeepAliveController = async (req, res) => {
  try {
    const { status } = req.body;
    const apikey = req.headers["x-apikey-keepalive"];

    if (apikey !== process.env.X_APIKEY_KEEPALIVE) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const keepalive = await createKeepAlive(status);
    return res.status(200).json({
      msg: "success",
      data: keepalive,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};
