import {FlatList, ScrollView, Text, View} from "react-native";
import Colors from "@/services/Colors";
import IntroHeader from "@/components/IntroHeader";
import CreateRecipe from "@/components/Recipe";
import Category from "@/components/Categories";
import {useFetch} from "@/lib/fetch";
import {Recipe} from "@/types/type";
import RecipeCardHome from "@/components/RecipeCardHome";

const HomePage = () => {
    const {data:latestRecipes,loading,refetch}=useFetch<Recipe[]>(`/(api)/(recipe)/recipeByLimit`)

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 150 }} style={{
            height:'100%',
            backgroundColor:Colors.WHITE,
            paddingVertical:15,
            paddingHorizontal:10,
        }}
        >
            <IntroHeader/>
            <View style={{marginTop:20,marginBottom:10}}>
                <Text style={{
                    fontSize:23,
                    fontFamily:'outfit-bold',
                    marginLeft:20,
                    marginBottom:5
                }}>Latest Recipes</Text>

                <FlatList data={latestRecipes}
                          showsHorizontalScrollIndicator={false}
                          horizontal={true}
                          renderItem={({item,index})=>(
                              <View>
                                  <RecipeCardHome recipe={item}/>
                              </View>
                          )}
                />
            </View>
            <CreateRecipe/>
            <Category/>
        </ScrollView>
    )
}

export default HomePage;