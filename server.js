import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get("/questions", (req, res) => {
  try {
    const questionsPath = path.join(__dirname, "src", "questions.json");
    const data = fs.readFileSync(questionsPath, "utf-8");
    const questions = JSON.parse(data);
    res.json(questions);
  } catch (error) {
    console.error("Error reading questions:", error);
    res.status(500).json({ error: "Failed to load questions" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
