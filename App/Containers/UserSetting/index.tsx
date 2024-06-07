import React, { Component } from "react";
import { StyleSheet, Pressable, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "Store/reduxProvider";

export default function UserProfileView({ navigation }: any)  {
    const username = useSelector((state: RootState)=> state.auth.user?.username)
    const address = useSelector((state: RootState)=> state.auth.user?.address)
    const firstname = useSelector((state: RootState)=> state.auth.user?.firstName)
    const lastname = useSelector((state: RootState)=> state.auth.user?.lastName)


        return (
            <SafeAreaView style={styles.container}>
                <View style={{
                    backgroundColor: "#2a4d69",
                    paddingBottom: 20,
                    flexDirection: "row",
                    position: "relative",
                }}>
                    <Text style={{
                        fontSize: 20,
                        marginLeft: 20,
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        flex: 1
                    }}>
                        Thông tin người dùng
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
                    <ScrollView  >
                        <Pressable style={styles.RectangleShapeView}>
                            <Text style={styles.headtText}>Tên tài khoản</Text>
                            <Text style={styles.SubjectText}>{username}</Text>
                        </Pressable>
                        <Pressable style={styles.RectangleShapeView}>
                            <Text style={styles.headtText}>Email</Text>
                            <Text style={styles.SubjectText}>aemanucians@gmail.com </Text>
                        </Pressable>

                        <Pressable style={styles.RectangleShapeView}>
                            <Text style={styles.headtText}>Firstname</Text>
                            <Text style={styles.SubjectText}>{firstname}</Text>
                        </Pressable>
                        <Pressable style={styles.RectangleShapeView}>
                            <Text style={styles.headtText}>Lastname</Text>
                            <Text style={styles.SubjectText}>{lastname}</Text>
                        </Pressable>

                        <View>
                            <TouchableOpacity style={styles.btn}>
                                <Text style={styles.textBtn}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

            </SafeAreaView>
        );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white",marginTop:24 },
    header: {
        backgroundColor: '#e7eff6',
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
        marginBottom: 10,
    },
    location: {
        borderColor: "red",
        width: 10,
        height: 10,
    },
    hamburger: {
        borderColor: "white",
        width: 10,
        height: 10,
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
        marginLeft: 20,
        marginTop: 10
    },
    userInfo: {
        fontSize: 20,
        color: "black",
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
        alignSelf: "center"
    },

});
