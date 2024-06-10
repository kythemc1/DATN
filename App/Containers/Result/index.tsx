import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  Dimensions, FlatList,
  Image, ScrollView,
  StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import { Colors } from "react-native-ui-lib";
import { useRoute } from "@react-navigation/native";
import RenderResult from "Components/RenderResult";
import ListQuiz from "Components/ListQuiz";


export default function Result({ navigation }: any) {
  const route = useRoute();

  // @ts-ignore
  const { score, cate, level, page,data } = route.params;
  const convertCate = (category: string) => {
    if (category === "Vocabulary")
      return "Từ vựng";
    else if (category === "Grammar")
      return "Ngữ pháp";
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        backgroundColor: "#2a4d69",
        paddingBottom: 20,
        flexDirection: "row",
        position: "relative"
      }}>

        <Text style={{
          fontSize: 20,
          marginLeft: 20,
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          flex: 1
        }}>
          {convertCate(cate)}
        </Text>
        <TouchableOpacity
          style={{ position: "absolute", marginLeft: 5, marginTop: 2 }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{ height: 20, width: 20 }}
            source={require("../../Assets/Images/left-chevron.png")}
          />
        </TouchableOpacity>

      </View>
      <Image
        style={{ height: 180, width: Dimensions.get('window').width }}
        source={require("../../Assets/Images/result.jpg")}
      />
      <View style={{ marginTop: 20 }}>
        <Text style={styles.textTittle}>Level {level} Bài {page} </Text>
      </View>
      <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "center" }}>
        <Text style={styles.textTittle}>Điểm: {score} /10</Text>
        <Image
          style={{ height: 40, width: 40, marginLeft: 5, marginTop: -5 }}
          source={require("../../Assets/Images/achievement.png")}
        />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <RenderResult state={item} />}
        keyExtractor={(item, index) => item.key}
        snapToInterval={Dimensions.get("window").width}
        decelerationRate="fast"
      />


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white",  },
  textTittle: {
    color: Colors.text,
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold"
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  },
  countdownText: {
    fontSize: 48,
    fontWeight: "bold"
  },
  quizContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  timerText: {
    fontSize: 24,
    marginBottom: 20
  },
  button: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18
  }
});


