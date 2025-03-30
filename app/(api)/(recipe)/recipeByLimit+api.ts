import { sql } from "@/lib/database";

export async function GET(request: Request) {
    try {
        const response = await sql`
            SELECT * FROM recipe
            ORDER BY timestamp desc
            LIMIT 10
        `;

        return new Response(JSON.stringify({ data: response }), {
            status: 200,
        });

    } catch (error) {
        console.error("Error creating user:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
