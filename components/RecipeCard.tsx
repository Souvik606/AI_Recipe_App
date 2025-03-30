import {Recipe} from "@/types/type";
import {View, Image, Text} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Colors from "@/services/Colors";

type RecipeCardProps = {
    recipe: Recipe;
};

const RecipeCard=({ recipe }: RecipeCardProps)=>{
    return(
        <View style={{
            margin:5,
        }}>
            <Image source={{uri:recipe?.image_url}} style={{
                width:'100%',
                height:220,
                borderRadius:20
            }}/>

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
        </View>
    )
}

export default RecipeCard;