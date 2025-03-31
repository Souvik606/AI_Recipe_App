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
            category,
            imageUrl,
            email
        } = await request.json();

        console.log("email", email);

        if (!(recipeName && email)) {
            return new Response(
                JSON.stringify({ error: "Missing recipe name or email address" }),
                { status: 400 }
            );
        }

        // 🔹 Use a single query to fetch user_id and category_id together
        const result = await sql`
            WITH user_info AS (
                SELECT id AS user_id FROM users_list WHERE email = ${email}
            ), category_info AS (
                SELECT category_id FROM categories WHERE category_name = ${category}
            )
            INSERT INTO recipe (
                recipe_name,
                description,
                ingredients,
                steps,
                calories,
                cook_time,
                serve_to,
                image_prompt,
                category_id,
                image_url,
                user_id
            )
            SELECT 
                ${recipeName},
                ${description},
                ${JSON.stringify(ingredients)},
                ${JSON.stringify(steps)},
                ${calories},
                ${cookTime},
                ${serveTo},
                ${ImagePrompt},
                category_info.category_id,
                ${imageUrl},
                user_info.user_id
            FROM user_info, category_info
            RETURNING *;
        `;

        // If no user or category was found, `result` will be empty
        if (!result.length) {
            return new Response(
                JSON.stringify({ error: "User or category not found" }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify({ data: result[0] }), { status: 201 });

    } catch (error) {
        console.error("Error creating recipe:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 }
        );
    }
}
