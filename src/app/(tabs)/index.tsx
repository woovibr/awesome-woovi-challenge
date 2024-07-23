import * as React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import CustomButton from '@/src/components/Button/Button';
import Logo from "../../assets/logo/logo.png";

export default function Conversion({ clearValues }) {
  const [value, setValue] = React.useState<string>('0,00');
  const [cellsPressed, setCellsPressed] = React.useState<number[]>([0]);

  const calculatorKeyboard: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [-2, 0, -1],
  ];

  React.useEffect(() => {
    if (clearValues) {
      setValue('0,00');
    }
  }, [clearValues]);

  const goToCheckout = () => {
    navigation.navigate('Checkout', { valueToConversion: parseFloat(value.replace(',', '.')) });
  };

  React.useEffect(() => {
    const updated = Number.parseFloat(cellsPressed.join('')) / 100;
    setValue(updated.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
  }, [cellsPressed]);

  const resolveCellPress = option => {
    if (option === -1) {
      const cellsWithoutLast = cellsPressed.slice(0, -1);
      setCellsPressed(cellsWithoutLast.length === 0 ? [0] : cellsWithoutLast);
      return;
    }
    setCellsPressed(cells => [...cells, option]);
  };

  const ConversionKeyboard = () => (
    <View style={styles.keyboardContainer}>
      {calculatorKeyboard.map((row, rindex) => (
        <Row key={`calculator-row-${rindex}`} cells={row.map((cell, cindex) => (
          <Cell key={`calculator-row-${rindex}-cell-${cindex}`} text={cell} />
        ))} />
      ))}
    </View>
  );

  const Row = ({ cells }) => (
    <View style={styles.row}>
      {cells}
    </View>
  );

  const Cell = ({ text }) => (
    <View style={styles.cellContainer}>
      <TouchableOpacity
        onPress={() => resolveCellPress(text)}
        style={styles.cell}
      >
        {text === -2 && <Text style={styles.cellText}>→</Text>}
        {text === -1 && <Text style={styles.cellText}>←</Text>}
        {text >= 0 && <Text style={styles.cellText}>{text}</Text>}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.textContainer}>
          <Text style={styles.promptText}>
            Qual valor você gostaria de parcelar?
          </Text>
        </View>

        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>
            R$ {value}
          </Text>
        </View>

        <ConversionKeyboard />

        <View style={styles.footer}>
          <CustomButton
            title="Parcelar"
            onPress={() => goToCheckout()}
            disabled={parseFloat(value.replace(',', '.')) === 0}
            backgroundColor="#03D69D"
            borderColor="#03D69D"
            borderRadius={12}
            paddingVertical={16}
            paddingHorizontal={32}
            textColor="#fff"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: '#fff'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
    marginTop: 20
  },
  textContainer: {
    paddingVertical: 8,
  },
  promptText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  valueContainer: {
    paddingVertical: 28,
    paddingRight: 4,
  },
  valueText: {
    fontSize: 36,
    color: '#333',
    textAlign: 'right',
    lineHeight: 52,
    letterSpacing: -1,
  },
  keyboardContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cellContainer: {
    flex: 1,
    alignItems: 'center',
  },
  cell: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#133A6F',
    borderRadius: 8,
  },
  cellText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#fff'
  },
  footer: {
    justifyContent: 'flex-end',
    marginBottom: 20
  },
});
