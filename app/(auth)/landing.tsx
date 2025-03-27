import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import {Marquee} from "@animatereactnative/marquee";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Colors from "@/services/Colors";
import {router} from "expo-router";

const Landing=()=>{
    const imageList=[
        require('../../assets/images/1.jpg'),
        require('../../assets/images/c1.jpg'),
        require('../../assets/images/2.jpg'),
        require('../../assets/images/c2.jpg'),
        require('../../assets/images/3.jpg'),
        require('../../assets/images/c3.jpg'),
        require('../../assets/images/4.jpg'),
        require('../../assets/images/6.jpg'),
        require('../../assets/images/5.jpg'),
    ]

    return(
        <GestureHandlerRootView>
            <View>
                <Marquee spacing={10} speed={0.7} withGesture={false}
                         style={{
                             transform:[{rotate:'-4deg'}]
                         }}
                >
                    <View style={styles.container}>
                        {imageList.map((image,item)=>(
                            <Image key={item} source={image} style={styles.image}/>
                        ))}
                    </View>
                </Marquee>

                <Marquee spacing={10} speed={0.4} withGesture={false}
                         style={{
                             transform:[{rotate:'-4deg'}],
                             marginTop:10
                         }}
                >
                    <View style={styles.container}>
                        {imageList.map((image,item)=>(
                            <Image key={item} source={image} style={styles.image}/>
                        ))}
                    </View>
                </Marquee>

                <Marquee spacing={10} speed={0.5} withGesture={false}
                         style={{
                             transform:[{rotate:'-4deg'}],
                             marginTop:10
                         }}
                >
                    <View style={styles.container}>
                        {imageList.map((image,item)=>(
                            <Image key={item} source={image} style={styles.image}/>
                        ))}
                    </View>
                </Marquee>
            </View>

            <View style={{
                backgroundColor:Colors.WHITE,
                height:'100%',
                padding:20
            }}>
                <Text style={{
                    fontFamily:'outfit-bold',
                    fontSize:25,
                    textAlign:'center'
                }}>
                    Tastopia AI 🥗🔍|Find,Create and Enjoy Delicious Recipes!
                </Text>
                <Text style={{
                    textAlign:'center',
                    fontFamily:'outfit',
                    fontSize:17,
                    color:Colors.GRAY
                }}>
                    Generate delicious recipes in seconds with the power of AI! 🍔
                </Text>
                <TouchableOpacity onPress={()=>router.replace("/(auth)/sign-up")}
                                  style={styles.button}>
                    <Text style={{
                        textAlign:'center',
                        color:Colors.WHITE,
                        fontSize:22,
                        fontFamily:'outfit-bold',
                        marginTop:7
                    }}>
                        Get Started 🍽️
                    </Text>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    )
}

const styles=StyleSheet.create({
    image:{
        width:160,
        height:160,
        borderRadius:25,
    },
    container:{
        display:'flex',
        flexDirection:'row',
        gap:15
    },
    button:{
        backgroundColor:Colors.PRIMARY,
        paddingVertical:10,
        paddingHorizontal:15,
        borderRadius:999,
        marginTop:20
    }
})

export default Landing;