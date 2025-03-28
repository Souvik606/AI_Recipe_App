import {ScrollView} from "react-native";
import Colors from "@/services/Colors";
import IntroHeader from "@/components/IntroHeader";
import Recipe from "@/components/Recipe";

const HomePage = () => {
    return (
        <ScrollView style={{
            height:'100%',
            backgroundColor:Colors.WHITE,
            paddingVertical:15,
            paddingHorizontal:10
        }}>
            <IntroHeader/>
            <Recipe/>
        </ScrollView>
    )
}

export default HomePage;