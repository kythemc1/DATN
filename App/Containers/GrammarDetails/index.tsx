import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  Dimensions,
  FlatList, Image,
  StyleSheet, Text, TouchableOpacity, View

} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Colors } from "react-native-ui-lib";
import RenderListTuVung from "Components/RenderListTuVung";
import { API } from "Configs/Constants/API";
import axios from "axios";

export default function GrammarDetails({ navigation }: any) {
  const route = useRoute();
  const [lists, setLists] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const convertCate = (category: string) => {
    if (category === "Vocabulary")
      return "Từ vựng";
    else if (category === "Grammar")
      return "Ngữ pháp";
  };

  let api: string;
  // @ts-ignore
  const { level, cate, name, page } = route.params;
  if (cate == "Grammar") {
    switch (level) {
      case "N1":
        api = API.API_GET_VOCABULARY_N1;
        break;
      case "N2":
        api = API.API_GET_GRAMMAR_N2;
        break;
      case "N3":
        api = API.API_GET_GRAMMAR_N3;
        break;
      case "N4":
        api = API.API_GET_GRAMMAR_N4;
        break;
      case "N5":
        api = API.API_GET_GRAMMAR_N5;
        break;
    }
  } else {
    switch (level) {
      case "N1":
        api = API.API_GET_VOCABULARY_N1;
        break;
      case "N2":
        api = API.API_GET_VOCABULARY_N2;
        break;
      case "N3":
        api = API.API_GET_VOCABULARY_N3;
        break;
      case "N4":
        api = API.API_GET_VOCABULARY_N4;
        break;
      case "N5":
        api = API.API_GET_VOCABULARY_N5;
        break;
    }
  }

  const createQuiz = (data: Vocabulary[], numberOfQuestions: number) => {

    const usedIndices = new Set<number>();

    while (questions.length < numberOfQuestions) {
      const questionIndex = getRandomInt(data.length);
      if (usedIndices.has(questionIndex)) continue;

      const questionItem = data[questionIndex];
      const { word, means } = questionItem;
      usedIndices.add(questionIndex);

      const options = new Set<string>();
      options.add(means);

      while (options.size < 4) {
        const optionIndex = getRandomInt(data.length);
        options.add(data[optionIndex].means);
      }

      const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);

      questions.push({
        question: `Nghĩa của từ '${word}' là gì?`,
        options: shuffledOptions,
        answer: means
      });


    }
    setIsQuizStarted(true);
    console.log("question", questions);
  };
  const questions: { question: string; options: string[]; answer: string }[] = [];

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };
  type Vocabulary = {
    word: string;
    hiragana: string;
    means: string;
  };

  useEffect(() => {
    axios.get(`${api}${name}`)
      .then(response => {
        if (response.data != null) {
          setLists(response.data);
          console.log(response.data);
          console.log(`${api}${name}`, "`${api}${name}`");
        }
      })
      .catch(error => {
        console.error("Error fetching data: 12333", error);
      });
  }, []);
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
        <View>
          <Text style={styles.textTittle}>Level {level} Bài {page} </Text>
        </View>
        <View>
          <FlatList
            data={lists}
            renderItem={({ item }) => <RenderListTuVung state={item} />}
            keyExtractor={item => item}
            horizontal
            snapToInterval={Dimensions.get("window").width}
            snapToAlignment="center"
            decelerationRate="fast"
            // showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      <TouchableOpacity style={{
        height: 40,
        width: 120,
        backgroundColor: "#2a4d69",
        borderRadius: 10,
        justifyContent: "center",
        alignSelf: "center"
      }}
                        onPress={() => {
                          createQuiz(lists, 10);
                          navigation.navigate("FlashCardTest", {
                            data: questions,
                            cate: cate,
                            level: level,
                            page: page
                          });
                        }}>
        <Text style={{ color: "white", textAlign: "center" }}>Luyện tập</Text>
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
    // backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
