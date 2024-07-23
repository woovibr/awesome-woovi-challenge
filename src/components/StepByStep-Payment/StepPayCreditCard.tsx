import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import InputWithLabel from '../Input/Input';
import SecurityFooter from '../Footer/footerSecurity';
import ProgressSteps, { Content, Title } from '@joaosousa/react-native-progress-steps';

export default function StepPayCreditCard({ onNext }) {
  const [expanded, setExpanded] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [installments, setInstallments] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.instruction}>
          Ivan, pague o restante em 1x no cartão
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <InputWithLabel
          label="Nome Completo"
          value={name}
          onChangeText={setName}
          placeholder="Digite seu nome completo"
        />
        <InputWithLabel
          label="CPF"
          value={cpf}
          onChangeText={setCpf}
          placeholder="Digite seu CPF"
          keyboardType="numeric"
        />
        <InputWithLabel
          label="Número do Cartão"
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder="Digite o número do cartão"
          keyboardType="numeric"
        />
        <View style={styles.row}>
          <InputWithLabel
            label="Data de Expiração"
            value={expiryDate}
            onChangeText={setExpiryDate}
            placeholder="MM/AA"
            keyboardType="numeric"
            containerStyle={styles.inputHalf}
          />
          <InputWithLabel
            label="CVV"
            value={cvv}
            onChangeText={setCvv}
            placeholder="Digite o CVV"
            keyboardType="numeric"
            containerStyle={styles.inputHalf}
          />
        </View>
        <InputWithLabel
          label="Parcelas"
          value={installments}
          onChangeText={setInstallments}
          placeholder="1x de R$ 3.500,00"
          containerStyle={styles.inputFull}
        />
      </View>

      <Pressable style={styles.copyButton} onPress={() => onNext()}>
        <Text style={styles.copyButtonText}>Pagar</Text>
      </Pressable>

      <View style={styles.dueDateContainer}>
        <Text style={styles.dueDate}>Prazo de pagamento:</Text>
        <Text style={styles.dueDateValue}>15/12/2021 - 08:17</Text>
      </View>

      <View style={styles.stepByStepContainer}>
        <View style={styles.stepWrapper}>
          <ProgressSteps
            currentStep={step}
            steps={[
              {
                id: 1,
                title: <Title>1ª entrada no Pix</Title>,
                content: <Content><Text style={styles.stepContentText}></Text></Content>,
              },
              {
                id: 2,
                title: <Title>2ª entrada no Pix</Title>,
                content: <Content><Text style={styles.stepContentText}></Text></Content>,
              },
            ]}
          />
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.stepValue}>R$ 7.650,00</Text>
          <Text style={styles.stepValue}>R$ 7.650,00</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.leftText}>CET: 0,5%</Text>
        <Text style={styles.rightText}>Total: R$ 30.600,00</Text>
      </View>

      <Pressable style={styles.accordionHeader} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.accordionTitle}>Como funciona?</Text>
        <FontAwesome name={expanded ? "chevron-up" : "chevron-down"} size={20} color="#333" />
      </Pressable>
      {expanded && (
        <View style={styles.accordionContent}>
          <Text style={styles.detailText}>Nome Completo: Pagamento inicial de entrada.</Text>
          <Text style={styles.detailText}>CPF: R$ 15.300,00</Text>
          <Text style={styles.detailText}>Número do cartão: Aguardando pagamento</Text>
          <Text style={styles.detailText}>Parcelas: 
            <Text style={styles.parcelValue}> R$ 7.650,00</Text>
          </Text>
        </View>
      )}

      <View style={styles.dueDateContainer}>
        <Text style={styles.identificatorDate}>Identificador:</Text>
        <Text style={styles.identificatorDateValue}>2c1b951f356c4680b13ba1c9fc889c47</Text>
      </View>
      <SecurityFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  instruction: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  copyButton: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#133A6F',
    borderRadius: 8,
    width: "100%",
  },
  copyButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  dueDateContainer: {
    alignItems: 'center', 
    marginBottom: 20,
  },
  dueDate: {
    fontSize: 16,
    color: '#333',
  },
  dueDateValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  identificatorDate: {
    fontSize: 16,
    color: '#333',
  },
  identificatorDateValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  stepByStepContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  stepWrapper: {
    width: '75%',
  },
  valueContainer: {
    width: '25%',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  stepTitle: {
    fontSize: 16,
    color: '#333',
  },
  stepValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  stepContentText: {
    fontSize: 16,
    color: '#666',
  },
  accordionHeader: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 2,
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  accordionTitle: {
    fontSize: 18,
    color: '#333',
  },
  accordionContent: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  parcelValue: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputHalf: {
    flex: 1,
    marginRight: 10,
  },
  inputFull: {
    width: '100%',
  },
  leftText: {
    fontSize: 16,
    color: '#333',
  },
  rightText: {
    fontSize: 16,
    color: '#333',
  },
});
