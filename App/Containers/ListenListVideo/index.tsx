import React, {useEffect, useState} from 'react';
import {
    Image,
    ScrollView,
    StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from "@react-navigation/native";
import {API} from "Configs/Constants/API";
import axios from "axios";
import ComponentPressToListen from "Components/ComponentPressToListen";
import CommonPagination from "Components/Commons/CommonPagition";

export default function ListenListVideo({navigation}: { navigation: any }) {
    const route = useRoute();
    const [lists, setLists] = useState([]);
    const [currentPage,setCurrentPage] =useState(1)
    const [recordPerPage,setRecordPerPage]= useState(10)
    const [countPage,setCountPage] = useState(1)
    let api: string;
    //@ts-ignore
    const {level} = route.params;
    switch (level){
        case 'N1': api = API.API_GET_LISTEN_N1;break;
        case 'N2': api = API.API_GET_LISTEN_N2;break;
        case 'N3': api = API.API_GET_LISTEN_N3;break;
        case 'N4': api = API.API_GET_LISTEN_N4;break;
        case 'N5': api = API.API_GET_LISTEN_N5;break;
    }
    useEffect(() => {
        getList();
    }, []);


    const getList = async ()=>{
        axios.get( `${api}${currentPage}`)
          .then(response => {
              if(response.data!=null){
                  console.log(response.data.listResult)
                  setLists(response.data.listResult);
                  calculateTotalPages(response.data.totalRecord)
              }
          })
          .catch(error => {
              console.error('Error fetching data: ', error);
          });
    }

    const calculateTotalPages = (totalItems: number) => {
        let x= Math.ceil(totalItems / 10);
        setCountPage(x)
    };

    const setInfoPage = (page: number)=>{
        setCurrentPage(page)
        setRecordPerPage(10)}

    const handleChangePage=async (page: number)=>{
        setInfoPage(page)
        await getList()
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                backgroundColor: "white",
                paddingBottom: 20,
                flexDirection: "row",
                position: "relative",
            }}>
                <Text style={{
                    fontSize: 20,
                    marginLeft: 20,
                    color: "#2a4d69",
                    fontWeight: "bold",
                    textAlign: "center",
                    flex: 1,
                    marginTop: 10
                }}>
                    Nghe hiểu
                </Text>
                <TouchableOpacity
                  style={{ position: "absolute", marginLeft: 5, marginTop: 15 }}
                  onPress={() => {
                      navigation.goBack();
                  }}>
                    <Image
                      style={{ height: 20, width: 20 , marginLeft : 5}}
                      source={require("../../Assets/Images/icons-back2.png")}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView>
                {
                    lists.map(({listenId, url,script,nameVideo}, index)=>(
                      <ComponentPressToListen key={index} name={nameVideo} navigation={navigation} id={listenId} level={level} url={url} pressToScreen={'ListenDetails'} script={script}/>
                    ))
                }
            </ScrollView>
            <View style={{justifyContent:'flex-end'}}>
                <CommonPagination currentPage={currentPage} itemsPerPage={recordPerPage} onPageChange={handleChangePage} totalPages={countPage}/>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {

        flex: 1,
    }
});
