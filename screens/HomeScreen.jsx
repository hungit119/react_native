import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import Post from '../components/Post';

export default function HomeScreen({navigation}) {
  const [datas, setDatas] = useState([]);
  const fetchDatas = async () => {
    await fetch(
      'http://kiemtra.stecom.vn:8888/api/ung-vien/LVM12345/get-all?pageSize=5&pageIndex=1',
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setDatas(response.items);
      });
  };
  useEffect(() => {
    fetchDatas();
  }, []);
  return (
    <View style={styles.wrapper}>
      <View style={styles.search}>
        <TextInput style={styles.input} />
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.text}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {datas.map((data, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('Detail', {
                id: data.id,
              })
            }>
            <Post data={data} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  input: {
    flex: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
  },
  btn: {
    flex: 1,
    padding: 12,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
  content: {
    marginBottom: 12,
    padding: 6,
  },
});
