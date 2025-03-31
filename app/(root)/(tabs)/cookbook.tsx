import {View, Text, FlatList, StyleSheet, TouchableOpacity, Image} from "react-native";
import Colors from "@/services/Colors";
import {useFetch} from "@/lib/fetch";
import {Recipe} from "@/types/type";
import {useUser} from "@clerk/clerk-expo";
import RecipeCard from "@/components/RecipeCard";
import Ionicons from '@expo/vector-icons/Ionicons';
import {useCallback, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";

const CookbookPage = () => {
    const {user}=useUser()
    const [activeTab, setActiveTab] = useState(1);
    const email=user?.emailAddresses[0].emailAddress
    const {data:userRecipes,loading,refetch}=
        activeTab==1?useFetch<Recipe[]>(`${process.env.EXPO_PUBLIC_SERVER_URL}/(api)/(recipe)/recipeByUser?email=${email}`):
            useFetch<Recipe[]>(`${process.env.EXPO_PUBLIC_SERVER_URL}/(api)/(saved)/savedRecipes?email=${email}`)

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    );

    return (
        <View style={{
            padding:20,
            backgroundColor:Colors.WHITE,
            height:'100%',
        }}>
            <Text style={{
                fontFamily:'outfit-bold',
                fontSize:25,
                paddingLeft:20,
                marginBottom:15
            }}>CookBook</Text>

            <View style={[styles.tabContainer,{marginBottom:6,gap:10}]}>
                <TouchableOpacity
                    onPress={() => setActiveTab(1)}
                    style={[styles.tabContainer,{opacity:activeTab==1?1:0.4}]}>
                    <Ionicons name="sparkles-sharp" size={24} color="black" />
                    <Text style={styles.tabText}>My Recipes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setActiveTab(2)}
                    style={[styles.tabContainer,{opacity:activeTab==2?1:0.4}]}>
                    <Ionicons name="bookmark-sharp" size={24} color="black" />
                    <Text style={styles.tabText}>Saved Recipes</Text>
                </TouchableOpacity>
            </View>

            {
                loading && (
                    <View style={{height:'90%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontFamily:'outfit',fontSize:20}}>Loading...</Text>
                    </View>
                )
            }

            {!loading && userRecipes?.length>0?(
                <FlatList
                    data={userRecipes}
                    onRefresh={refetch}
                    refreshing={loading}
                    contentContainerStyle={{paddingBottom:100}}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View style={{
                            flex:1
                        }} key={index}>
                            <RecipeCard recipe={item} />
                        </View>
                    )}
                />
            ):(!loading &&(
                <View style={{
                    flex:0.8,
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                   <Image source={require('../../../assets/images/cookbook-empty.png')}
                   style={{
                       width:150,
                       height:150
                   }}
                   />
                    <Text style={{
                        fontFamily:'outfit-bold',
                        color:Colors.GRAY,
                        fontSize:23,
                        textAlign:'center',
                        marginHorizontal:20,
                        marginTop:15
                    }}>{activeTab===1?"You haven't created any recipes till now":
                        "You haven't saved any recipes till now"}</Text>
                    <Text style={{
                        fontFamily:'outfit',
                        color:Colors.GRAY,
                        fontSize:18,
                        textAlign:'center'
                    }}>{activeTab===1?"Try to create a recipe using AI now in seconds":
                        "Save a recipe you liked for use in future"}</Text>
                </View>
            ))
            }
        </View>
    )
}

const styles=StyleSheet.create({
    tabContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:'center',
        gap:5,
        padding:5
        },
    tabText:{
        fontFamily:'outfit',
        fontSize:20
    }
    }
)

export default CookbookPage;