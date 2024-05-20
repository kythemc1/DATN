import React from 'react';
import WebView from 'react-native-webview';
import HeaderChat from 'Components/Commons/HeaderChat';
import {View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {red} from "react-native-reanimated/lib/typescript/reanimated2/Colors";
export default function Dic({navigation}: any) {
  return (
    <SafeAreaView style={{flex:1,backgroundColor: "white"}}>
      <HeaderChat screenBack={'TabNavigation'} navigation={navigation} />
      <WebView
        source={{
          uri: 'https://translate.google.com/?hl=vi&sl=ja&tl=vi&op=translate',
        }}
        style={{flex: 10}}
      />
    </SafeAreaView>
  );
}
