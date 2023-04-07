import { ConfigService,ConfigModule } from '@nestjs/config';


ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
  });

const configService = new ConfigService()

export class ConfigDb{
    static PORT_DATABASE = configService.get('POSTGRES_PORT')
    static HOST_DATABASE = configService.get('POSTGRES_HOST')
    static USER_DATABASE = configService.get('POSTGRES_USER')
    static PASSWORD_DATABASE = configService.get('POSTGRES_PASSWORD')
    static DB_DATABASE = configService.get('POSTGRES_DB')
}