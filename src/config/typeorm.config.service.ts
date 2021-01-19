import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/../**/*.entity{.ts, .js}'],
      synchronize: false,
      migrationsRun: true,
      migrationsTableName: 'custom_migration_table',
      migrations: [__dirname + 'migrations/*.js'],
      "cli": {
        "migrationsDir": 'migration',
      },
      autoLoadEntities: true,
      logging: ['query', 'error'],
    };
  }
}
