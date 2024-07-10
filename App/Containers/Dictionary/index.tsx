import React from 'react';
import WebView from 'react-native-webview';
import HeaderChat from 'Components/Commons/HeaderChat';
import {SafeAreaView} from "react-native-safe-area-context";
import {Image, Text, TouchableOpacity, View} from "react-native";
export default function Dic({navigation}: any) {
  return (
    <SafeAreaView style={{flex:1,backgroundColor: "white"}}>
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
                Tra từ
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
        <WebView
        source={{
          uri: 'https://translate.google.com/?hl=vi&sl=ja&tl=vi&op=translate',
        }}
        style={{flex: 10}}
      />
    </SafeAreaView>
  );
}
