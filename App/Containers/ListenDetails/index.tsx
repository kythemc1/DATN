import Header from 'Components/Commons/Header/Header';
import React, {useRef, useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import YouTubePlayer, {YoutubeIframeRef} from 'react-native-youtube-iframe';
import {Colors} from 'react-native-ui-lib';
import HeaderChat from "Components/Commons/HeaderChat";
import {useRoute} from "@react-navigation/native";
import ListenAndRead from "Components/ListenAndRead";
import MOCK_DATA from "Utils/Mock";
interface type  {
  name : String,
  time : String
}

export default function ListenDetails({navigation}: any) {
  const route= useRoute();
  // @ts-ignore
  const {level,id,url,name}= route.params;
  function getYouTubeID(url :String) {
    const regExp = /^.*(?:youtu.be\/|v\/|vi?\/|u\/\w\/|embed\/|\?v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : '';
  }

  // let videoId = getYouTubeID(url);
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);
  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  const playerRef = useRef<YoutubeIframeRef>(null);


  const [videoTranslations, setVideoTranslations] = useState([]);
  const [videoId, setVideoId] = useState('');
  const [subtitles, setSubtitles] = useState([]);
// const list = []
//   interface type  {
//     name : String,
//     time : String
//   }
  // const fetchSubtitles = async () => {
  //   MOCK_DATA.dataa.map((item) =>{
  //
  //     list.push({
  //       time: item.transcriptSegmentRenderer.startTimeText.simpleText ,
  //       text: item.transcriptSegmentRenderer.snippet.runs[0].text
  //     })
  //   })
  //
  // setSubtitles(list)
  // };
  const mokData = {
    VideoId: '0zTjrsIWrC4',
    Name: 'Bạn có tài mà',
    level: 5,
    onStart: [
      {
        time: 0,
        content: [
          '―失礼ですが、お名前は？',
          '－イ―です',
          '－イさんですか',
          '－いいえ、－イですか',
        ],
      },
      {
        time: 9,
        content: [
          '―失礼ですが、お名前は？',
          '－イ―です',
          '－イさんですか',
          '－いいえ、－イですか',
        ],
      },
      {
        time: 19,
        content: [
          '―失礼ですが、お名前は？',
          '－イ―です',
          '－イさんですか',
          '－いいえ、－イですか',
        ],
      },
      {
        time: 32,
        content: [
          '―失礼ですが、お名前は？',
          '－イ―です',
          '－イさんですか',
          '－いいえ、－イですか',
        ],
      },
      {
        time: 44,
        content: [
          '―失礼ですが、お名前は？',
          '－イ―です',
          '－イさんですか',
          '－いいえ、－イですか',
        ],
      },
      {
        time: 59,
        content: [
          '―失礼ですが、お名前は？',
          '－イ―です',
          '－イさんですか',
          '－いいえ、－イですか',
        ],
      },
      {
        time: 73,
        content: [
          '―失礼ですが、お名前は？',
          '－イ―です',
          '－イさんですか',
          '－いいえ、－イですか',
        ],
      },
      {
        time: 87,
        content: [
          '―失礼ですが、お名前は？',
          '－イ―です',
          '－イさんですか',
          '－いいえ、－イですか',
        ],
      },
      {
        time: 69,
        content: [
          '―失礼ですが、お名前は？',
          '－イ―です',
          '－イさんですか',
          '－いいえ、－イですか',
        ],
      },
      {
        time: 79,
        content: [
          '―失礼ですが、お名前は？',
          '－イ―です',
          '－イさんですか',
          '－いいえ、－イですか',
        ],
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*<HeaderChat navigation={navigation} screenBack={'TabNavigation'} />*/}
      <YouTubePlayer
        play={playing}
        videoId={videoId}
        height={250}
        width={Dimensions.get('window').width * 1}
        onChangeState={onStateChange}
        ref={playerRef}
      />
      <TouchableOpacity style={styles.buttonPause} onPress={togglePlaying}>
        <Text style={styles.textPause}>Play / Pause</Text>
      </TouchableOpacity>

      <ScrollView>
        {mokData.onStart.map((items, index) => (
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
      <View>
        <Text>{subtitles}</Text>
      </View>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textPause: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 9,
    fontFamily: 'Poppins-Medium',
  },
  textBtn: {
    color: Colors.blue30,
    alignSelf: 'center',
    marginTop: 9,
    fontFamily: 'Poppins-Medium',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  buttonBig: {
    height: 40,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#143980',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 0,
  },
  buttonPause: {
    height: 40,
    width: 100,
    backgroundColor: '#2a4d69',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 0,
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
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.9,
    justifyContent: 'space-between',
    marginLeft: Dimensions.get('window').width * 0.05,
    marginTop: 30,
  },
});
