import {FlatList, StyleSheet, Text, View} from "react-native";
import Colors from "@/services/Colors";

type StepsProps={
    steps:string[];
}
const RecipeSteps=({steps}:StepsProps)=>{
    return(
        <View style={{marginTop:15}}>
           <Text style={{
               fontFamily:'outfit-bold',
               fontSize:20,
           }}>Recipe Steps</Text>

           <FlatList data={steps}
           scrollEnabled={false}
           renderItem={({item,index})=>(
               <View key={index} style={{
                   display:'flex',
                   flexDirection:'row',
                   gap:15,
                   alignItems:'center',
                   marginTop:15,
                   padding:10,
                   borderRadius:15,
                   borderWidth:0.5,
               }}>
                   <Text style={[styles.textStyle,{
                       padding:10,
                       width:40,
                       textAlign:'center',
                       backgroundColor:Colors.SECONDARY,
                       borderRadius:99,
                   }]}>{index+1}</Text>
                   <Text style={[styles.textStyle,{flex:1}]}>{item}</Text>
               </View>
               )}
           />
        </View>
    )
}

const styles=StyleSheet.create({
    textStyle:{
        fontFamily:'outfit',
        fontSize:17,
    }
})
export default RecipeSteps;