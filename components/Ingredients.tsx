import {View, Text, FlatList} from "react-native";
import {Ingredient} from "@/types/type";
import Colors from "@/services/Colors";

type IngredientsProps = {
    items: Ingredient[];
};

const Ingredients=({items}:IngredientsProps)=>{
    return(
        <View style={{
            marginTop:25,
        }}>
            <View style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
            }}>
                <Text style={{
                    fontFamily:'outfit-bold',
                    fontSize:20
                }}>Ingredients</Text>

                <Text style={{
                    fontFamily:'outfit',
                    fontSize:16
                }}>{items?.length} Items</Text>
            </View>

            <FlatList style={{marginTop:10}} data={items}
                      keyExtractor={(item) => item?.ingredient}
                      scrollEnabled={false}
                      renderItem={({item,index})=>(
                          <View key={index} style={{
                              display:'flex',
                              flexDirection:'row',
                              alignItems:'center',
                              justifyContent:'space-between',
                          }}>
                              <View style={{
                                  display:'flex',
                                  flexDirection:'row',
                                  alignItems:'center',
                                  gap:7,
                                  paddingVertical:8,

                              }}>
                                  <Text style={{
                                      fontSize:22,
                                      padding:5,
                                      backgroundColor:Colors.SECONDARY,
                                      borderRadius:99
                                  }}>{item?.icon}</Text>

                                  <Text style={{
                                      fontFamily:'outfit',
                                      fontSize:18
                                  }}>{item?.ingredient}</Text>
                              </View>
                              <Text style={{
                                  fontFamily:'outfit',
                                  fontSize:20,
                                  color:Colors.GRAY
                              }}>{item?.quantity}</Text>
                          </View>
                      )}
            />
        </View>
    )
}

export default Ingredients;