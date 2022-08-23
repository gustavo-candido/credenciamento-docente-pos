import { join } from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "12345",
  database: "test",
  synchronize: false,
  logging: true,
  entities: [join(__dirname, "typeorm", "entity", "*.{ts,js}")],
  migrations: [join(__dirname, "typeorm", "migration", "*.{ts,js}")],
  subscribers: [],
});
