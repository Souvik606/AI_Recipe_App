import { sql } from "@/lib/database";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const email = searchParams.get("email");

        const userId=await sql`
        SELECT id FROM users_list WHERE email=${email};
       `

        const response = await sql`
            SELECT * FROM recipe
            WHERE recipe_id IN (
                SELECT recipe_id FROM saved_recipes
                WHERE user_id=${userId[0].id};                
                )
        `;

        return new Response(JSON.stringify({ data: response }), {
            status: 200,
        });

    } catch (error) {
        console.error("Error creating user:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
