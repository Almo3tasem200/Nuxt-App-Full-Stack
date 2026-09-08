import { hash } from "bcrypt-ts";
import { Table } from "drizzle-orm";
import { usersTable } from "~~/server/db/schema";

export default defineEventHandler(async (event) => {
    const { username, password } = await readBody(event);

    if (!(username && password)) {
        throw createError({ statusCode: 400, message: "Username and password must be provided in data body." })
    }

    const hashPassword = await hash(password, 8);

    const db = useDrizzle();
    const insertResult = await db.insert(usersTable).values({
        username: username,
        password: hashPassword
    }).returning();
    return { insertResult }
})