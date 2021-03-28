const { createServer: createServerHTTP } = require("http");
const { createServer: createServerHTTPS } = require("https");
const fs = require("fs");
const url = require("url");
const next = require("next");
const mongoose = require("mongoose");

const ormConfig = JSON.parse(fs.readFileSync("./ormconfig.json"));
const mongodbPath = `${ormConfig.type}://${ormConfig.username}:${ormConfig.password}@${ormConfig.host}:${ormConfig.port}/${ormConfig.database}`;

global.__DEV__ = process.env.NODE_ENV !== "production";

const app = next({ dev: __DEV__ });
const handle = app.getRequestHandler();

async function main() {
  await app.prepare();

  await mongoose
    .connect(mongodbPath, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      err.message = "ERROR:mongoose\n" + err.message;
      throw err;
    });

  (__DEV__ ? createServerHTTP : createServerHTTPS)((req, res) => {
    const url = new URL(req.url, "http://localhost");
    // url.parse() returned!
    url.auth = `${url.username}:${url.password}`;
    url.slashes = req.url.includes("://") || null;
    url.query = url.searchParams.toString();

    req.context = { ...req.context };
    req.context.db = mongoose.connection;

    if (url.pathname === "/gql") {
      console.log(url.query);
      app.render(req, res, "/gql", url.query);
    }
    handle(req, res, url);
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:" + (process.env.PORT || 3000));
  });
}

main().catch(console.error);
