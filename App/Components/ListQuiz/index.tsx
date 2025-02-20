import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import {Colors} from 'react-native-ui-lib';

interface props {
  state: { question: string; options: string[]; answer: string };
}

export default function (props: props) {
  return (
    <View style={styles.container}>
      <View style={{margin: 20,borderWidth: 5,height:Dimensions.get('window').height*0.75,borderRadius:20,borderColor:'#a4846d',backgroundColor:'#f6ecdc',justifyContent:"center"}}>
        <View style={{flexDirection:"row", marginTop: 0, alignSelf:"center",}}>
          <Text style={styles.textHira}>{props.state?.question}</Text>

        </View>
        <View>
          {props.state.options.map(item =>(
            <View>
              <Text>{item}</Text>
            </View>)
          )}
        </View>
        <Text style={styles.textKanji}>{props.state?.Kanji}</Text>
        <Text style={styles.textMeaning}>{props.state?.Meaning}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width ,
    height: Dimensions.get('window').height*0.8,
    alignSelf: 'center',
    // padding :10,
    paddingBottom: 5,
    paddingTop: 5,
    justifyContent:"center",

  },
  textKanji: {
    color: '#a4846d',
    fontSize: 90,
    alignSelf:"center",
    marginTop: 80,
    fontWeight:"bold"
  },
  textMeaning: {
    color: '#a4846d',
    fontSize: 20,
    alignSelf:"center",
    marginTop: 80
  },
  textHira: {
    color: Colors.text,
    color: '#a4846d',
    fontSize:30,
  },
});
