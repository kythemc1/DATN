import { View } from "react-native-ui-lib";
import ComponentOnpressShowList from "Components/ComponentOnpressShowList";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "Configs/Constants/API";
import { ScrollView } from "react-native";

export const TabComponentGrammarN1 = ({ navigation }: any) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getList();

  }, []);

  const getList = async () => {
    axios.get(`${API.API_GET_COUNT_VOCABULARY_BY_LEVEL}N1`)
      .then(response => {
        if (response.data != null) {
          console.log(response.data,"N1");
          const arr = [];
          for (let i = 1; i <= calculateTotalPages(response.data); ++i) {
            arr.push({name : i,page:i});
          }

          // @ts-ignore
          setLists(arr)
        }

      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  };

  const calculateTotalPages = (totalItems: number) => {
    return Math.ceil(totalItems / 30)
  };



  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {
          lists.map(({name,page}, index)=>(
            <ComponentOnpressShowList key={index} name={name} navigation={navigation} page={page} cate={"Grammar"}
                                      level={"N1"} pressToScreen={"GrammarDetails"}></ComponentOnpressShowList>          ))
        }

      </ScrollView>
    </View>
  );
};
