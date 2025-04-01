import { sql } from "@/lib/database";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const email = url.searchParams.get("email");

        const response = await sql`
            SELECT R.* 
            FROM recipe R
            INNER JOIN saved_recipes S ON R.recipe_id = S.recipe_id
            WHERE S.user_id = (SELECT id FROM users_list WHERE email = ${email})
            ORDER BY S.saved_at DESC;
        `;

        return new Response(JSON.stringify({ data: response }), {
            status: 200,
        });

    } catch (error) {
        console.error("Error fetching saved recipes:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
