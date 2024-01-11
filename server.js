// import { createServer } from "node:http";

// const server = createServer((req, res) => {
//   res.write("oi");
//   console.log("Funcionando");
//   return res.end();
// });

// server.listen(8081);

import { fastify } from "fastify";
// import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

//GET, POST, PUT, DELETE, PATCH

// const database = new DatabaseMemory();

const databasePostgres = new DatabasePostgres()


server.post("/videos", async (req, res) => {
  const { title, description, duration } = req.body;

  await databasePostgres.create({
    //pode fazer só assim, já que o nome é o mesmo
    // ao invés de fazer assim: title: title
    // -> Short Sintaxe
    title,
    description,
    duration,
  });
  return res.status(201).send();
});
server.get("/videos", async (req, res) => {
  const search = req.query.search;
  const videos = await databasePostgres.list(search); // search é uma pesquisa opcional que podemos fazer
  
  return videos; // nesse caso não precisa usar o res, pois só vai ser retornado algo de dentro da rota, não vai ser alterado nada
});

//route parameter ex: /videos/:id
server.put("/videos/:id", async (req, res) => {
  const videoId = req.params.id;
  const { title, description, duration } = req.body;

  await databasePostgres.update(videoId, {
    title,
    description,
    duration,
  });

  return res.status(204).send();
});
server.delete("/videos/:id", (req, res) => {
  const videoId = req.params.id;
  databasePostgres.delete(videoId);

  return res.status(204).send();
});

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 8081, // ?? -> OU
});
