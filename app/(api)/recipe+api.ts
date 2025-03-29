import { sql } from "@/lib/database";

export async function POST(request: Request) {
    try {
        const {
            recipeName,
            description,
            ingredients,
            steps,
            calories,
            cookTime,
            serveTo,
            ImagePrompt,
            imageUrl,
            email
        } = await request.json();

        if (!(recipeName && email)) {
            return new Response(
                JSON.stringify({ error: "Missing recipe name or email address" }),
                { status: 400 }
            );
        }

        const user = await sql`SELECT id FROM users_list WHERE email=${email};`;

        if (!user.length) {
            return new Response(
                JSON.stringify({ error: "User not found" }),
                { status: 404 }
            );
        }

        const recipe = await sql`
        INSERT INTO recipe(
            recipe_name,
            description,
            ingredients,
            steps,
            calories,
            cook_time,
            serve_to,
            image_prompt,
            image_url,
            user_id
        ) VALUES (
            ${recipeName},
            ${description},
            ${JSON.stringify(ingredients)},
            ${JSON.stringify(steps)},
            ${calories},
            ${cookTime},
            ${serveTo},
            ${ImagePrompt},
            ${imageUrl},
            ${user[0].id}
        )
        RETURNING *;
    `;
        return new Response(JSON.stringify({ data: recipe }), {
            status: 201,
        });

    } catch (error) {
        console.error("Error creating recipe:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 }
        );
    }
}
