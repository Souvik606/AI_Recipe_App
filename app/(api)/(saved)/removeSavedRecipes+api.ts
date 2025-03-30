import {sql} from "@/lib/database";

export async function DELETE(request:Request){
    try{
        const {recipeId}=await request.json()

        const response=await sql`
        DELETE FROM saved_recipes(user_id,category_id)
        WHERE recipe_id=${recipeId}
        RETURNING *;
        `

        return new Response(JSON.stringify({ data: response }), {
            status: 200,
        });
    }catch (error) {
        console.error("Error while deleting recipe:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}