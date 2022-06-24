import mysql from "mysql2";
import * as dotenv from "dotenv";
import Connection from "../ports/connection";
dotenv.config();

export class MysqlAdapter implements Connection {
    mysql: any;

    constructor() {
        this.mysql = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
    }

    async query(statement: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.mysql.query(statement,
                (err: any, result: any) => {
                    if (err) reject(err)
                    resolve(result)
                }
            );
        });
    }
}