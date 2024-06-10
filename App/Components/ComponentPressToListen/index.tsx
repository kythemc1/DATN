import {
    Dimensions, Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import React from 'react';
import {Colors} from 'react-native-ui-lib';
interface props {
    name: string;
    navigation : any;
    url : number;
    level : string;
    pressToScreen: string;
    id : number;
    script : string
}
export default function ComponentPressToListen(props: props) {
    return (
      <View style={styles.container}>
          <View style={{justifyContent:'center'}}>
              <Image style={{ height: 40, width: 40, marginLeft: 15 }}
                     source={require("../../Assets/Images/radio.png")}></Image>
          </View>

          <View style={{ justifyContent: "center", marginLeft   : 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>Bài: {props.name}</Text>
              <View style={{ flexDirection: "row" }}>
                  <Text style={{}}>Level: </Text>
                  <Text>{props.level}</Text>
              </View>
          </View>
          <TouchableOpacity style={{ justifyContent: "center", marginRight:10 }} onPress={() => {
              props.navigation.navigate(props.pressToScreen, {
                  level: props.level,
                  name: props.name,
                  id: props.id,
                  script : props.script,
                  url: props.url
              });
          }}>
              <Image style={{ height: 30, width: 30,marginRight:10 }}
                     source={require("../../Assets/Images/play-button.png")}></Image>
              <Text>Bắt đầu</Text>
          </TouchableOpacity>
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
        // padding: 10,
        // borderWidth: 1,
        width: Dimensions.get("window").width * 0.9,
        alignSelf: "center",
        borderRadius: 20,
        justifyContent: 'space-between',
        marginTop: 10,
        flexDirection: "row",
        backgroundColor: "white",
        padding: 2,
        height: 80
    },
    textTittle: {
        color: Colors.text,
        fontFamily: "Poppins-Regular",
        fontSize: 15,
        textAlign: "center"
    },
    pressShow: {
        padding: 10
    }
});
