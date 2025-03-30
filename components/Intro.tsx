import {Recipe} from "@/types/type";
import {Image, View, Text, StyleSheet} from "react-native";
import Colors from "@/services/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';

type IntroProps = {
    recipe: Recipe;
};

const Intro=({recipe}:IntroProps)=>{
    return(
        <View>
            <Image source={{uri:recipe.image_url.replace('ai-guru-lab-images/','ai-guru-lab-images%2f')}}
                   style={{
                       width:'100%',
                       height:240,
                       borderRadius:20
                   }}/>
            <Text style={{
                fontFamily:'outfit-bold',
                fontSize:25,
                marginTop:7,
                textAlign:'center'
            }}>{recipe.recipe_name}</Text>

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