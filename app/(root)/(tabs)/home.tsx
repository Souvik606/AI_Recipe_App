import {FlatList, ScrollView, Text, View} from "react-native";
import Colors from "@/services/Colors";
import IntroHeader from "@/components/IntroHeader";
import CreateRecipe from "@/components/Recipe";
import Category from "@/components/Categories";
import {useFetch} from "@/lib/fetch";
import {Recipe} from "@/types/type";
import RecipeCardHome from "@/components/RecipeCardHome";
import { useFocusEffect } from "@react-navigation/native";
import {useCallback} from "react";

const HomePage = () => {
    const {data:latestRecipes,loading,refetch}=useFetch<Recipe[]>(`/(api)/(recipe)/recipeByLimit`)

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    );

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

                {loading && (
                    <Text style={{
                        fontFamily:'outfit',
                        fontSize:20,
                        textAlign:'center',
                        marginTop:35
                    }}>Loading ...</Text>
                )}

                {!loading && (
                    <FlatList data={latestRecipes}
                              showsHorizontalScrollIndicator={false}
                              onRefresh={refetch}
                              refreshing={loading}
                              horizontal={true}
                              renderItem={({item,index})=>(
                                  <View key={index}>
                                      <RecipeCardHome recipe={item}/>
                                  </View>
                              )}
                    />
                )}
            </View>
            <CreateRecipe/>
            <Category/>
        </ScrollView>
    )
}

export default HomePage;