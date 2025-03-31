import {View, Text, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import Colors from "@/services/Colors";
import {useFetch} from "@/lib/fetch";
import {Recipe} from "@/types/type";
import {useUser} from "@clerk/clerk-expo";
import RecipeCard from "@/components/RecipeCard";
import Ionicons from '@expo/vector-icons/Ionicons';
import {useState} from "react";

const CookbookPage = () => {
    const {user}=useUser()
    const [activeTab, setActiveTab] = useState(1);
    const email=user?.emailAddresses[0].emailAddress
    const {data:userRecipes,loading,refetch}=
        activeTab==1?useFetch<Recipe[]>(`/(api)/(recipe)/recipeByUser?email=${email}`):
            useFetch<Recipe[]>(`/(api)/(saved)/savedRecipes?email=${email}`)

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

            {!loading && (
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
            )}
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