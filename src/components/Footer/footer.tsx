import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Logo from "../../assets/logo/logo.png"; 

export default function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.companyName}>Woovi</Text>
        <Text style={styles.phone}>Telefone: (11) 1234-5678</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 20,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  logo: {
    width: 50,
    height: 15,
  },
  textContainer: {
    flex: 3,
    alignItems: 'center',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  phone: {
    fontSize: 14,
    color: '#555',
  },
});
