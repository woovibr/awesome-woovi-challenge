import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Pressable, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Logo from "../../assets/logo/logo.png"
import QrCodeImage from "../../assets/images/qrcode.png";
import SecurityFooter from '../Footer/footerSecurity';
import ProgressSteps, { Title, Content } from '@joaosousa/react-native-progress-steps';
import CustomButton from '../Button/Button';

export default function StepPayPix({onNext}) {
  const [expanded, setExpanded] = useState(false);
  const [step, setStep] = useState(0);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.logoContainer}>
        <Text style={styles.instruction}>
          Ivan, pague a entrada de R$ 15.300,00 pelo Pix
        </Text>
      </View>

      <View style={styles.qrCodeContainer}>
        <Image
          source={QrCodeImage}
          style={styles.qrCode}
        />
      </View>

      <Pressable style={styles.copyButton}>
        <Text style={styles.copyButtonText}>Clique para copiar QR CODE</Text>
        <FontAwesome name="clipboard" size={16} color="#fff " style={styles.copyIcon} />
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
      <View style={styles.footer}>
      <CustomButton
            title="Prosseguir"
            onPress={() => onNext()}
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
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    width: '100%'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  instruction: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  qrCodeContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#03D69D',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center'
  },
  qrCode: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    margin: 5
  },
  copyButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#133A6F',
    borderRadius: 8,
    width: "90%",
  },
  copyButtonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  copyIcon: {
    marginRight: 10,
    marginLeft: 10
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
  stepContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  footer: {
    justifyContent: 'flex-end',
    marginBottom: 20,
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 2,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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

