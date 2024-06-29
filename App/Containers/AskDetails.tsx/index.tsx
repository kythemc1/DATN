import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API, API_KEY_CHAT_BOT } from "Configs/Constants/API";

const logo = require("../../Assets/Images/2.jpg");
const API_URL = API.API_CHAT_BOT;
const YOUR_API_KEY = API_KEY_CHAT_BOT;

export default function AskDetails({ navigation }: any) {
  const [messages, setMessages] = useState([] as any);
  useEffect(() => {
    firstMessage();
  }, []);

  const firstMessage = () => {
    setMessages([
      {
        _id: 1,
        text: "Chào bạn",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Chatbot GPT",
          avatar: logo
        }
      }
    ]);
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages)
    );
    // @ts-ignore
    const value = messages[0].text;
    callApi(value);
  }, []);

  const callApi = async (value: string) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${YOUR_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-16k",
          messages: [
            {
              role: "system",
              content: "You are a helpful" +
                " assistant proficient" +
                " in teaching Japanese. " +
                "Your task is to assist the" +
                " user in learning Japanese " +
                "language effectively."
            },
            {
              role: "user",
              content: `${value}`
            }
          ],
          temperature: 0.7,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        return;
      }

      const data = await response.json();
      if (data) {
        const messageValue = data?.choices[0]?.message?.content;
        if (messageValue) {
          addNewMessage(messageValue);
        } else {
          console.error("No message content found in the response.");
        }
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const addNewMessage = (data: any) => {
    const value = {
      _id: Math.random(999999999999),
      text: data,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Chatbot GPT",
        avatar: logo
      }
    };

    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, value)
    );
  };

  const customtInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          borderTopColor: "#E8E8E8",
          borderTopWidth: 1,
          borderRadius: 20,
          borderColor: "blue"
          // height: 50,
          // marginBottom: 20
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          flex: 1,
          marginTop: 10
        }}>
          Hỏi và đáp
        </Text>
        <TouchableOpacity
          style={{ position: "absolute", marginLeft: 5, marginTop: 10 }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{ height: 20, width: 20 }}
            source={require("../../Assets/Images/left-chevron.png")}
          />
        </TouchableOpacity>
      </View>
      <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages: any) => onSend(messages)}
      renderInputToolbar={props => customtInputToolbar(props)}
      user={{
        _id: 1,
        avatar: logo
      }}
      keyboardShouldPersistTaps="never"
      textInputProps={styles.textInput}
    />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF" // Màu nền của InputToolbar
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    marginHorizontal: 8
  },
  textInput: {
    color: "black", // Đặt màu chữ là đen
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16
  }
});
