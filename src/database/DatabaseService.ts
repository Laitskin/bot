import { PoolConfig, createPool, Pool } from "mysql";
import * as dotenv from "dotenv";
import { DatabaseTable, QueryOptions } from "./types";

export class DatabaseService {
  private connection: Pool;

  constructor() {
    this.connection = createPool(this.getConfig());
  }

  public init() {
    return this;
  }

  public get<Entity>(
    table: DatabaseTable,
    queryOptions: QueryOptions
  ): Promise<Entity[]>;
  public get(table: DatabaseTable, queryOptions: QueryOptions = {}) {
    let query = `SELECT * from \`${table}\` \n`;

    if (queryOptions.sortBy) {
      const { order, column } = queryOptions.sortBy;
      query += `ORDER BY ${column} ${order || "ASC"}`;
    }

    return this.run(query);
  }

  private run(query: string): Promise<any[]> {
    return new Promise((data) => {
      this.connection.query(query, (error, result) => {
        if (error) {
          console.log(error);
          throw error;
        }

        try {
          data(result);
        } catch (error) {
          data([]);
          throw error;
        }
      });
    });
  }

  private getConfig(): PoolConfig {
    const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = dotenv.config().parsed || {};

    return {
      connectionLimit: 10,
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
    };
  }
}
