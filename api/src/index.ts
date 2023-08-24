import express from "express";

const app = express();
const port = 8080;

app.get("/todos", (req, res) => {
    res.json([{ todo: "Get milk", completed: true }]);
});

export const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;
