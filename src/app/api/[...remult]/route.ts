import { remultNextApp } from "remult/remult-next";
import { Account } from "../../../shared/Account"
import { AccountsController } from "../../../shared/AccountsController"
import { getUserOnServer } from "../auth/[...nextauth]/route"
import { createKnexDataProvider } from "remult/remult-knex"

const api = remultNextApp({
    entities: [Account],
    controllers: [AccountsController],
    getUser: getUserOnServer,
    dataProvider: createKnexDataProvider({
        client: "sqlite3",
        connection: {
            filename: "./mydb.sqlite"
        },
        useNullAsDefault: true
    })
})

export const { POST, PUT, DELETE, GET } = api;
