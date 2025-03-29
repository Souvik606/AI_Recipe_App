import {ActivityIndicator, Modal, View, Text, StyleSheet} from "react-native";
import Colors from "@/services/Colors";

const LoadingDialog=({visible=false,text='Loading....'}:any)=>{
    return(
        <Modal transparent visible={visible}>
            <View style={styles.overlay}>
                <View style={{
                    padding:20,
                    borderRadius:15,
                    backgroundColor:Colors.PRIMARY,
                    alignItems:'center'
                }}>
                <ActivityIndicator size={"large"} color={Colors.WHITE} />
                <Text style={styles.text}>{text}</Text>
                </View>
            </View>
        </Modal>
    )
}

const styles=StyleSheet.create({
    overlay:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#00000070',
    },
    text:{
        marginTop:10,
        color:Colors.WHITE,
        fontSize:16,
        fontFamily:'outfit'
    }
})

export default LoadingDialog