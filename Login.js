import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Deslogar');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const handleTexto = () => {
    navigation.navigate('RegistrarConta');
  };

  const emojiBook = '📚';

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3498db' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 90, marginBottom: 5}}>{emojiBook}</Text>
      <Text style={{ fontWeight: 'bold', fontSize: 55, marginBottom: 5, color: '#ecf0f1' }}>Gerenciador de Livros</Text>
      <Text style={{ fontSize: 22, marginBottom: 20, color: '#ecf0f1' }}>Organize suas leituras de maneira simples e eficiente</Text>
      
      <View style={{ width: '80%', alignItems: 'center', marginTop: 70}}>
        <Text style={{ fontWeight: 'bold', fontSize: 36, marginBottom: 20, color: '#ecf0f1' }}>Bem-vindo de volta!</Text>

        <TextInput
          style={{
            width: '100%',
            height: 40,
            fontSize:19,
            backgroundColor: '#ecf0f1',
            marginBottom: 10,
            borderRadius: 5,
            paddingHorizontal: 10,
          }}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={{
            width: '100%',
            height: 40,
            fontSize:19,
            backgroundColor: '#ecf0f1',
            marginBottom: 20,
            borderRadius: 5,
            paddingHorizontal: 10,
          }}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={(text) => setSenha(text)}
        />

        <TouchableOpacity 
        activeOpacity={0.8} 
        onPress={handleTexto}>
          <Text style={{ color: '#ecf0f1', textDecorationLine: 'underline', fontSize: 20, marginBottom: 20}}>
            Não possui conta?
            Registre-se
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#2ecc71',
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 60,
          }}
          activeOpacity={0.8} 
          onPress={handleLogin}
        >
          <Text style={{ color: '#ecf0f1', fontWeight: 'bold', fontSize: 20 }}>Entrar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
