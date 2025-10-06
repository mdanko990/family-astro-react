import { db } from '../db';

export const getAllPersons = async () => {
    return await db.query.persons.findMany()
}