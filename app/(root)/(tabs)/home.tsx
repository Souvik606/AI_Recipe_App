import {ScrollView} from "react-native";
import Colors from "@/services/Colors";
import IntroHeader from "@/components/IntroHeader";
import Recipe from "@/components/Recipe";
import Category from "@/components/Categories";

const HomePage = () => {
    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 150 }} style={{
            height:'100%',
            backgroundColor:Colors.WHITE,
            paddingVertical:15,
            paddingHorizontal:10,
        }}
        >
            <IntroHeader/>
            <Recipe/>
            <Category/>
        </ScrollView>
    )
}

export default HomePage;