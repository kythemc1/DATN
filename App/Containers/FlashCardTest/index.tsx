import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  Dimensions,
  FlatList,
  StyleSheet, Text, TouchableOpacity, View

} from "react-native";
import HeaderChat from "Components/Commons/HeaderChat";
import { Colors } from "react-native-ui-lib";
import Mock from "Utils/Mock";
import ListQuiz from "Components/ListQuiz";


export default function FlashCardTest({ navigation, data }: any) {
  const Voca_N3_1 = Mock.VocaN3_1;

  const [countdown, setCountdown] = useState(3);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {

    if (countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (countdown === 0) {
      createQuiz(Voca_N3_1,10)
      setIsQuizStarted(true);
      const startTime = Date.now();
      const id = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      setIntervalId(id);
    }
  }, [countdown]);

  const handleEndQuiz = () => {
    if (intervalId) clearInterval(intervalId);
    setIsQuizStarted(false);
  };

  const questions: { question: string; options: string[]; answer: string }[] = [];
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };
  type Vocabulary = {
    Kanji: string;
    Hiragana: string;
    Meaning: string;
  };
  const createQuiz = (data: Vocabulary[], numberOfQuestions: number) => {

    const usedIndices = new Set<number>();

    while (questions.length < numberOfQuestions) {
      const questionIndex = getRandomInt(data.length);
      if (usedIndices.has(questionIndex)) continue;

      const questionItem = data[questionIndex];
      const { Kanji, Meaning } = questionItem;
      usedIndices.add(questionIndex);

      const options = new Set<string>();
      options.add(Meaning);

      while (options.size < 4) {
        const optionIndex = getRandomInt(data.length);
        options.add(data[optionIndex].Meaning);
      }

      const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);

      questions.push({
        question: `Nghĩa của từ '${Kanji}' là gì?`,
        options: shuffledOptions,
        answer: Meaning
      });
    }


  };


  return (
    <SafeAreaView style={styles.container}>
      <HeaderChat navigation={navigation} screenBack={"TabNavigation"} />
      {countdown > 0 ? (
        <Text style={styles.countdownText}>{countdown}</Text>
      ) : (
        <View style={styles.quizContainer}>
          {/*<Text style={styles.timerText}>Thời gian: {timeElapsed} giây</Text>*/}
          {/*{isQuizStarted && (*/}
          {/*  <TouchableOpacity style={styles.button} onPress={handleEndQuiz}>*/}
          {/*    <Text style={styles.buttonText}>Kết thúc</Text>*/}
          {/*  </TouchableOpacity>*/}
          {/*)}*/}
          <View>
            {
              questions.map((item,index)=>(
                <ListQuiz key={index} state={{question:item.question,options:item.options,answer:item.answer}}></ListQuiz>
              ))
            }
          </View>

        </View>
      )}
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


