import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

interface props {
  state: {
    question: string; options: string[]; answer: string;
  };

}

export default function(props: props) {

  return (
    <View style={styles.container}>
      <View style={{
        margin: 20,
        borderWidth: 5,
        height: Dimensions.get("window").height * 0.13,
        borderRadius: 20,
        borderColor: "#2a4d69",
        justifyContent: "center"
      }}>
        <View style={{ flexDirection: "row", marginTop: 0, alignSelf: "center" }}>
          <Text style={styles.textHira}>{props.state?.question}</Text>
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text style={{fontSize : 18,color : '#2a4d69'}}>Đáp án: {props.state.answer}
          </Text>
        </View>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.15,
    alignSelf: "center",
    // padding :10,
    paddingBottom: 5,
    paddingTop: 0,
    justifyContent: "center"

  },
  textKanji: {
    color: "#2a4d69",
    fontSize: 90,
    alignSelf: "center",
    marginTop: 80,
    fontWeight: "bold"
  },
  textMeaning: {
    color: "#2a4d69",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 80
  },
  textHira: {
    color: "#2a4d69",
    fontSize: 20
  }
});
