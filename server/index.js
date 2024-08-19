import express from "express";
import cors from "cors";

const app = express();

// app.use(cors);
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.listen(8080, () => {
  console.log("server listening on port 8080");
});

const tasks = [
  {
    id: 0,
    title: "task",
    content: "<h1>Hello World!</h1>",
  },
  {
    id: 1,
    title: "wanny buy",
    content: "<ul><li>milk</li><li>bread</li></ul>",
  },
  {
    id: 2,
    title: "task 3",
    content: "<h1>Hello World!</h1>",
  },
  {
    id: 3,
    title: "task 4",
    content: "<h1>Hello World!</h1>",
  },
  {
    id: 4,
    title: "task 5",
    content: "<h1>Hello World!</h1>",
  },
];

app.get("/tasks", cors(), function (req, res) {
  res.status(200).send(tasks);
});
