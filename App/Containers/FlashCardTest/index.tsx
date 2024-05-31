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
import { useRoute } from "@react-navigation/native";
import RenderListTuVung from "Components/RenderListTuVung";


export default function FlashCardTest({ navigation }: any) {
  const route = useRoute();


  // @ts-ignore
  const { data } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <HeaderChat navigation={navigation} screenBack={"TabNavigation"} />
      {/*<TouchableOpacity onPress={() => {*/}
      {/*  createQuiz(Voca_N3_1, 10);*/}
      {/*}}>*/}
      {/*  <Text>Bắt đầu</Text>*/}
      {/*</TouchableOpacity>*/}
      {/*<View>*/}
      {/*  {*/}
      {/*    data?.map((item: { question: any; options: any; answer: any; }, index: React.Key | null | undefined) => (*/}
      {/*      <ListQuiz key={index}*/}
      {/*                state={{ question: item.question, options: item.options, answer: item.answer }}></ListQuiz>*/}
      {/*    ))*/}
      {/*  }*/}
      {/*</View>*/}

      <FlatList
        data={data}
        renderItem={({ item }) => <ListQuiz state={item} />}
        keyExtractor={item => item.Kanji}
        horizontal
        snapToInterval={Dimensions.get("window").width} // Đặt khoảng cách giữa các điểm dừng bằng chiều rộng màn hình
        snapToAlignment="center" // Căn giữa các thẻ khi dừng lại
        decelerationRate="fast" // Tăng tốc độ dừng lại của thẻ
        showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
      />
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


