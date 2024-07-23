import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CashbackText = ({ emoji = '', amount, message }) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {emoji} <Text style={styles.bold}>R$ {amount}</Text> {message}
    </Text>
    <View style={styles.triangle} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    width: '100%',
    backgroundColor: '#133A6F',
    borderRadius: 8,
    padding: 10,
    paddingRight: 30, 
    position: 'relative'
  },
  text: {
    fontSize: 14,
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  triangle: {
    position: 'absolute',
    right: 0, 
    top: '50%', 
    width: 0,
    height: 0,
    borderTopWidth: 20, 
    borderTopColor: 'transparent',
    borderBottomWidth: 20, 
    borderBottomColor: 'transparent',
    borderRightWidth: 20, 
    borderRightColor: '#fff', 
    transform: [{ translateY: -10 }], 
  },
});

export default CashbackText;
