  --SE GENERAN 3 SCRIPTS PARA CORRER EL TYPEORM
    "orm:init": "typeorm-ts-node-esm -d ./src/database/data.source.ts",
    "m:gen":"set NODE_ENV=prod&& npm run orm:init migration:generate",
    "m:run":"set NODE_ENV=prod&& npm run orm:init migration:run"

  --SE DEBE CORRER EL COMANDO npm run m:gen -- .\migrations\init para que se genere el modelo de base de datos definida

  --LAS UBICACIONES DE LAS ENTIDADES NO PUEDEN SER RELATICAS CON SRC SINO DEFINITICAS CON ../ 