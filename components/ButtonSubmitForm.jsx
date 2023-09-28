import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const ButtonSubmitForm = ({title, submitting, onPress}) => {
  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : null}
      style={styles.container}>
      <Text style={styles.btn}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 40,
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingHorizontal: 12,
  },
  btn: {
    color: 'white',
    fontSize: 16,
  },
});

export default ButtonSubmitForm;
