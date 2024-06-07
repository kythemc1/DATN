import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

interface props {
  state: {
    question: string; options: string[]; answer: string;
  };
  setScore: React.Dispatch<React.SetStateAction<number>>;
  onAnswer: () => void;
}

export default function(props: props) {
  const handlePress = (item: string, answer: string) => {
    if(item === answer) {
      props.setScore(prevScore => prevScore + 1)
    }
    props.onAnswer();
  };
  return (
    <View style={styles.container}>
      <View style={{
        margin: 20,
        borderWidth: 5,
        height: Dimensions.get("window").height * 0.6,
        borderRadius: 20,
        borderColor: "#a4846d",
        justifyContent: "center"
      }}>
        <View style={{ flexDirection: "row", marginTop: 0, alignSelf: "center" }}>
          <Text style={styles.textHira}>{props.state?.question}</Text>

        </View>
        <View>
          {props.state.options.map(item => (
            <TouchableOpacity style={{
              width: Dimensions.get("window").width * 0.7,
              backgroundColor: "white",
              height: 40,
              alignSelf: "center",
              marginTop: 20,
              borderRadius: 10,
              justifyContent: "center"
            }}
                              onPress={() => {
                                handlePress(item, props.state.answer);
                              }}
            >
              <Text style={{ fontSize: 20, marginLeft: 20, color:'#2a4d69' }}>{item}</Text>
            </TouchableOpacity>)
          )}
        </View>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.6,
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
    fontSize: 30
  }
});
