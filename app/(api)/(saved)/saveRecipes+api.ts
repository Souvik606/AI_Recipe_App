import { sql } from "@/lib/database";

export async function POST(request: Request) {
    try {
        const { email, recipeId } = await request.json();

        const response = await sql`
            INSERT INTO saved_recipes(user_id, recipe_id)
            VALUES ((SELECT id FROM users_list WHERE email = ${email}),${recipeId})
            RETURNING *;
        `;

        return new Response(JSON.stringify({ data: response }), {
            status: 200,
        });
    } catch (error) {
        console.error("Error while saving recipe:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
