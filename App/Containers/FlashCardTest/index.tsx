import React, { useEffect, useRef, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  Dimensions,
  FlatList, Image,
  StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import { Colors } from "react-native-ui-lib";
import ListQuiz from "Components/ListQuiz";
import { useRoute } from "@react-navigation/native";

interface props {
  state: {
    question: string; options: string[]; answer: string;
  };
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function FlashCardTest({ navigation }: any) {
  const route = useRoute();
  const [score, setScore] = useState(0);
  const flatListRef = useRef<FlatList<props>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showScore,setShowScore] = useState(false);
  // @ts-ignore
  const { data, cate, level, page } = route.params;
  const convertCate = (category: string) => {
    if (category === "Vocabulary")
      return "Từ vựng";
    else if (category === "Grammar")
      return "Ngữ pháp";
  };

  const handleAnswer = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < data.length) {
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex });
    }
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
      <View style={{ marginTop: 20 }}>
        <Text style={styles.textTittle}>Level {level} Bài {page} </Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <ListQuiz onAnswer={handleAnswer} setScore={setScore} state={item} />}
        horizontal
        snapToInterval={Dimensions.get("window").width}
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToIndex({ index: currentIndex })}
      />
      <TouchableOpacity style={{
        height: 40,
        width: 120,
        backgroundColor: "#2a4d69",
        borderRadius: 10,
        justifyContent: "center",
        alignSelf: "center",
        marginBottom : 40
      }}
                        onPress={() => {
                          navigation.navigate("Result", {
                            data: data,
                            cate: cate,
                            level: level,
                            page: page,
                            score : score
                          });
                        }}>
        <Text style={{ color: "white", textAlign: "center" }}>Hoàn thành</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
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


