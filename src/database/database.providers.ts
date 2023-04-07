import { Sequelize } from "sequelize-typescript";
import { Task } from "src/task/entities/task.entity";
import { ConfigDb } from "./database.config";
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        logging: false,
        host: ConfigDb.HOST_DATABASE,
        port: Number(ConfigDb.PORT_DATABASE),
        username: ConfigDb.USER_DATABASE,
        password: ConfigDb.PASSWORD_DATABASE,
        database: ConfigDb.DB_DATABASE,
      });
      sequelize.addModels([Task]);
      await sequelize.sync({alter:true});
      return sequelize;
    },
  },
];
export class AppModule {}