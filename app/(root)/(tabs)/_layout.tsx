import { Tabs } from "expo-router";
import { Image, StyleSheet, View, Keyboard, Platform } from "react-native";
import { useEffect, useState } from "react";

const TabBarIcon = ({ source, focused }) => (
    <View style={styles.iconContainer}>
        <Image
            source={source}
            style={[
                styles.icon,
                { opacity: focused ? 1 : 0.5, transform: [{ scale: focused ? 1.15 : 1 }] }
            ]}
        />
    </View>
);

const Layout = () => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setIsKeyboardVisible(true);
        });

        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setIsKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: isKeyboardVisible ? styles.hiddenTabBar : styles.tabBar, // Hide tab bar
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon source={require("./../../../assets/images/i1.png")} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon source={require("./../../../assets/images/i2.png")} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cookbook"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon source={require("./../../../assets/images/i3.png")} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon source={require("./../../../assets/images/i4.png")} focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        height: 80,
        borderRadius: 40,
        backgroundColor: "rgba(51, 51, 51, 0.9)",
        borderTopWidth: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 5,
    },
    hiddenTabBar: {
        display: "none", // Hide the tab bar
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
    },
    icon: {
        width: 38,
        height: 38,
        marginBottom: 25,
    },
});

export default Layout;
