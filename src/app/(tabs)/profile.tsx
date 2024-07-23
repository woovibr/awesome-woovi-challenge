import React from 'react';
import { StyleSheet, Pressable, View, Image } from 'react-native';
import { Text } from '@/src/components/Themed';
import Footer from '@/src/components/Footer/footer';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="user-circle" size={80} color="#4682b4" />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Ivan </Text>
        </View>
      </View>

      <View style={styles.sectionsContainer}>
        <Pressable style={styles.section} onPress={() => console.log("Se locomovendo para dados do perfil")}>
          <FontAwesome name="info-circle" size={24} color="#4682b4" />
          <Text style={styles.sectionText}>Dados do Perfil</Text>
        </Pressable>
        <Pressable style={styles.section} onPress={() => console.log("Se locomovendo para as configurações")}>
          <FontAwesome name="cogs" size={24} color="#4682b4" />
          <Text style={styles.sectionText}>Configurações</Text>
        </Pressable>
        <Pressable style={styles.section} onPress={() => console.log("Se locomovendo para fora do app")}>
          <FontAwesome name="sign-out" size={24} color="#4682b4" />
          <Text style={styles.sectionText}>Sair</Text>
        </Pressable>
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40
  },
  nameContainer: {
    marginLeft: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionText: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
});
