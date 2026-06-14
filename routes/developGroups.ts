import { Request, Response } from "express";

const developGroupsRoutes = (app: any, pool: any) => {
  app.get("/groups", async (req: Request, res: Response) => {
    try {
      const result = await pool.query("SELECT * FROM develop_groups");
      res.json(result[0]);
    } catch (err) {
      console.log({ err });
      res.status(500).send(err);
    }
  });

  app.get("/groups/:groupId/meetings", async (req: Request, res: Response) => {
    try {
      const groupId = req.params.groupId;

      const result = await pool.query(
        "SELECT * FROM meetings WHERE group_id = ?",
        [groupId]
      );

      res.json(result[0]);
    } catch (err) {
      console.log({ err });
      res.status(500).send(err);
    }
  });
};

export default developGroupsRoutes;