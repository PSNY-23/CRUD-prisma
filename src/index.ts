import express from "express";
import postRoute from "./routes/postRoute";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", postRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
