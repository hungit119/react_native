/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import CreateScreen from './screens/CreateScreen';
import UpdateScreen from './screens/UpdateScreen';
const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  const handleClickDelete = (id, navigation) => {
    Alert.alert('Bạn có chắc chắn muốn xóa ?', 'Xác nhận xóa', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            await fetch(
              `http://kiemtra.stecom.vn:8888/api/ung-vien/LVM12345/${id}`,
              {
                method: 'DELETE',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              },
            )
              .then(response => response.json())
              .then(result => {
                return navigation.navigate('Home');
              });
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            title: 'Welcome',
            headerShown: true,
            headerTitle: props => (
              <View>
                <Text>Danh sách bài viết</Text>
              </View>
            ),
            headerRight: () => (
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                  <Text style={styles.plusBtn}>+</Text>
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({route, navigation}) => ({
            title: 'Detail',
            headerShown: true,
            headerTitle: props => (
              <View>
                <Text>Chi tiết bài viết</Text>
              </View>
            ),
            headerRight: () => (
              <>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      handleClickDelete(route.params.id, navigation);
                    }}>
                    <Text style={styles.delete}>Xóa bài viết</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      return navigation.navigate('Update', {
                        id: route.params.id,
                      });
                    }}>
                    <Text style={styles.delete}>Sửa bài viết</Text>
                  </TouchableOpacity>
                </View>
              </>
            ),
          })}
        />
        <Stack.Screen
          name="Create"
          component={CreateScreen}
          options={{
            title: 'Create',
            headerShown: true,
            headerTitle: props => (
              <View>
                <Text>Thêm mới bài viết</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateScreen}
          options={({navigation}) => ({
            title: 'Update',
            headerShown: true,
            headerTitle: props => (
              <View>
                <Text>Update bài viết</Text>
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  plusBtn: {
    fontSize: 28,
  },
  delete: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginLeft: 6,
  },
});

export default App;
