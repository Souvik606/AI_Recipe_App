import {Stack} from "expo-router";

const Layout=()=>{
    return(
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="categories" options={{
                headerTransparent:true,
                headerTitle:''
            }} />

            <Stack.Screen name="recipeDetails" options={{
                headerTransparent:true,
                headerTitle:''
            }} />
        </Stack>
    )
}

export default Layout