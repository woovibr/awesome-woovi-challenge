import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CashbackText from '../CashBack/Cashback';

const InfoBox = ({ numInstallments, installmentValue, totalValue, description, boxName, cashbackDetails }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const renderDescription = () => {
    if (numInstallments === '1') {
      return (
        <Text style={styles.text1Installments}>
          Ganhe <Text style={styles.discount}>3%</Text> de Cashback
        </Text>
      ); 
    }
    return totalValue ? `Valor total: R$ ${totalValue}` : description;
  };

  const handleSelect = () => {
    setSelectedValue((prevValue) => (prevValue === '1' ? null : '1'));
  };

  return (
    <View style={[styles.container, selectedValue === '1' && styles.selectedContainer]}>
      {boxName && (
        <View style={styles.boxNameContainer}>
          <Text style={styles.boxName}>{boxName}</Text>
        </View>
      )}
      <View style={styles.boxContent}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>
            <Text style={styles.bold}>{numInstallments}x</Text> {installmentValue}
          </Text>
          <Text style={styles.description}>
            {renderDescription()}
          </Text>
        </View>
        <View style={styles.selectContainer}>
          <SelectButton 
            label="Opção 1" 
            isSelected={selectedValue === '1'} 
            onPress={handleSelect}
          />
        </View>
      </View>
      {cashbackDetails && (
        <CashbackText 
          emoji={cashbackDetails.emoji} 
          amount={cashbackDetails.amount} 
          message={cashbackDetails.message}
        />
      )}
    </View>
  );
};

const SelectButton = ({ label, isSelected, onPress }) => (
  <TouchableOpacity 
    style={[styles.selectButton, isSelected && styles.selectedButton]} 
    onPress={onPress}
  >
    {isSelected ? <Text style={styles.checkmark}>✔</Text> : null}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  selectedContainer: {
    borderColor: '#03D69D', 
  },
  boxNameContainer: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    zIndex: 1,
  },
  boxName: {
    fontSize: 14,
    color: '#333',
  },
  boxContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#4D4D4D',
  },
  bold: {
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  selectButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  selectedButton: {
    backgroundColor: '#03D69D',
    borderColor: '#03D69D',
  },
  checkmark: {
    fontSize: 17,
    color: '#fff',
  },
  text1Installments: {
    color: '#03D69D',
  },
  discount: {
    fontWeight: 'bold',
  }
});

export default InfoBox;
