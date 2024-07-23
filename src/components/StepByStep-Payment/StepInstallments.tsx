import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from '@/src/components/Themed';
import InfoBox from '../InfoBox/Infobox';
import SecurityFooter from '../Footer/footerSecurity';
import CustomButton from '../Button/Button';

const totalValue = 10000;

const calculateInstallment = (total, installments) => {
  const interestRate = 0.05;
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

const ExtractScreen = ({ onNext }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.instruction}>
        Ivan, visualize os detalhes de sua transação
      </Text>

      <InfoBox
        numInstallments="1"
        installmentValue={`R$ ${formatCurrency(totalValue)}`}
        totalValue={`R$ ${formatCurrency(totalValue)}`}
        description="Descrição da compra"
        boxName="PIX"
        cashbackDetails={cashbackDetails}
      />

      <InfoBox
        numInstallments="2"
        installmentValue={`R$ ${formatCurrency(calculateInstallment(totalValue, 2))}`}
        totalValue={`R$ ${formatCurrency(calculateTotalValue(2, calculateInstallment(totalValue, 2)))}`}
        description="Descrição da compra parcelada"
        boxName="Pix Parcelado"
      />

      {Array.from({ length: 10 }, (_, i) => {
        const installments = i + 3; 
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
      <View style={styles.footer}>
          <CustomButton
            title="Continuar"
            onPress={() => onNext()}
            disabled={!totalValue}
            backgroundColor="#03D69D"
            borderColor="#03D69D"
            borderRadius={12}
            paddingVertical={16}
            paddingHorizontal={32}
            textColor="#fff"
          />
        </View>
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
    footer: {
    justifyContent: 'flex-end',
    marginBottom: 20
  },
});

export default ExtractScreen;
