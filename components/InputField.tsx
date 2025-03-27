import {
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    StyleSheet,
} from "react-native";

import { InputFieldProps } from "@/types/type";

const InputField = ({
                        label,
                        icon,
                        secureTextEntry = false,
                        labelStyle,
                        containerStyle,
                        inputStyle,
                        iconStyle,
                        ...props
                    }: InputFieldProps) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.wrapper, containerStyle]}>
                    <Text style={[styles.label, labelStyle]}>{label}</Text>
                    <View style={styles.inputContainer}>
                        {icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
                        <TextInput
                            style={[styles.input, inputStyle]}
                            secureTextEntry={secureTextEntry}
                            {...props}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 10,
        width: "100%",
    },
    label: {
        fontSize: 18,
        fontFamily: "outfit",
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#f5f5f5",
        paddingHorizontal: 16,
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft:5,
        marginRight:10,
    },
    input: {
        flex: 1,
        fontSize: 15,
        fontFamily: "outfit-bold",
        paddingVertical: 12,
        textAlign: "left",
    },
});

export default InputField;
