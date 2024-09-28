import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(this.configService.get('DB_HOST', 'localhost'))
    return {
      autoLoadEntities: true,
      database: this.configService.get('DB_NAME', ''),
      host: this.configService.get('DB_HOST', 'localhost'),
      password: this.configService.get('DB_PASSWORD', 'password'),
      port: parseInt(this.configService.get('DB_PORT', '5432'), 10),
      synchronize: true,
      type: 'postgres',
      username: this.configService.get('DB_USERNAME', 'postgres'),
      ssl: {
        rejectUnauthorized: false,
      }
    };
  }
}
