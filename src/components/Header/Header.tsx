import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Logo from '../../assets/logo/logo.png'; // Ajuste o caminho conforme necessário

interface HeaderProps {
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBack }) => {
  return (
    <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
      <Image source={Logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    marginVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: '8%',
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  logo: {
    width: 120, 
    height: 40, 
    resizeMode: 'contain',
  },
});

export default Header;
