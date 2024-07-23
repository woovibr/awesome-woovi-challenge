import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../components/Header/Header';
import StepInstallments from '../components/StepByStep-Payment/StepInstallments';
import StepPayPix from '../components/StepByStep-Payment/StepPayPix';
import StepPayCreditCard from '../components/StepByStep-Payment/StepPayCreditCard';

interface PaymentScreenProps {
  navigation: PaymentScreenNavigationProp;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [value, setValue] = useState<number | null>(null);

  const handleNext = (nextValue?: number) => {
    if (step === 1 && nextValue) {
      setValue(nextValue);
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      console.log('voltar home')
      //navigation.navigate('home'); 
    } else {
      setStep(step - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Header onBack={handleBack} />
      {step === 1 && <StepInstallments onNext={handleNext} />}
      {step === 2 && <StepPayPix value={value} onNext={() => setStep(3)} onBack={handleBack} />}
      {step === 3 && <StepPayCreditCard onBack={handleBack} />}
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
