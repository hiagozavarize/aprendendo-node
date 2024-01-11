import sql from "./db.js";

// tamplate literals
// sql `DROP TABLE IF EXISTS videos;`.then(()=>console.log('tabela excluida!'))

sql`
  CREATE TABLE videos (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT,
      duration INTEGER
    )
`.then(() => {
  console.log("Tabela criada com sucesso!");
});
