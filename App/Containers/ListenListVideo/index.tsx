import React, {useEffect, useState} from 'react';
import {
    StyleSheet, Text, View
} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderChat from "Components/Commons/HeaderChat";
import {useRoute} from "@react-navigation/native";
import {API} from "Configs/Constants/API";
import axios from "axios";
import ComponentPressToListen from "Components/ComponentPressToListen";

export default function ListenListVideo({navigation}: { navigation: any }) {
    const route = useRoute();
    const [lists, setLists] = useState([]);
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
    axios.get(api)
        .then(response => {
            if(response.data!=null){
                setLists(response.data);
                console.log(response.data)
            }
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
}, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: "#2a4d69" }}>
                <Text style={{
                    fontSize: 20,
                    color: "white",
                    textAlign: "center",
                    marginTop: 20,
                    marginBottom: 10,
                    fontWeight: "bold"
                }}>
                    {level} Nghe hiểu
                </Text>
            </View>
            {
                lists.map(({listenId, url}, index)=>(
                    <ComponentPressToListen key={index} name={'Listen'} navigation={navigation} id={listenId} level={level} url={url} pressToScreen={'ListenDetails'}/>
                ))
            }
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2a4d69',
        flex: 1,
    }
});
