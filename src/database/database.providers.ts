import { Sequelize } from "sequelize-typescript";
import { Task } from "src/task/entities/task.entity";

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'maicol123',
        database: 'ecommerce_nest',
      });
      sequelize.addModels([Task]);
      await sequelize.sync({alter:true});
      return sequelize;
    },
  },
];
export class AppModule {}