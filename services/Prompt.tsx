export default{
    GENERATE_RECIPE_OPTION_PROMPT:`:Depends on user instruction create only 3 different Recipe variant with Recipe Name with Emoji(compulsory),2 lines of description and main ingredient list in JSON format with field recipeName,description,ingredients (without size) only.Return only the three json entries in an array and no other text or quotations `,

    GENERATE_COMPLETE_RECIPE:`
        -As per recipe Name and Description,Give me all list of ingredients as ingredient and try to name the ingredients in one or two words
        -Emoji icons for each ingredient as icon is compulsory,quantity as quantity,along with detail step by step recipe as steps
        -Total Calories as calories(only number),Minutes to cook as cookTime and serving number as serveTo
        -Realistic image Text prompt as per recipe as ImagePrompt
        -Select one category of the food from one of the following-[Breakfast,Lunch,Dinner,Drink,Salad,Dessert,FastFood,Chinese]
        -Give me response in JSON format only
        -Emoji in ingredient icon is compulsory.You have to give it.
        -Following field names should be given only in this named format.
            recipeName,
            description,
            ingredients,
            steps,
            calories,
            cookTime,
            serveTo,
            category,
            ImagePrompt,
        -Return json in an array and no other text or quotations
        `
}