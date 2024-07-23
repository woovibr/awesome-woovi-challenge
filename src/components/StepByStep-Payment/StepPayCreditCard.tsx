import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const StepPayCreditCard = ({ onBack }) => (
  <View style={styles.stepContainer}>
    <Text style={styles.title}>Adicionar Dados do Cartão</Text>
    <TextInput placeholder="Número do cartão" style={styles.input} />
    <TextInput placeholder="Data de validade" style={styles.input} />
    <TextInput placeholder="Código de segurança" style={styles.input} />
    <Button title="Finalizar" onPress={() => alert('Pagamento finalizado')} />
    <Button title="Voltar" onPress={onBack} color="gray" />
  </View>
);

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default StepPayCreditCard;
