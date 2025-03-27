import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import Colors from "@/services/Colors";
import HeaderImage from "@/assets/images/food.jpg";
import { useState } from "react";
import InputField from "@/components/InputField";
import {Link, router} from "expo-router";
import person from "@/assets/icons/person.png";
import email from "@/assets/icons/email.png";
import lock from "@/assets/icons/lock.png";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";
import check from "@/assets/images/check.png";

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [verification, setVerification] = useState({
        state: "default",
        error: "",
        code: "",
    });

    const onSignUpPress = async () => {
        if (!isLoaded) return;
        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            });
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setVerification({
                ...verification,
                state: "pending",
            });
        } catch (err: any) {
            console.log(JSON.stringify(err, null, 2));
            Alert.alert("Error", err.errors[0].longMessage);
        }
    };

    const onPressVerify = async () => {
        if (!isLoaded) return;
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            });
            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                setVerification({
                    ...verification,
                    state: "success",
                });
            } else {
                setVerification({
                    ...verification,
                    error: "Verification failed. Please try again.",
                    state: "failed",
                });
            }
        } catch (err: any) {
            setVerification({
                ...verification,
                error: err.errors[0].longMessage,
                state: "failed",
            });
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.container}>
                <Image style={styles.header} source={HeaderImage} />
                <Text style={styles.headerText}>Create Account</Text>
                <View style={styles.formContainer}>
                    <InputField
                        label="Name"
                        placeholder="Enter name"
                        value={form.name}
                        icon={person}
                        labelStyle={{ marginLeft: 20 }}
                        onChangeText={(value) => setForm({ ...form, name: value })}
                    />

                    <InputField
                        label="Email"
                        placeholder="Enter email"
                        textContentType="emailAddress"
                        value={form.email}
                        icon={email}
                        labelStyle={{ marginLeft: 20 }}
                        onChangeText={(value) => setForm({ ...form, email: value })}
                    />

                    <InputField
                        label="Password"
                        placeholder="Enter password"
                        value={form.password}
                        icon={lock}
                        textContentType="password"
                        secureTextEntry={true}
                        labelStyle={{ marginLeft: 20 }}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                    />

                    <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
                        <Text style={styles.buttonText}>Register 🌟</Text>
                    </TouchableOpacity>

                    <Link href="/sign-in" style={styles.linkStyle}>
                        Already have an account?{" "}
                        <Text style={styles.linkText}>Log In</Text>
                    </Link>
                </View>

                <ReactNativeModal
                    isVisible={verification.state === "pending"}
                    onModalHide={() => {
                        if (verification.state === "success") {
                            setShowSuccessModal(true);
                        }
                    }}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Verification</Text>
                        <Text style={styles.modalText}>
                            We've sent a verification code to {form.email}.
                        </Text>
                        <InputField
                            label={"Code"}
                            icon={lock}
                            placeholder={"12345"}
                            value={verification.code}
                            keyboardType="numeric"
                            labelStyle={{ marginLeft: 20 }}
                            onChangeText={(code) =>
                                setVerification({ ...verification, code })
                            }
                        />
                        {verification.error && (
                            <Text style={styles.errorText}>{verification.error}</Text>
                        )}
                        <TouchableOpacity
                            onPress={onPressVerify}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Verify Email   📧</Text>
                        </TouchableOpacity>
                    </View>
                </ReactNativeModal>

                <ReactNativeModal isVisible={showSuccessModal}>
                    <View style={styles.modalContainer}>
                        <Image source={check} style={styles.successImage} />
                        <Text style={styles.successTitle}>Verified</Text>
                        <Text style={styles.successText}>
                            You have successfully verified your account.
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowSuccessModal(false);
                                router.push(`/(root)/(tabs)/home`);
                            }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Go To Home 🌮📖</Text>
                        </TouchableOpacity>
                    </View>
                </ReactNativeModal>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    header: {
        width: "100%",
        height: 300,
    },
    headerText: {
        fontFamily: "outfit-bold",
        fontSize: 27,
        textAlign: "center",
        marginTop: 15,
    },
    formContainer: {
        paddingHorizontal: 15,
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 999,
        marginTop: 22,
        width:'100%',
    },
    buttonText: {
        textAlign: "center",
        color: Colors.WHITE,
        fontSize: 20,
        fontFamily: "outfit-bold",
        marginTop: 5,
    },
    linkStyle: {
        textAlign: "center",
        fontFamily: "outfit",
        marginTop: 18,
        fontSize: 17,
    },
    linkText: {
        fontFamily: "outfit",
        color: Colors.PRIMARY,
    },
    modalContainer: {
        backgroundColor: "white",
        paddingHorizontal: 28,
        paddingVertical: 36,
        borderRadius: 20,
        minHeight: 300,
        alignItems: "center",
    },
    modalTitle: {
        fontFamily: "outfit-bold",
        fontSize: 24,
        marginBottom: 8,
    },
    modalText: {
        fontFamily: "outfit",
        textAlign: "center",
        fontSize:18,
        marginBottom: 20,
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginTop: 5,
    },
    successImage: {
        width: 110,
        height: 110,
        alignSelf: "center",
        marginVertical: 20,
    },
    successTitle: {
        fontSize: 24,
        fontFamily: "outfit-bold",
        textAlign: "center",
    },
    successText: {
        fontSize: 16,
        color: Colors.GRAY,
        fontFamily: "outfit",
        textAlign: "center",
        marginTop: 10,
    }
});

export default SignUp;
