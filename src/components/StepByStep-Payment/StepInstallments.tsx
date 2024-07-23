import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from '@/src/components/Themed';
import InfoBox from '../InfoBox/InfoBox';
import SecurityFooter from '../Footer/footerSecurity';

const totalValue = 10000;

const calculateInstallment = (total, installments) => {
  const interestRate = 0.05; // 5% de juros por parcela adicional
  const rate = 1 + (installments - 1) * interestRate;
  return (total / installments * rate);
};

const calculateTotalValue = (installments, installmentValue) => {
  return installments * installmentValue;
};

const formatCurrency = (value) => {
  return value
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&.')
    .replace('.', ',');
};

const cashbackDetails = {
  emoji: "🤑",
  amount: "300,00",
  message: "de volta no seu Pix na hora"
};

const ExtractScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.instruction}>
        Ivan, visualize os detalhes de sua transação
      </Text>
      
      {/* InfoBox para Pix */}
      <InfoBox
        numInstallments="1"
        installmentValue={`R$ ${formatCurrency(totalValue)}`}
        totalValue={`R$ ${formatCurrency(totalValue)}`}
        description="Descrição da compra"
        boxName="PIX"
        cashbackDetails={cashbackDetails}
      />

      {/* InfoBox para Pix Parcelado */}
      <InfoBox
        numInstallments="2"
        installmentValue={`R$ ${formatCurrency(calculateInstallment(totalValue, 2))}`}
        totalValue={`R$ ${formatCurrency(calculateTotalValue(2, calculateInstallment(totalValue, 2)))}`}
        description="Descrição da compra parcelada"
        boxName="Pix Parcelado"
      />

      {/* InfoBox para parcelas de 3x até 12x */}
      {Array.from({ length: 10 }, (_, i) => {
        const installments = i + 3; // De 3 a 12 parcelas
        const installmentValue = calculateInstallment(totalValue, installments);
        return (
          <InfoBox
            key={installments}
            numInstallments={`${installments}`}
            installmentValue={`R$ ${formatCurrency(installmentValue)}`}
            totalValue={`R$ ${formatCurrency(calculateTotalValue(installments, installmentValue))}`}
            description="Descrição da compra parcelada"
          />
        );
      })}

      <SecurityFooter />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 1,
    backgroundColor: '#ffffff',
  },
  instruction: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4D4D4D',
    marginBottom: 20,
  },
});

export default ExtractScreen;
