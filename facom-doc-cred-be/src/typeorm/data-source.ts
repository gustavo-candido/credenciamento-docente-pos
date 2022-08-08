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
  logging: false,
  entities: ["src/typeorm/entity/*.ts"],
  migrations: ["src/typeorm/migration/*.ts"],
  subscribers: [],
});
