// RegistroScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from './Firebase';

export default function RegistrarConta () {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleRegistrar = () => {
    if (senha === confirmarSenha) {
      createUserWithEmailAndPassword(auth, email, senha)
        .then(() =>{
            navigation.navigate('Login')
        })
        .catch((error) => {
            alert(error.message)
        })
      setSnackbarVisible(true);
    } else {
      alert('As senhas não coincidem. Por favor, tente novamente.');
    }
  };

  const handleVoltarLogin = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3498db' }}>
  <Text style={{ fontWeight: 'bold', fontSize: 55, marginBottom: 5, color: '#ecf0f1' }}>Gerenciador de Livros</Text>
  <Text style={{ fontSize: 22, marginBottom: 20, color: '#ecf0f1' }}>Organize suas leituras de maneira simples e eficiente</Text>

  <View style={{ width: '80%', alignItems: 'center', marginTop: 70 }}>
    <Text style={{ fontWeight: 'bold', fontSize: 36, marginBottom: 20, color: '#ecf0f1' }}>Registro de Conta</Text>

    <TextInput
      style={{
        width: '100%',
        height: 40,
        fontSize: 19,
        backgroundColor: '#ecf0f1',
        marginBottom: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
      }}
      placeholder="E-mail"
      keyboardType="email-address"
      autoCapitalize="none"
      value={email}
      onChangeText={(text) => setEmail(text)}
    />

    <TextInput
      style={{
        width: '100%',
        height: 40,
        fontSize: 19,
        backgroundColor: '#ecf0f1',
        marginBottom: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
      }}
      placeholder="Senha"
      secureTextEntry
      value={senha}
      onChangeText={(text) => setSenha(text)}
    />

    <TextInput
      style={{
        width: '100%',
        height: 40,
        fontSize: 19,
        backgroundColor: '#ecf0f1',
        marginBottom: 20,
        borderRadius: 5,
        paddingHorizontal: 10,
      }}
      placeholder="Confirmar Senha"
      secureTextEntry
      value={confirmarSenha}
      onChangeText={(text) => setConfirmarSenha(text)}
    />

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleVoltarLogin}
    >
      <Text style={{ color: '#ecf0f1', textDecorationLine: 'underline', fontSize: 20, marginBottom: 20 }}>
        Voltar para Login
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{
        backgroundColor: '#2ecc71',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginBottom: 10,
      }}
      activeOpacity={0.8}
      onPress={handleRegistrar}
    >
      <Text style={{ color: '#ecf0f1', fontWeight: 'bold', fontSize: 20 }}>Confirmar</Text>
    </TouchableOpacity>

    <Snackbar
      visible={snackbarVisible}
      onDismiss={() => setSnackbarVisible(false)}
      duration={3000}
    >
      Registro bem-sucedido!
    </Snackbar>
  </View>
</View>

  );
};