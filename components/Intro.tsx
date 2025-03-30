import {Recipe} from "@/types/type";
import {Image, View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import Colors from "@/services/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useUser} from "@clerk/clerk-expo";
import {fetchAPI} from "@/lib/fetch";
import {useState} from "react";

type IntroProps = {
    recipe: Recipe;
    saveStatus:boolean|null;
};

const Intro=({recipe,saveStatus}:IntroProps)=>{
    const {user}=useUser();
    const [saved, setSaved] = useState(saveStatus);

    const saveRecipe=async()=>{
        await fetchAPI('/(api)/(saved)/saveRecipes',{
            method: "POST",
            body:JSON.stringify({
                recipeId:recipe?.recipe_id,
                email:user?.emailAddresses[0].emailAddress
            }),
        })
        Alert.alert("Saved!",`Recipe of ${recipe.recipe_name} saved in your cookbook.Visit anytime in future to see it.`);
        setSaved(true);
    }

    const deleteRecipe=async()=>{
        await fetchAPI('/(api)/(saved)/removeSavedRecipes',{
            method: "DELETE",
            body:JSON.stringify({
                recipeId:recipe?.recipe_id,
            }),
        })
        Alert.alert("Unsaved!",`Recipe of ${recipe.recipe_name} is unsaved.Press save again to save it.`);
        setSaved(false);
    }

    return(
        <View>
            <Image source={{uri:recipe.image_url.replace('ai-guru-lab-images/','ai-guru-lab-images%2f')}}
                   style={{
                       width:'100%',
                       height:240,
                       borderRadius:20
                   }}/>
            <View style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center'
            }}>
                <Text style={{
                    fontFamily:'outfit-bold',
                    fontSize:25,
                    marginTop:7,
                }}>{recipe.recipe_name}</Text>
                <TouchableOpacity onPress={()=>{
                    !saved?saveRecipe():deleteRecipe()
                }}>
                    {!saved?<Feather name="bookmark" size={30} color="black" />:
                        <FontAwesome name="bookmark" size={30} color="black" />
                    }
                </TouchableOpacity>
            </View>

            <Text style={{
                fontFamily:'outfit-bold',
                fontSize:20,
                marginTop:12
            }}>Description</Text>

            <Text style={{
                fontFamily:'outfit',
                fontSize:17,
                marginTop:3,
                color:Colors.GRAY
            }}>{recipe.description}</Text>

            <View style={{
                marginTop:15,
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                gap:10
            }}>
                <View style={styles.featureContainer}>
                    <Ionicons name="leaf" size={18} color={Colors.PRIMARY}/>
                    <View>
                        <Text style={styles.mainText}>{recipe?.calories}</Text>
                        <Text style={styles.titleText}>Calories</Text>
                    </View>
                </View>

                <View style={styles.featureContainer}>
                    <Ionicons name="timer" size={18} color={Colors.PRIMARY}/>
                    <View>
                        <Text style={styles.mainText}>{recipe?.cook_time}</Text>
                        <Text style={styles.titleText}>Minutes</Text>
                    </View>
                </View>

                <View style={styles.featureContainer}>
                    <Ionicons name="people" size={18} color={Colors.PRIMARY}/>
                    <View>
                        <Text style={styles.mainText}>{recipe?.serve_to}</Text>
                        <Text style={styles.titleText}>Serve To</Text>
                    </View>
                </View>
            </View>

        </View>
    )
}

const styles=StyleSheet.create({
        featureContainer:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:7,
            padding:15,
            backgroundColor:Colors.SECONDARY,
            borderRadius:15
            },

        mainText:{
            fontFamily:'outfit-bold',
            fontSize:18,
            color:Colors.PRIMARY
        },
        titleText:{
            fontFamily:'outfit',
            fontSize:16,
        }
    }
)

export default Intro;