import { sql } from "@/lib/database";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const recipeId = searchParams.get("recipeId");
        const userId=searchParams.get("userId");

        const response = await sql`
            SELECT EXISTS (
                SELECT 1 FROM saved_recipes
                WHERE recipe_id = ${recipeId}
                AND user_id = ${userId}
            ) AS is_saved;
        `;

        return new Response(JSON.stringify({ data: response }), {
            status: 200,
        });

    } catch (error) {
        console.error("Error creating user:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
