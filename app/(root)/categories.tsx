import {useLocalSearchParams} from "expo-router";
import {View, Text, FlatList} from "react-native";
import Colors from "@/services/Colors";
import {useFetch} from "@/lib/fetch";
import {Recipe} from "@/types/type";
import RecipeCard from "@/components/RecipeCard";

const RecipeByCategory=()=>{
    const {categoryName}=useLocalSearchParams();

    const {data:recipeList,loading,refetch}=useFetch<Recipe[]>(`${process.env.EXPO_PUBLIC_SERVER_URL}/(api)/(recipe)/recipeByCategory?category=${categoryName}`)

    return(
        <View style={{
            paddingHorizontal:10,
            backgroundColor:Colors.WHITE,
            height:'100%'
        }}>
            <Text style={{
                fontFamily:'outfit-bold',
                fontSize:25,
                paddingTop:50,
                paddingLeft:30,
                paddingBottom:15
            }}>Browse {categoryName} Recipes</Text>
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

export default RecipeByCategory;