import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Colors from "@/services/Colors";
import HeaderImage from "@/assets/images/food.jpg"
import {useState} from "react";
import InputField from "@/components/InputField";
import {Link, router} from "expo-router";
import person from '@/assets/icons/person.png'
import email from '@/assets/icons/email.png'
import lock from '@/assets/icons/lock.png'

const SignUp=()=>{
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

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
                <Text style={styles.headerText}>Create Account</Text>
                <View style={{
                    paddingHorizontal:15}
                }>
                    <InputField
                        label="Name"
                        placeholder="Enter name"
                        value={form.name}
                        icon={person}
                        labelStyle={{marginLeft:20}}
                        onChangeText={(value) => setForm({ ...form, name: value })}
                    />

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

                    <TouchableOpacity style={styles.button}>
                        <Text style={{
                            textAlign:'center',
                            color:Colors.WHITE,
                            fontSize:20,
                            fontFamily:'outfit-bold',
                            marginTop:5
                        }}>
                            Register 🌟
                        </Text>
                    </TouchableOpacity>
                    <Link href="/sign-in" style={styles.linkStyle}>
                        Already have an account?{" "}
                        <Text style={{
                            fontFamily:'outfit',
                            color:Colors.PRIMARY,
                        }}>Log In</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    header:{
        width:"100%",
        height:300
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
export default SignUp;