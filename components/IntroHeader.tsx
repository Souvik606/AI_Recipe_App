import { useUser, useAuth } from "@clerk/clerk-expo";
import { Switch, Text, View, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import { useState, useMemo } from "react";
import { router } from "expo-router";

const COLORS = ["#1B5E20", "#0D47A1", "#B71C1C", "#E65100", "#880E4F"]; // Dark Green, Dark Blue, Red, Orange, Dark Pink

const IntroHeader = () => {
    const { user } = useUser();
    const { signOut } = useAuth();
    const [isEnabled, setIsEnabled] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const firstLetter = user?.firstName ? user.firstName[0].toUpperCase() : "?";
    const randomColor = useMemo(() => COLORS[Math.floor(Math.random() * COLORS.length)], []);

    const handleSignOut = () => {
        signOut();
        router.replace("/(auth)/sign-in");
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View style={[styles.profileIcon, { backgroundColor: randomColor }]}>
                        <Text style={styles.profileLetter}>{firstLetter}</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.greeting}>Hello {user?.firstName}</Text>
            </View>

            <View style={styles.toggleContainer}>
                <Text style={styles.toggleText}>{isEnabled ? "Veg" : "Non-Veg"}</Text>
                <Switch value={isEnabled} onValueChange={() => setIsEnabled(!isEnabled)} />
            </View>

            {modalVisible && (
                <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modal}>
                        <Text style={styles.modalName}>{user?.fullName}</Text>
                        <Text style={styles.modalEmail}>{user?.emailAddresses[0].emailAddress}</Text>
                        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
                            <Text style={styles.signOutText}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 5,
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    profileLetter: {
        color: "#FFFFFF",
        fontSize: 18,
        fontFamily: "outfit",
    },
    greeting: {
        fontFamily: "outfit-bold",
        fontSize: 20,
    },
    toggleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    toggleText: {
        fontFamily: "outfit",
        fontSize: 16,
    },
    overlay: {
        position: "absolute",
        top: 13,
        left: 10,
        right: 0,
        bottom: 0,
        zIndex: 10,
    },
    modal: {
        position: "absolute",
        top: 50,
        left: 10,
        width: 350,
        backgroundColor: "#FAFAFA",
        borderRadius: 8,
        padding: 20,
        zIndex: 20,
    },
    modalName: {
        fontFamily: "outfit-bold",
        fontSize: 18,
    },
    modalEmail: {
        fontFamily: "outfit",
        fontSize: 16,
        marginVertical: 5,
    },
    signOutButton: {
        marginTop: 15,
    },
    signOutText: {
        fontSize: 16,
        fontFamily: "outfit-bold",
        color: "#D32F2F",
    },
});

export default IntroHeader;
