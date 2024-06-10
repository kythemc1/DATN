import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  TouchableOpacity, Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import YouTubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import { Colors } from "react-native-ui-lib";
import { useRoute } from "@react-navigation/native";
import ListenAndRead from "Components/ListenAndRead";

interface value {
  time : number,
  content : string[]
}


export default function ListenDetails({ navigation }: any) {
  const route = useRoute();
  // @ts-ignore
  const { level, id, url, name, script } = route.params;

  const [scripts,setScripts] = useState<value[]>([])
  useEffect(() => {
    console.log(script);
    setScripts(convertScriptArray(script))
  }, []);

  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);
  const togglePlaying = useCallback(() => {
    console.log(scripts);
    setPlaying(prev => !prev);
  }, []);
  const playerRef = useRef<YoutubeIframeRef>(null);

  function convertScriptArray(input: string): { time: number; content: string[] }[] {
    try {
      const parsedArray = JSON.parse(input);
      if (Array.isArray(parsedArray)) {
        return parsedArray;
      } else {
        throw new Error("Input is not a valid array.");
      }
    } catch (error) {
      console.error("Error parsing input:", error);
      return [];
    }
  }

  // @ts-ignore
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
          Nghe hiểu
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
      <View style={{padding : 10}}>
        <Text style={{textAlign:'center',color : '#2a4d69',fontSize: 14}}>Bài: {name}</Text>

      </View>
      <YouTubePlayer
        play={playing}
        videoId={url}
        height={250}
        width={Dimensions.get("window").width}
        onChangeState={onStateChange}
        ref={playerRef}
      />
      <TouchableOpacity style={styles.buttonPause} onPress={togglePlaying}>
        <Text style={styles.textPause}>Play / Pause</Text>
      </TouchableOpacity>

      <ScrollView>
        {scripts && scripts.map((items, index) => (
          <View style={styles.viewDetails} key={index}>
            <TouchableOpacity
              style={styles.buttonUnder}
              onPress={() => {
                playerRef.current?.seekTo(items.time, true);
              }}>
              <Text style={styles.textBtn}>Start : {items.time}</Text>
            </TouchableOpacity>
            <ListenAndRead content={items.content} />
          </View>
        ))}
      </ScrollView>


    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20
  },
  textPause: {
    color: "white",
    alignSelf: "center",
    marginTop: 9,
    fontFamily: "Poppins-Medium"
  },
  textBtn: {
    color: Colors.blue30,
    alignSelf: "center",
    marginTop: 9,
    fontFamily: "Poppins-Medium"
  },
  buttonGroup: {
    flexDirection: "row",
    alignSelf: "center"
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "center"
  },
  buttonText: {
    fontSize: 18,
    color: "blue"
  },
  buttonTextSmall: {
    fontSize: 15
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  player: {
    alignSelf: "stretch",
    marginVertical: 10
  },
  buttonBig: {
    height: 40,
    width: 100,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#143980",
    borderWidth: 1,
    alignSelf: "center",
    marginTop: 0
  },
  buttonPause: {
    height: 40,
    width: 100,
    backgroundColor: "#2a4d69",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 0
  },
  buttonUnder: {
    // height: 40,
    // width: 100,
    // backgroundColor: 'white',
    // borderRadius: 10,
    // borderColor: '#143980',
    // borderWidth: 1,
  },
  viewDetails: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.9,
    justifyContent: "space-between",
    marginLeft: Dimensions.get("window").width * 0.05,
    marginTop: 30
  }
});
