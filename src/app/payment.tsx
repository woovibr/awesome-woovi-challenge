import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../components/Header/Header';
import StepInstallments from '../components/StepByStep-Payment/StepInstallments';
import StepPayPix from '../components/StepByStep-Payment/StepPayPix';
import StepPayCreditCard from '../components/StepByStep-Payment/StepPayCreditCard';
import { useNavigation } from 'expo-router';

const PaymentScreen = () => {
  const [step, setStep] = useState(1);
  const [value, setValue] = useState<number | null>(null);
  const navigation = useNavigation();

  const handleNext = (nextValue?: number) => {
    if (step === 1 && nextValue !== undefined) {
      setValue(nextValue);
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      navigation.navigate('index'); 
    } else {
      setStep(step - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Header onBack={handleBack} />
      {step === 1 && <StepInstallments onNext={handleNext} />}
      {step === 2 && <StepPayPix value={value} onNext={() => setStep(3)} onBack={handleBack} />}
      {step === 3 && <StepPayCreditCard onNext={() => navigation.navigate('nextScreen')} onBack={handleBack} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default PaymentScreen;
