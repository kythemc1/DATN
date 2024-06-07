import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

interface props {
  state: {word: string; hiragana: string; means: string};
}

export default function (props: props) {
  return (
    <View style={styles.container}>
      <View style={{margin: 20,borderWidth: 5,height:Dimensions.get('window').height*0.6,borderRadius:20,borderColor:'#2a4d69',justifyContent:"center"}}>
        <View style={{flexDirection:"row", marginTop: 0, alignSelf:"center",}}>
          <Text style={styles.textHira}>{props.state?.hiragana}</Text>
          <Image style={{height:20,width:25,top:10,left:20}} source={require('../../Assets/Images/volumepng.png')}></Image>
        </View>
          <Text style={styles.textKanji}>{props.state?.word}</Text>
        <Text style={styles.textMeaning}>{props.state?.means}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width ,
    height: Dimensions.get('window').height*0.7,
    alignSelf: 'center',
    // padding :10,
    paddingBottom: 5,
    paddingTop: 5,
    justifyContent:"center",

  },
  textKanji: {
    color: '#2a4d69',
    fontSize: 90,
    alignSelf:"center",
    marginTop: 80,
    fontWeight:"bold"
  },
  textMeaning: {
    color: '#2a4d69',
    fontSize: 20,
    alignSelf:"center",
    marginTop: 80
  },
  textHira: {
    color: '#2a4d69',
    fontSize:30,
  },
});
