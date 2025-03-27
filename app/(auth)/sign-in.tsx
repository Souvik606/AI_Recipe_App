import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Colors from "@/services/Colors";
import HeaderImage from "@/assets/images/food-signin.jpg"
import {useCallback, useState} from "react";
import InputField from "@/components/InputField";
import {Link, router} from "expo-router";
import email from '@/assets/icons/email.png'
import lock from '@/assets/icons/lock.png'
import {useSignIn} from "@clerk/clerk-expo";

const SignIn=()=>{
    const { signIn, setActive, isLoaded } = useSignIn();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const onSignInPress = useCallback(async () => {
        if (!isLoaded) return;

        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            });

            if (signInAttempt.status === "complete") {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace("/(root)/(tabs)/home");
            } else {
                console.log(JSON.stringify(signInAttempt, null, 2));
                Alert.alert("Error", "Log in failed. Please try again.");
            }
        } catch (err: any) {
            console.log(JSON.stringify(err, null, 2));
            Alert.alert("Error", err.errors[0].longMessage);
        }
    }, [isLoaded, form]);

    return(
        <ScrollView style={{
            flex: 1,
            backgroundColor:Colors.WHITE,
        }}>
            <View style={{
                flex: 1,
                backgroundColor:Colors.WHITE,
            }}>
                <Image style={styles.header} source={HeaderImage}></Image>
                <Text style={styles.headerText}>Log in to your account</Text>
                <View style={{
                    paddingHorizontal:15,
                    paddingVertical:25}
                }>
                    <InputField
                        label="Email"
                        placeholder="Enter email"
                        textContentType="emailAddress"
                        value={form.email}
                        icon={email}
                        labelStyle={{marginLeft:20}}
                        onChangeText={(value) => setForm({ ...form, email: value })}
                    />

                    <InputField
                        label="Password"
                        placeholder="Enter password"
                        value={form.password}
                        icon={lock}
                        textContentType="password"
                        secureTextEntry={true}
                        labelStyle={{marginLeft:20}}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                    />

                    <TouchableOpacity style={styles.button} onPress={onSignInPress}>
                        <Text style={{
                            textAlign:'center',
                            color:Colors.WHITE,
                            fontSize:20,
                            fontFamily:'outfit-bold',
                            marginTop:5
                        }}>
                            Login 🔑
                        </Text>
                    </TouchableOpacity>
                    <Link href="/sign-up" style={styles.linkStyle}>
                        New to Tastopia?{" "}
                        <Text style={{
                            fontFamily:'outfit',
                            color:Colors.PRIMARY,
                        }}>Register</Text>
                    </Link>
                </View>

            </View>
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    header:{
        width:"100%",
        height:350
    },
    headerText: {
        fontFamily: "outfit-bold",
        fontSize: 27,
        textAlign:"center",
        marginTop:15,
    },
    button:{
        backgroundColor:Colors.PRIMARY,
        paddingVertical:10,
        paddingHorizontal:15,
        borderRadius:999,
        marginTop:22
    },
    linkStyle:{
        textAlign:'center',
        fontFamily:'outfit',
        marginTop:18,
        fontSize:17
    }
})
export default SignIn;