import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.status(405).send("Hello!");
});

app.post("/api/files", async (req, res) => {
  // Handle file upload
  res.send("File uploaded successfully!");
});

app.get("/api/users", async (req, res) => {
  // Fetch users from the database
  res.send("List of users");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
