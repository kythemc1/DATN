import {View} from "react-native-ui-lib";
import ComponentOnpressShowList from "Components/ComponentOnpressShowList";
import {TabComponentVocabularyN1} from "Components/TabComponentVoca/indexN1";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "Configs/Constants/API";
import { ScrollView } from "react-native";

export const TabComponentVocabularyN3=({navigation} : any)=>{

  const [lists, setLists] = useState([]);
  const [countPage, setCountPage] = useState(1);

  useEffect(() => {
    getList();

  }, []);

  const getList = async () => {
    axios.get(`${API.API_GET_COUNT_VOCABULARY_BY_LEVEL}N3`)
      .then(response => {
        if (response.data != null) {
          console.log(response.data, "N1");

          const arr = [];
          for (let i = 1; i <= calculateTotalPages(response.data); ++i) {
            arr.push({ name: i, page: i });
          }

          // @ts-ignore
          setLists(arr);
        }

      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  };

  const calculateTotalPages = (totalItems: number) => {
    let x = Math.ceil(totalItems / 30);
    setCountPage(x);
    return x;
  };


  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {
          lists.map(({ name, page }, index) => (
            <ComponentOnpressShowList key={index} name={name} navigation={navigation} page={page} cate={"Vocabulary"}
                                      level={"N3"} pressToScreen={"GrammarDetails"}></ComponentOnpressShowList>))
        }

      </ScrollView>
    </View>
  );
};
