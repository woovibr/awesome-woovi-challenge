import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import SuccessIcon from "../../assets/images/success.png"
import CustomButton from '../Button/Button';
import { useNavigation } from '@react-navigation/native';

const SuccessScreen = () => {
    const navigation = useNavigation()
  const handleBackToHome = () => {
    navigation.navigate('extract'); 
  };

  return (
    <View style={styles.container}>
      <Image source={SuccessIcon} style={styles.icon} />
      <Text style={styles.successText}>Sucesso</Text>
      <Text style={styles.infoText}>Seu pagamento foi realizado com sucesso!</Text>
      <CustomButton
            title="Visualizar extrato"
            onPress={() => handleBackToHome()}
            backgroundColor="#03D69D"
            borderColor="#03D69D"
            borderRadius={12}
            paddingVertical={16}
            paddingHorizontal={32}
            textColor="#fff"
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50', 
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default SuccessScreen;
