import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import Colors from "@/services/Colors";
import {useState} from "react";

const CreateRecipe=()=>{
    const [userInput, setUserInput] = useState("")

    return(
        <View style={styles.container}>
            <Image style={styles.panImage} source={require('../assets/images/pan.gif')}/>
            <Text style={styles.heading}>Warm up your stove, and let's get cooking</Text>
            <Text style={styles.subheading}>Make something of your love for your loved</Text>
            <TextInput style={styles.textInput} multiline={true} numberOfLines={3}
                       placeholder="What you want to create?Add ingredients etc"
                       onChangeText={(value)=>setUserInput(value)}
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>✨  Generate Recipe</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        marginTop:10,
        padding:15,
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
    }
})

export default CreateRecipe;