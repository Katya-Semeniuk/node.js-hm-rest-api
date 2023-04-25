const app = require("./app");
// ukcz2D9OyMrbMfkK
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Katya:ukcz2D9OyMrbMfkK@cluster0.dqzme7v.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
