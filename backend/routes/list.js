import express from "express";
import { listRead } from "../models/modelListRead";

const router = express.Router();



router.get("/getAllList", async (request, response) => {
    try {
      const list = await listRead.find({}).populate("user", "id username");
      res.json(list);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.get("/getUserList", async (request, response) => {
    try {
      const UserList = await listRead.find({ user: req.user._id });
      res.json(UserList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});