import { Request, Response } from "express";

class IndexController {
  public index(req: Request, res: Response) {
    try {
      return res.json({ message: "API Works" });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error}` });
    }
  }

  public insert(req: Request, res: Response) {
    try {
      return res.json({ message: "Insert Works" });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error}` });
    }
  }

  public update(req: Request, res: Response) {
    try {
      return res.json({ message: "Update Works" });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error}` });
    }
  }

  public delete(req: Request, res: Response) {
    try {
      return res.json({ message: "Delete Works" });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error}` });
    }
  }
}

export const indexController = new IndexController();
