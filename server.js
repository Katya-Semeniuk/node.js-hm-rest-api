const app = require("./app");
// ukcz2D9OyMrbMfkK
const mongoose = require("mongoose");
const { DB_HOST, PORT = 3000 } = process.env;
console.log(DB_HOST);

// mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
