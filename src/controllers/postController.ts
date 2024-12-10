import { Request, Response } from "express";
import prisma from "../prismaClient";

const createPost = async (req: Request, res: Response): Promise<void> => {
  const { title, content } = req.body;

  try {
    const post = await prisma.post.create({
      data: { title, content },
    });
    res.json(post);
  } catch (err) {
    res.json(err);
  }
};

export { createPost };
