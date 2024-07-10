import { Dimensions, StyleSheet, Text, View } from "react-native";

interface props {
    state: {grammar: string;example: string; means: string};
}

export default function (props: props) {
    return (
        <View style={styles.container}>
            <View style={{margin: 20,borderWidth: 5,height:Dimensions.get('window').height*0.6,borderRadius:20,borderColor:'#2a4d69',justifyContent:"center"}}>
                <Text style={styles.textHira}>{props.state?.grammar}</Text>
                <Text style={styles.textMeaning}>Ý Nghĩa: {props.state?.means}</Text>
                <Text style={styles.textMeaning}>Ví dụ: {props.state?.example}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width ,
        height: Dimensions.get('window').height*0.7,
        alignSelf: 'center',
        // padding :10,
        paddingBottom: 5,
        paddingTop: 5,
        justifyContent:"center",

    },
    textKanji: {
        color: '#2a4d69',
        fontSize: 90,
        alignSelf:"center",
        marginTop: 80,
        fontWeight:"bold"
    },
    textMeaning: {
        color: '#2a4d69',
        fontSize: 20,
        alignSelf:"center",
        marginTop: 80
    },
    textHira: {
        color: '#2a4d69',
        fontSize:30,
        alignSelf:"center",
        marginTop: 20

    },
});
