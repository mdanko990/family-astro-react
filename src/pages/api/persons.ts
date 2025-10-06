import { db } from '../../lib/db';

export async function GET({ params }) {
    console.log("params", params)
  const persons = await db.query.persons.findMany()

  return new Response(JSON.stringify(persons), { status: 200 });
}
