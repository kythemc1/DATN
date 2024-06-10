import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import React from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput
} from "react-native";
import { useUser } from "Hooks/API/User";
import { useSelector } from "react-redux";
import { RootState } from "Store/reduxProvider";

export default function ForgotPassword({ navigation }: any) {
  const { onSetAccountRegister, accountRegister, register } = useUser();
  const forgotPassword = useSelector((state: RootState) => state.auth.noti?.forgotPass);

  return (
    <View
      onTouchMove={Keyboard.dismiss}
      style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView>
        <View>
          <View>
            <Image
              style={styles.mLogo}
              source={require("../../Assets/Images/13610-logos_black.png")}
            />
            <Text
              style={styles.textLogo}>
              Nhật Ngữ 13610
            </Text>
          </View>
          <View>
            <Text
              style={styles.textSignIn}>
              Quên mật khẩu
            </Text>
            <View>
              <Text
                style={styles.textNormal}>
                Tên tài khoản
              </Text>
              <View
                style={{
                  position: "relative",
                  alignItems: "center",
                  marginBottom: 8
                }}>
                <TextInput
                  value={accountRegister.username}
                  onChangeText={(username: string) =>
                    onSetAccountRegister("username", username)
                  }
                  placeholder="Tên tài khoản"
                  placeholderTextColor={"grey"}
                  style={styles.input}
                />
              </View>
            </View>
            <View />

            <Text
              style={styles.textNormal}>
              Email
            </Text>
            <View
              style={{
                position: "relative",
                alignItems: "center",
                marginBottom: 8
              }}>
              <TextInput
                value={accountRegister.email}
                onChangeText={(email: string) =>
                  onSetAccountRegister("email", email)
                }
                placeholder="email"
                placeholderTextColor={"grey"}
                style={styles.input}
              />
            </View>
          </View>
          {forgotPassword && <Text style={styles.errorText}>Đổi mật khẩu thành công</Text>}

          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={() => {
              register(accountRegister);
            }}>
            <Text
              style={{
                fontSize: 15,
                color: "white",
                marginTop: 9,
                fontFamily: "Poppins-SemiBold"
              }}>
              Gửi mật khẩu về email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.buttonRegister, marginTop: 10 }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text
              style={{
                fontSize: 15,
                color: "white",
                marginTop: 9,
                fontFamily: "Poppins-SemiBold"
              }}>
              Quay Lại
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: "white",
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(20, 57, 128, 1)",
    color: "black"
  },
  mLogo: {
    alignSelf: "center",
    height: 100,
    width: 200,
    marginTop: 50
  },
  textLogo: {
    textAlign: "center",
    color: "black",
    fontFamily: "Poppins-Italic"
  },
  textSignIn: {
    fontSize: 30,
    marginTop: 50,
    marginLeft: Dimensions.get("window").width * 0.05,
    color: "rgba(20, 57, 128, 1)",
    fontFamily: "Poppins-SemiBold"
  },
  textNormal: {
    marginTop: 15,
    fontSize: 18,
    marginLeft: Dimensions.get("window").width * 0.05,
    color: "rgba(20, 57, 128, 1)",
    fontFamily: "Poppins-SemiBold"
  },
  buttonRegister: {
    marginTop: 20,
    width: Dimensions.get("window").width * 0.5,
    height: 50,
    borderWidth: 1,
    backgroundColor: "rgba(20, 57, 128, 1)",
    alignSelf: "center",
    borderRadius: 20,
    alignItems: "center"
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center"
  },
  successText: {
    color: "red",
    marginTop: 10,
    textAlign: "center"
  }
});
