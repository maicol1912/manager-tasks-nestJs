import { ConfigService,ConfigModule } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';


ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
  });

const configService = new ConfigService()
export const DataSourceConfig:DataSourceOptions = {
    type:'postgres',
    host:configService.get('POSTGRES_HOST'),
    port:configService.get('POSTGRES_PORT'),
    username:configService.get('POSTGRES_USER'),
    password:configService.get('POSTGRES_PASSWORD'),
    database:configService.get('POSTGRES_DB'),
    entities:[__dirname + '/../**/**/*.entity{.ts,.js}'],
    migrations:[__dirname+'/../migrations/*{.ts,.js}'],
    synchronize:false,
    migrationsRun:true,
    logging:true,
    namingStrategy: new SnakeNamingStrategy()
}

export const AppDatasource = new DataSource(DataSourceConfig)
