import { sql } from "@/lib/database";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const categoryName = searchParams.get("category");

        const response = await sql`
            SELECT R.*, C.category_name FROM recipe R
            JOIN categories C ON R.category_id = C.category_id
            WHERE C.category_name = ${categoryName};
        `;

        return new Response(JSON.stringify({ data: response }), {
            status: 200,
        });

    } catch (error) {
        console.error("Error creating user:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
