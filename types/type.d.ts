import { TextInputProps, StyleProp, TextStyle, ViewStyle, ImageStyle } from "react-native";

declare interface InputFieldProps extends TextInputProps {
    label: string;
    icon?: any;
    secureTextEntry?: boolean;
    labelStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    iconStyle?: StyleProp<ImageStyle>;
    className?: string;
}

declare interface Categories{
    category_id: any;
    category_name: string;
    image_url: string;
}