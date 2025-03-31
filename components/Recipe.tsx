import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator} from "react-native";
import Colors from "@/services/Colors";
import {useRef, useState} from "react";
import AIModel from "@/lib/openai";
import Prompt from '@/services/Prompt'
import ActionSheet,{ActionSheetRef} from "react-native-actions-sheet";
import LoadingDialog from "@/components/LoadingDialog";
import generateImage from "@/lib/imageAi";
import {fetchAPI} from "@/lib/fetch";
import {useUser} from "@clerk/clerk-expo";
import {useRouter} from "expo-router";

const CreateRecipe=()=>{
    const [userInput, setUserInput] = useState("")
    const [recipeOptions,setRecipeOptions] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const actionSheetRef=useRef<ActionSheetRef>(null);
    const [openLoading,setOpenLoading] = useState(false);
    const { user } = useUser();
    const router = useRouter();

    const onGenerate=async()=>{
        if(!userInput){
            Alert.alert("Please enter details");
            return;
        }
        try {
            setLoading(true)
            const result = await AIModel(userInput + Prompt.GENERATE_RECIPE_OPTION_PROMPT);
            const content=JSON.parse(result?.choices[0].message?.content.replace(/^```(json)?\s*/, "").replace(/\s*```$/, ""));
            content && setRecipeOptions(content)
            setLoading(false);
            actionSheetRef.current?.show();
        } catch (error) {
            console.error("Error during AI model call:", error);
            Alert.alert("Error", "Something went wrong while generating the recipe.");
        } finally {
            setLoading(false);
            actionSheetRef.current?.show()
        }
    }

    const GenerateCompleteRecipe=async(option:any)=>{
        actionSheetRef.current?.hide();
        try{
            setOpenLoading(true);
            const PROMPT="RecipeName "+option.recipeName+" Description:"+option.recipeDescription+Prompt.GENERATE_COMPLETE_RECIPE;
            const result=await AIModel(PROMPT);
            const content=JSON.parse(result?.choices[0].message?.content.replace(/^```(json)?\s*/, "").replace(/\s*```$/, ""));
            const imagePrompt=content[0]?.ImagePrompt;
            const outputUrl=await generateImage(imagePrompt)
            const {data:recipe}=await fetchAPI('/(api)/(recipe)/recipe',{
                method: "POST",
                body:JSON.stringify({
                    ...content[0],
                    imageUrl:outputUrl,
                    email:user?.emailAddresses[0].emailAddress
                }),
            })
            router.push({
                    pathname:'/(root)/recipeDetails',
                    params:{
                        recipeData:JSON.stringify(recipe[0])
                    }
                }
            )

        }catch(error){
            console.error("Error during AI model call:", error);
            Alert.alert("Error", "Something went wrong while generating the recipe.");
        }
        finally {
            setOpenLoading(false);
        }
    }

    return(
        <View style={styles.container}>
            <Image style={styles.panImage} source={require('../assets/images/pan.gif')}/>
            <Text style={styles.heading}>Warm up your stove, and let's get cooking</Text>
            <Text style={styles.subheading}>Make something of your love for your loved</Text>
            <TextInput style={styles.textInput} multiline={true} numberOfLines={3}
                       placeholder="What you want to create?Add ingredients etc"
                       onChangeText={(value)=>setUserInput(value)}
            />
            <TouchableOpacity style={styles.button} onPress={()=>onGenerate()}>
                <View style={{
                    display:"flex",
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'row',
                    gap:8
                }}>
                    <Text style={styles.buttonText}>✨  Generate Recipe</Text>
                    {loading?<ActivityIndicator color={Colors.WHITE}/>:""}
                </View>
            </TouchableOpacity>

            <LoadingDialog visible={openLoading}/>
            <ActionSheet ref={actionSheetRef}>
                <View style={styles.actionSheetContainer}>
                    <Text style={styles.actionSheetHeading}>Select Recipe</Text>
                    <View>
                        {recipeOptions?.map((recipe:any, index:any) => (
                            <TouchableOpacity onPress={()=>GenerateCompleteRecipe(recipe)} key={index} style={styles.recipeContainer}>
                                <Text style={{
                                    fontFamily:'outfit-bold',
                                    fontSize:16
                                }}>
                                    {recipe.recipeName}
                                </Text>

                                <Text style={{
                                    fontFamily:'outfit',
                                    color:Colors.GRAY
                                }}>{recipe.description}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ActionSheet>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        marginTop:5,
        padding:15,
        marginHorizontal:10,
        backgroundColor:Colors.SECONDARY,
        borderRadius:25,
        display:"flex",
        alignItems:'center'
    },
    panImage:{
        width:80,
        height:80
    },
    heading:{
        fontFamily:'outfit-bold',
        fontSize:20,
        textAlign:'center',
    },
    subheading:{
        fontFamily:'outfit',
        fontSize:16,
        marginTop:10,
        textAlign:'center',
    },
    textInput:{
        backgroundColor:Colors.WHITE,
        width:"100%",
        borderRadius:15,
        height:120,
        marginTop:15,
        fontSize:16,
        fontFamily:'outfit',
        padding:15,
        textAlignVertical:'top'
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 999,
        marginTop: 22,
        width:'100%',
    },
    buttonText: {
        textAlign: "center",
        color: Colors.WHITE,
        fontSize: 20,
        fontFamily: "outfit",
        marginTop: 5,
    },
    actionSheetContainer:{
        padding:25
    },
    actionSheetHeading:{
        fontFamily:'outfit-bold',
        fontSize:23,
        textAlign:'center'
    },
    recipeContainer:{
        padding:15,
        borderWidth:0.2,
        borderRadius:15,
        marginTop:15,
    }
})

export default CreateRecipe;