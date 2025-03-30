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

export interface Ingredient {
    icon: string;
    ingredient: string,
    quantity: string;
}

export interface Recipe {
    recipe_id: any;
    recipe_name: string;
    description: string;
    ingredients: Ingredient[];
    steps: string[];
    calories?: number;
    cook_time: number;
    serve_to: number;
    image_prompt?: string;
    image_url: string;
    category_id: any;
    user_id: any;
    category_name: string;
}