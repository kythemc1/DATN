import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet, Text, TouchableOpacity, View

} from "react-native";
import HeaderChat from "Components/Commons/HeaderChat";
import { useRoute } from "@react-navigation/native";
import { Colors } from "react-native-ui-lib";
import Mock from "Utils/Mock";
import RenderListTuVung from "Components/RenderListTuVung";
import { API } from "Configs/Constants/API";
import axios from "axios";
import Swiper from "react-native-swiper";

export default function GrammarDetails({ navigation }: any) {
  const Voca_N3_1 = Mock.VocaN3_1;
  const route = useRoute();
  const [lists, setLists] = useState([]);
  let api: string;
  // @ts-ignore
  const { level, cate, name, page } = route.params;
  if (cate == "Grammar") {
    switch (level) {
      case "N1":
        api = API.API_GET_GRAMMAR_N1;
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
  useEffect(() => {
    axios.get(api)
      .then(response => {
        if (response.data != null) {
          setLists(response.data);
          console.log(response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderChat navigation={navigation} screenBack={"TabNavigation"} />
      <View>
        <View>
          <View>
            <Text style={styles.textTittle}>Bài 1</Text>
          </View>
        </View>
        <View>
          <FlatList
            data={Voca_N3_1}
            renderItem={({ item }) => <RenderListTuVung state={item} />}
            keyExtractor={item => item.Kanji}
            horizontal
            snapToInterval={Dimensions.get("window").width} // Đặt khoảng cách giữa các điểm dừng bằng chiều rộng màn hình
            snapToAlignment="center" // Căn giữa các thẻ khi dừng lại
            decelerationRate="fast" // Tăng tốc độ dừng lại của thẻ
            showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
          />
          {/* {lists.map(({example, grammar, means}, index)=>(
                        <RenderListTuVung state={{
                            Kanji: example,
                                Hiragana: grammar,
                            Meaning: means
                        }} key={index}></RenderListTuVung>
                    ))} */}
        </View>
      </View>
      <TouchableOpacity style={{
        height: 40,
        width: 120,
        backgroundColor: "#a4846d",
        borderRadius: 10,
        justifyContent: "center",
        alignSelf: "center"
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
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
