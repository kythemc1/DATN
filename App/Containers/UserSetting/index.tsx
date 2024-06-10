import React, { useState } from "react";
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "Store/reduxProvider";
import { useUser } from "Hooks/API/User";

export default function UserProfileView({ navigation }: any) {
  const username = useSelector((state: RootState) => state.auth.user?.username);
  const changePass = useSelector((state: RootState) => state.auth.noti?.changePass);
  const changePassFalse = useSelector((state: RootState) => state.auth.noti?.changePassFalse);


  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setNewShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isValid, setIsValid] = useState(true);
  const [isValidConfirm, setIsValidConfirm] = useState(true);

  const { changePassword } = useUser();

  const handleSubmit = () => {
    if (isValid && isValidConfirm) {
      // @ts-ignore
      changePassword({username, password, newPassword });
    }
  };


  const validatePassword = (password: string) => {
    return password.length >= 6 && password.length <= 25;
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setIsValid(validatePassword(text));
  };

  const handleNewPasswordChange = (text: string) => {
    setNewPassword(text);
    setIsValid(validatePassword(text));
  };

  const checkConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    setIsValid(validatePassword(text));
    if (text === newPassword) {
      setIsValidConfirm(true);
    } else setIsValidConfirm(false);
  };


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
          Đổi mật khẩu
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
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Welcome</Text>
            <Text style={styles.userInfo}>{username}</Text>
          </View>
          <View>
            <Image
              style={styles.avatar}
              source={require("../../Assets/Images/background.jpg")}
            />
          </View>
        </View>

      </View>
      <View style={styles.body}>
        <ScrollView>
          <Pressable style={styles.RectangleShapeView}>
            <Text style={styles.headtText}>Email</Text>
            <Text style={styles.SubjectText}>aemanucians@gmail.com </Text>
          </Pressable>
          <Pressable style={styles.RectangleShapeView}>
            <Text style={styles.headtText}>Nhập mật khẩu hiện tại</Text>
            <TextInput onChangeText={handlePasswordChange}
                       value={password}
                       secureTextEntry={!showPassword} style={styles.SubjectText}></TextInput>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image style={{ height: 24, width: 24 }}
                     source={showPassword ? require("../../Assets/Images/view.png") : require("../../Assets/Images/hide.png")} />
            </TouchableOpacity>
          </Pressable>
          <Pressable style={styles.RectangleShapeView}>
            <Text style={styles.headtText}>Mật Khẩu mới</Text>
            <TextInput onChangeText={handleNewPasswordChange}
                       value={newPassword} secureTextEntry={!showNewPassword} style={styles.SubjectText}></TextInput>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setNewShowPassword(!showNewPassword)}
            >
              <Image style={{ height: 24, width: 24 }}
                     source={showNewPassword ? require("../../Assets/Images/view.png") : require("../../Assets/Images/hide.png")} />
            </TouchableOpacity>
          </Pressable>
          <Pressable style={styles.RectangleShapeView}>
            <Text style={styles.headtText}>Xác nhận mật khẩu</Text>
            <TextInput onChangeText={checkConfirmPassword}
                       value={confirmPassword} secureTextEntry={!showConfirmPassword}
                       style={styles.SubjectText}></TextInput>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Image style={{ height: 24, width: 24 }}
                     source={showConfirmPassword ? require("../../Assets/Images/view.png") : require("../../Assets/Images/hide.png")} />
            </TouchableOpacity>
          </Pressable>
          {!isValid && <Text style={styles.errorText}>Mật khẩu phải có độ dài từ 6 đến 25 ký tự</Text>}
          {!isValidConfirm && <Text style={styles.errorText}>Mật khẩu xác nhận không đúng</Text>}
          {changePassFalse && <Text style={styles.errorText}>Đổi mật khẩu không thành công</Text>}
          {changePass && <Text style={styles.successText}>Đổi mật khẩu thành công</Text>}
          <View>
            <TouchableOpacity onPress={
              handleSubmit} style={styles.btn}>
              <Text style={styles.textBtn}>Update</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", marginTop: 24 },
  header: {
    backgroundColor: "#e7eff6",
    backgroundSize: "contain",
    height: 200
  },

  headerContent: {
    padding: 30,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10
  },
  location: {
    borderColor: "red",
    width: 10,
    height: 10
  },
  hamburger: {
    borderColor: "white",
    width: 10,
    height: 10
  },
  name: {
    fontSize: 22,
    color: "black",
    // fontWeight: "600",
    fontFamily: "Helvetica"
  },
  headtText: {
    fontFamily: "Helvetica",
    color: "grey",
    // fontWeight: "600",
    marginLeft: 20,
    marginTop: 10
  },
  SubjectText: {
    color: "black",
    // fontWeight: "550",
    fontSize: 16,
    fontFamily: "Helvetica",
    marginLeft: 20
    // marginTop: 10
  },
  userInfo: {
    fontSize: 20,
    color: "black"
    // fontWeight: "600"
  },
  btn: {
    marginTop: 20,
    backgroundColor: "#3B525F",
    borderRadius: 10,
    width: 200,
    height: 50,
    alignItems: "center",
    padding: 6,
    elevation: 3,
    alignSelf: "center"
  },
  body: {
    backgroundColor: "white",
    // height: 500,
    alignItems: "center",
    flex: 1
  },
  text: {
    color: "black",
    margin: 10
  },
  textBtn: {
    color: "white",
    margin: 10
  },
  RectangleShapeView: {
    marginTop: 20,
    width: 300,
    height: 80,
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    elevation: 3,
    alignSelf: "center",
    position: "relative"
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginTop: 35
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
