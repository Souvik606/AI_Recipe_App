import {useLocalSearchParams} from "expo-router";
import {Text, ScrollView, View} from "react-native";
import {Recipe} from "@/types/type";
import Intro from "@/components/Intro";
import Colors from "@/services/Colors";
import Ingredients from "@/components/Ingredients";
import RecipeSteps from "@/components/RecipeSteps";
import CreateRecipe from "@/components/Recipe";
import {useEffect, useRef} from "react";

const RecipeDetails=()=>{
    const {recipeData}=useLocalSearchParams()
    const recipe:Recipe=JSON.parse(recipeData as string);
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, []);

    return(
        <ScrollView ref={scrollViewRef} style={{
            paddingTop:60,
            padding:15,
            backgroundColor:Colors.WHITE,
            height:'100%'
        }}>
            <Intro recipe={recipe}/>
            <Ingredients items={recipe?.ingredients}/>
            <RecipeSteps steps={recipe?.steps}/>
            <View style={{marginBottom:80}}>
                <Text style={{
                    fontFamily:'outfit-bold',
                    fontSize:20,
                    textAlign:'center',
                    marginTop:35,
                    marginBottom:15
                }}>Are you looking for something else?Write a prompt and create new recipe.</Text>
                <CreateRecipe/>
            </View>
        </ScrollView>
    )
}

export default RecipeDetails;