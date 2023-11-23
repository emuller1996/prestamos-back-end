import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import routes from "./routes/index.js"

const prisma = new PrismaClient();

const server = express();

server.use(cors());
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

server.use(morgan("dev"));
server.use('/', routes);

server.get("/algo", async (req, res) => {
  
  
  
});

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default server;
