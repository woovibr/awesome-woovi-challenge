import React from 'react';
import { StyleSheet, FlatList, Pressable, View } from 'react-native';
import { Text } from '@/src/components/Themed';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const transactions = [
  { id: '1', description: 'Pix + Cartão de Crédito', installments: '2x', amount: 'R$ 30.500,00', status: 'Aguardando Pagamento' },
  { id: '2', description: 'Pix + Cartão de Crédito', installments: '12x', amount: 'R$ 15.300,00', status: 'Finalizado Sem Pagamento' },
  { id: '3', description: 'Pix', installments: '', amount: 'R$ 10.196,66', status: 'Finalizado Com Pagamento' },
];

const statusIcons = {
  'Aguardando Pagamento': 'clock-o',
  'Finalizado Sem Pagamento': 'times-circle',
  'Finalizado Com Pagamento': 'check-circle',
};

export default function ExtractScreen() {
  const navigation = useNavigation();

  const handlePress = (transaction) => {
    navigation.navigate('detailsPayment', { transaction });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Extrato de Pagamentos</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.transaction} onPress={() => handlePress(item)}>
            <View style={styles.transactionContent}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.amount}>{item.installments}{' '}{item.amount}</Text>
            </View>
            <FontAwesome name={statusIcons[item.status]} size={24} color={getStatusColor(item.status)} />
          </Pressable>
        )}
      />
    </View>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case 'Aguardando Pagamento':
      return '#FFA500'; 
    case 'Finalizado Sem Pagamento':
      return '#FF0000'; 
    case 'Finalizado Com Pagamento':
      return '#008000'; 
    default:
      return '#000'; 
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40,
    color: '#333'
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionContent: {
    flex: 1,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4D4D4D',
  },
  amount: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
});
