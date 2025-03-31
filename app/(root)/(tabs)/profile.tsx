import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image} from "react-native";
import Colors from "@/services/Colors";
import {useAuth, useUser} from "@clerk/clerk-expo";
import {useMemo} from "react";
import {useRouter} from "expo-router";

const COLORS = ["#1B5E20", "#0D47A1", "#B71C1C", "#E65100", "#880E4F"];

const options=[
    {
        name:'Create New Recipe',
        icon:require('./../../../assets/images/i1.png'),
        path:`/(tabs)/home`
    },
    {
        name:'My Recipes',
        icon:require('./../../../assets/images/i3.png'),
        path:`/(tabs)/cookbook`
    },
    {
        name:'Browse More Recipes',
        icon:require('./../../../assets/images/i2.png'),
        path:`/(tabs)/explore`
    },
    {
        name:'Logout',
        icon:require('../../../assets/images/i5.png'),
        path:`/(auth)/sign-in`
    }
]

const ProfilePage = () => {
    const { user } = useUser();
    const { signOut } = useAuth();
    const router = useRouter();

    const firstLetter = user?.firstName ? user.firstName[0].toUpperCase() : "?";
    const randomColor = useMemo(() => COLORS[Math.floor(Math.random() * COLORS.length)], []);

    return (
        <View style={{
            padding:20,
            backgroundColor:Colors.WHITE,
            height:'100%'
        }}>
            <Text style={{
                fontFamily:'outfit-bold',
                fontSize:25,
                paddingLeft:20,
                marginBottom:15
            }}>Profile</Text>

            <View style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                marginTop:35
            }}>
                <View style={[styles.profileIcon, { backgroundColor: randomColor }]}>
                    <Text style={styles.profileLetter}>{firstLetter}</Text>
                </View>

                <Text style={{
                    fontFamily:'outfit-bold',
                    fontSize:22,
                    marginTop:10
                }}>{user?.fullName}</Text>
                <Text style={{
                    fontFamily:'outfit',
                    color:Colors.GRAY,
                    fontSize:18
                }}>{user?.emailAddresses[0].emailAddress}</Text>

                <FlatList style={{marginTop:30}} data={options}
                          renderItem={({item,index})=>(
                                  <TouchableOpacity onPress={
                                      item.name==='Logout'?()=>{
                                          signOut();
                                          router.push(item.path)
                                      }:()=>{
                                          router.push(item.path)
                                      }
                                  }>
                                      <View style={{
                                          display:'flex',
                                          flexDirection:'row',
                                          justifyContent:'flex-start',
                                          alignItems:'center',
                                          gap:15,
                                          marginBottom:30
                                      }}>
                                          <Image source={item.icon} style={{
                                              width:50,
                                              height:50
                                          }}/>

                                          <Text style={{
                                              fontFamily:'outfit',
                                              fontSize:22
                                          }}>{item.name}</Text>
                                      </View>
                                  </TouchableOpacity>
                          )}/>
            </View>

        </View>
    )
}

const styles=StyleSheet.create({
    profileIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    profileLetter: {
        color: "#FFFFFF",
        fontSize: 40,
        fontFamily: "outfit",
    },
})
export default ProfilePage;