import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Post({data}) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{data.tenUngVien}</Text>
      <Text style={styles.title}>{data.id}</Text>
      <Text style={styles.title}>{data.email}</Text>
      <Text style={styles.title}>{data.diaChi}</Text>
      <Text style={styles.title}>{data.maUngVien}</Text>
      <Text style={styles.body}>{data.moTaKinhNghiem}</Text>
      <View style={styles.hr}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  title: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  body: {
    fontSize: 14,
    color: 'gray',
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 12,
  },
});
