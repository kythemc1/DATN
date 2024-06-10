import React from 'react';
import {Image, View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'react-native-ui-lib';
import {SafeAreaView} from "react-native-safe-area-context";
import { useUser } from "Hooks/API/User";
import { useAuth } from "Hooks/API/Auth";

export default function More({navigation}: any) {
  const { onLogout } = useAuth();

  const renderRowItem = (iconLeft: any, title: string, onPress: () => void) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          height: 60,
          width: '100%',
          backgroundColor: '#fff',
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={iconLeft}
            style={{width: 40, height: 40, marginRight: 10}}
          />
          <Text style={{fontSize: 18, color : Colors.text}}>{title ? title : ''}</Text>
        </View>
        <Image
          source={require('../../Assets/Images/arrow-right.png')}
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    );
  };
  return (
      <SafeAreaView style={styles.container}>
          {/*<Header navigation={navigation} />*/}

              <ScrollView>
                  <Text
                      style={{
                          paddingHorizontal: 10,
                          paddingVertical: 20,
                          fontWeight: 'bold',
                          color: Colors.text,
                          fontSize: 18,
                      }}>
                      Cài đặt
                  </Text>
                  {renderRowItem(
                      require('../../Assets/Images/change_password.png'),
                      'Đổi mật khẩu người dùng',
                      () => {
                          navigation.navigate('UserProfileView');
                      },
                  )}
                  <Text
                      style={{
                          paddingHorizontal: 10,
                          paddingVertical: 20,
                          fontWeight: 'bold',
                          color: Colors.text,
                          fontSize: 18,
                      }}>
                      Khác
                  </Text>
                  {/*{renderRowItem(*/}
                  {/*    require('../../Assets/Images/info.png'),*/}
                  {/*    'Scan Image',*/}
                  {/*    () => {*/}
                  {/*        navigation.navigate('ScanImage');*/}
                  {/*    },*/}
                  {/*)}*/}
                  {renderRowItem(
                      require('../../Assets/Images/policy.png'),
                      'Từ điển',
                      () => {
                          navigation.navigate('Dic');
                      },
                  )}
                {renderRowItem(
                  require('../../Assets/Images/undo.png'),
                  'Đăng xuất',
                  () => {
                    onLogout()
                  },
                )}
              </ScrollView>

      </SafeAreaView>

  );
}
const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#f9f4f4',
        flex: 1,
    },
});
