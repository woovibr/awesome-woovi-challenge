import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const StepPayPix = ({ value, onNext, onBack }) => (
  <View style={styles.stepContainer}>
    <Text style={styles.title}>Detalhes do Pix</Text>
    <Text style={styles.detailText}>Valor: R$ {value}</Text>
    <Button title="Continuar" onPress={onNext} />
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
  detailText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default StepPayPix;
