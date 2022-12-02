import { DataSource, DataSourceOptions } from 'typeorm';

export default new DataSource({
  type: "mysql",
  name: "dev_invest",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "test@123",
  database: "dev_invest",
  migrations: [__dirname + './development/migrations/*{.ts,.js}'],
} as DataSourceOptions);
  