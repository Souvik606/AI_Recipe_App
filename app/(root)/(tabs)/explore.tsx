import {View, Text, FlatList} from "react-native";
import Colors from "@/services/Colors";
import {useFetch} from "@/lib/fetch";
import {Recipe} from "@/types/type";
import RecipeCard from "@/components/RecipeCard";
import {useFocusEffect} from "@react-navigation/native";
import {useCallback} from "react";

const ExplorePage = () => {
    const {data:recipeList,loading,refetch}=useFetch<Recipe[]>(`/(api)/(recipe)/allRecipes`);

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    );

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
            }}>Explore</Text>

            {
                loading && (
                    <View style={{height:'90%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontFamily:'outfit',fontSize:20}}>Loading...</Text>
                    </View>
                )
            }

            {!loading && (
                <FlatList
                    data={recipeList}
                    onRefresh={refetch}
                    refreshing={loading}
                    contentContainerStyle={{paddingBottom:100}}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.recipe_id}
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

export default ExplorePage;