import {View, Image, Text, TouchableOpacity} from "react-native";
import {Recipe} from "@/types/type";
import Colors from "@/services/Colors";
import {LinearGradient} from "expo-linear-gradient";
import {useRouter} from "expo-router";

type RecipeCardHomeProps = {
    recipe: Recipe;
}
const RecipeCardHome=({recipe}:RecipeCardHomeProps)=>{
    const router = useRouter();

    return(
        <TouchableOpacity onPress={()=>
            router.push({
            pathname:'/(root)/recipeDetails',
            params:{
                recipeData:JSON.stringify(recipe)
            }
        })} style={{margin:5}}>
           <Image source={{uri:recipe?.image_url}}
           style={{
               width:220,
               height:140,
               borderRadius:25,
           }}
           />
            <LinearGradient style={{
                position:'absolute',
                bottom:0,
                padding:10,
                width:'100%',
                borderBottomLeftRadius:20,
                borderBottomRightRadius:20
            }} colors={['transparent','rgba(0,0,0,0.8)','rgba(0,0,0,0.8)','rgba(0,0,0,0.8)']}>
                <View>
                    <Text style={{
                        color:Colors.WHITE,
                        fontFamily:'outfit-bold',
                        fontSize:16
                    }}>{recipe?.recipe_name}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default RecipeCardHome;