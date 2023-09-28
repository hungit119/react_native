import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const FormText = props => {
  const {placeholder, label, error} = props;
  return (
    <>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
      {props.textarea ? (
        <TextInput
          editable
          multiline
          numberOfLines={4}
          style={{...styles.input, borderColor: `${error ? 'red' : '#f0f0f0'}`}}
          {...props}
          placeholder={placeholder}
        />
      ) : (
        <TextInput
          style={{...styles.input, borderColor: `${error ? 'red' : '#f0f0f0'}`}}
          {...props}
          placeholder={placeholder}
        />
      )}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'black',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default FormText;
