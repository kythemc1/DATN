import {
  Dimensions, Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState } from "react";
import { Colors } from "react-native-ui-lib";

interface props {
  name: string;
  navigation: any;
  page: number;
  level: string;
  cate: string;
  pressToScreen: string;
}

export default function ComponentOnpressShowList(props: props) {
  return (
    <View style={styles.container}>
      <View>
        <Image style={{ height: 80, width: 80, marginLeft: 15 }}
               source={require("../../Assets/Images/book.png")}></Image>
      </View>

      <View style={{ justifyContent: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>Bài: {props.page}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{}}>Level: </Text>
          <Text>{props.level}</Text>
        </View>
      </View>
      <TouchableOpacity style={{ justifyContent: "center", marginLeft: 130 }} onPress={() => {
        props.navigation.navigate(props.pressToScreen, {
          level: props.level,
          name: props.name,
          cate: props.cate,
          page: props.page
        });
      }}>
        <Image style={{ height: 30, width: 30, marginLeft: 15 }}
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
    // marginBottom: 20,
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 2
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
