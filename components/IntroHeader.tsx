import { useUser, useAuth } from "@clerk/clerk-expo";
import { Switch, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useState, useMemo } from "react";
import Colors from "@/services/Colors";

const COLORS = ["#1B5E20", "#0D47A1", "#B71C1C", "#E65100", "#880E4F"]; // Dark Green, Dark Blue, Red, Orange, Dark Pink

const IntroHeader = () => {
    const { user } = useUser();
    const { signOut } = useAuth();
    const [isEnabled, setIsEnabled] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const firstLetter = user?.firstName ? user.firstName[0].toUpperCase() : "?";
    const randomColor = useMemo(() => COLORS[Math.floor(Math.random() * COLORS.length)], []);

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10
            }}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: randomColor,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{
                            color: "#FFFFFF",
                            fontSize: 18,
                            fontFamily: "outfit",
                        }}>
                            {firstLetter}
                        </Text>
                    </View>
                </TouchableOpacity>

                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 20
                }}>
                    Hello {user?.firstName}
                </Text>
            </View>

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8
            }}>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 16
                }}>
                    {isEnabled ? 'Veg' : 'Non-Veg'}
                </Text>
                <Switch
                    value={isEnabled}
                    onValueChange={() => setIsEnabled(!isEnabled)}
                />
            </View>

            {modalVisible && (
                <Pressable
                    style={{
                        position: "absolute",
                        top: 15,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 10, // Ensures it's above all components
                    }}
                    onPress={() => setModalVisible(false)} // Closes when clicking outside
                >
                    <View
                        style={{
                            position: "absolute",
                            top: 50,
                            left: 10,
                            width: 150,
                            backgroundColor: Colors.GRAY,
                            borderRadius: 8,
                            padding: 10,
                            alignItems: "center",
                            zIndex: 20
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                signOut();
                                setModalVisible(false);
                            }}
                            style={{
                                padding: 10,
                                width: "100%",
                                alignItems: "center",
                                borderRadius: 6
                            }}
                        >
                            <Text style={{ fontSize: 16, fontFamily: "outfit-bold", color: "#D32F2F" }}>
                                Sign Out
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            )}
        </View>
    );
};

export default IntroHeader;
