import {sql} from "@/lib/database";

export async function GET(req: Request) {
    try{
        const response=await sql`SELECT * FROM categories`

        return new Response(JSON.stringify({ data: response }), {
            status: 200,
        });

    }catch (error) {
        console.error("Error creating user:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}