import { Request, Response } from "express";

const meetingsRoutes = (app: any, pool: any) => {
  app.get("/meetings/:meetingId", async (req: Request, res: Response) => {
    try {
      const meetingId = req.params.meetingId;

      const result: any = await pool.query(
        "SELECT * FROM meetings WHERE meeting_id = ?",
        [meetingId]
      );

      const meetings = result[0];

      if (meetings.length === 0) {
        res.status(404).json({ message: "Meeting not found" });
        return;
      }

      res.json(meetings[0]);
    } catch (err) {
      console.log({ err });
      res.status(500).send(err);
    }
  });

  app.post("/meetings", async (req: Request, res: Response) => {
    try {
      const group_id = req.body.group_id;
      const start_datetime = req.body.start_datetime;
      const end_datetime = req.body.end_datetime;
      const meeting_description = req.body.meeting_description;
      const meeting_room = req.body.meeting_room;

      if (!group_id || !start_datetime || !end_datetime || !meeting_room) {
        res.status(400).json({ message: "Missing fields" });
        return;
      }

      if (new Date(end_datetime) <= new Date(start_datetime)) {
        res.status(400).json({ message: "End time must be after start time" });
        return;
      }

      const result: any = await pool.query(
        `INSERT INTO meetings 
        (group_id, start_datetime, end_datetime, meeting_description, meeting_room)
        VALUES (?, ?, ?, ?, ?)`,
        [group_id, start_datetime, end_datetime, meeting_description, meeting_room]
      );

      res.json({
        message: "Meeting added",
        meeting_id: result[0].insertId,
      });
    } catch (err) {
      console.log({ err });
      res.status(500).send(err);
    }
  });

  app.put("/meetings/:meetingId", async (req: Request, res: Response) => {
    try {
      const meetingId = req.params.meetingId;

      const group_id = req.body.group_id;
      const start_datetime = req.body.start_datetime;
      const end_datetime = req.body.end_datetime;
      const meeting_description = req.body.meeting_description;
      const meeting_room = req.body.meeting_room;

      if (!group_id || !start_datetime || !end_datetime || !meeting_room) {
        res.status(400).json({ message: "Missing fields" });
        return;
      }

      if (new Date(end_datetime) <= new Date(start_datetime)) {
        res.status(400).json({ message: "End time must be after start time" });
        return;
      }

      const result: any = await pool.query(
        `UPDATE meetings
         SET group_id = ?,
             start_datetime = ?,
             end_datetime = ?,
             meeting_description = ?,
             meeting_room = ?
         WHERE meeting_id = ?`,
        [group_id, start_datetime, end_datetime, meeting_description, meeting_room, meetingId]
      );

      if (result[0].affectedRows === 0) {
        res.status(404).json({ message: "Meeting not found" });
        return;
      }

      res.json({ message: "Meeting updated" });
    } catch (err) {
      console.log({ err });
      res.status(500).send(err);
    }
  });

  app.delete("/meetings/:meetingId", async (req: Request, res: Response) => {
    try {
      const meetingId = req.params.meetingId;

      const result: any = await pool.query(
        "DELETE FROM meetings WHERE meeting_id = ?",
        [meetingId]
      );

      if (result[0].affectedRows === 0) {
        res.status(404).json({ message: "Meeting not found" });
        return;
      }

      res.json({ message: "Meeting deleted" });
    } catch (err) {
      console.log({ err });
      res.status(500).send(err);
    }
  });
};

export default meetingsRoutes;