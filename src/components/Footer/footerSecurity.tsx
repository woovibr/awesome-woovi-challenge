import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Logo from "../../assets/logo/logo.png"; 

const SecurityFooter = () => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.innerContainer}>
        <FontAwesome name="shield" size={30} color="#666" style={styles.shieldIcon} />
        <Text style={styles.securityText}>Pagamento 100% seguro via:</Text>
        <Image source={Logo} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    paddingTop: 25,
    opacity: 0.7
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    width: '90%', 
    maxWidth: 400,
  },
  shieldIcon: {
    marginRight: 8, 
  },
  securityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginRight: 8, 
    flex: 1, 
    textAlign: 'center', 
  },
  logo: {
    width: 80, 
    height: 24, 
    resizeMode: 'contain',
    tintColor: '#666',
  },
});

export default SecurityFooter;
