import { Request, Response } from "express";
import prisma from "../prismaClient";

const createPost = async (req: Request, res: Response): Promise<void> => {
  const { title, content, authorId } = req.body;

  try {
    const post = await prisma.post.create({
      data: { title, content, authorId },
    });
    res.json(post);
  } catch (err) {
    res.json(err);
  }
};

const getAllPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const allPost = await prisma.post.findMany();
    res.json(allPost);
  } catch (err) {
    res.json(err);
  }
};

const getPost = async (req: Request, res: Response): Promise<void> => {
  let id = req.params.id;
  let postId = parseInt(id);

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });
    res.json(post);
  } catch (err) {
    res.json({ result: "error fetching this post" });
  }
};


const updatePost = async (req: Request, res: Response): Promise<void> => {
  const { title, content } = req.body;
  const id = parseInt(req.params.id); 

  try {
    // Check if the post exists and belongs to the author
    const postExists = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });

    if (!postExists) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    res.status(200).json({ message: 'Post updated successfully', updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deletePost = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const postId = parseInt(id);
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    res.json({
      result: "Post deleted successfully"
    })
  } catch (err) {
    res.json({
      result: `error deleting this post ${err}`,
    });
  }
};

export { createPost, getAllPost, getPost, updatePost, deletePost };
