import express from "express"
import postRoutes from "../routes/postRoute";

const router = express.Router();

router.use('/api', postRoutes);


export default router;