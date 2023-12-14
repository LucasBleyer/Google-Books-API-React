import React from 'react';
import { View, Text, ScrollView, Image, Dimensions  } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#3498db' }}>
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, margin: 20, backgroundColor: '#ecf0f1', borderRadius: 10 }}>
      
        <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginHorizontal: 20, color: '#007BFF', marginBottom: 20 }}>
          Bem-vindo ao Gerenciador de Livros!
        </Text>

        <Image 
        source={require('./public/home.png')} 
        style={{ width: 500, height: 350, marginBottom: 20, borderRadius: 10 }}
        resizeMode="cover"  
        />

        <Text style={{ fontSize: 22, textAlign: 'left', color: '#555', marginTop: 20 }}>
          Desperte sua paixão pela leitura e crie uma biblioteca digital que reflete seu mundo literário único.{"\n\n"}
          - Adicione e armazene seus tesouros literários aqui.{"\n\n"}
          - Descubra obras que inspiram e encantam.{"\n\n"}
          Sua biblioteca pessoal aguarda, pronta para ser preenchida com livros e histórias cativantes e experiências inesquecíveis.
        </Text>
      </View>
    </ScrollView>
  );
}
