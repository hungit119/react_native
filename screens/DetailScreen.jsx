import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function DetailScreen({route}) {
  const [data, setdata] = useState({});
  const fetchData = async () => {
    try {
      await fetch(
        `http://kiemtra.stecom.vn:8888/api/ung-vien/LVM12345/${route.params.id}`,
      )
        .then(response => response.json())
        .then(result => {
          setdata(result);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.title}>Tên ứng viên : {data.tenUngVien}</Text>
      <Text style={styles.date}>Địa chỉ : {data.diaChi}</Text>
      <Text style={styles.content}>Mã ứng viên : {data.maUngVien}</Text>
      <Text style={styles.content}>Email : {data.email}</Text>
      <Text style={styles.content}>
        Mô tả kinh nghiệm : {data.moTaKinhNghiem}
      </Text>
      <Text style={styles.content}>Created at : {data.createdDate}</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    textAlign: 'right',
    fontStyle: 'italic',
    fontSize: 14,
    marginVertical: 6,
  },
  content: {
    color: '#333',
  },
});
