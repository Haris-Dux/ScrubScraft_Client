import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import MongoDBStore from "connect-mongodb-session";
import session from "express-session";
import router from "./routes/routes.js";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin:['https://scrubscraft.shop','http://localhost:5173']
  })
);

app.use(express.json({ limit: "50mb" }));
const MongoDBStoreSession = MongoDBStore(session);

const store = new MongoDBStoreSession({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false,
    store:store,
    cookie:{
      secure: 'auto',
      httpOnly:true,
      maxAge:1000 * 60 * 60 * 24,
    }
  }));

app.use("", router);
// const root = path.resolve();
// app.use(express.static(path.join(root, "dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(root, "dist/index.html"));
// });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(
      process.env.PORT,
      console.log(`Server is running on http://localhost:${process.env.PORT}`)
    );
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(error);
  });

