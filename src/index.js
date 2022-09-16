const app = require("./app");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
