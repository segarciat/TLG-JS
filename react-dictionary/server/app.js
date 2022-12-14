const express = require("express");

const PORT = 5000;

const app = express();

app.get("/api/words", (req, res) => {
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
