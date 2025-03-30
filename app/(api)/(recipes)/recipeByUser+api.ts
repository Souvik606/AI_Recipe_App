import { sql } from "@/lib/database";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const email = searchParams.get("email");

        const response = await sql`
            SELECT R.* FROM recipe R
            JOIN users_list U ON R.user_id = U.id
            WHERE U.email = ${email}
            ORDER BY R.timestamp DESC;
        `;

        return new Response(JSON.stringify({ data: response }), {
            status: 200,
        });

    } catch (error) {
        console.error("Error creating user:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
