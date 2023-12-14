import React, { useState } from 'react';
import { View, TextInput, ScrollView, Button, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from './Firebase';
import Modal from 'react-native-modal';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Cadastrar() {
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [autor, setAutor] = useState('');
  const [titulo, setTitulo] = useState('');

  const handleCadastrar = async () => {
    try {
      const { thumbnail, autor, nomeLivro } = await BuscaImagem(titulo);

      if (thumbnail === 'Capa não encontrada' || autor === 'Autor não encontrado') {
        setErrorMessage('Capa ou autor não encontrado');
        setIsErrorModalVisible(true);
        return;
      }

      const auth = getAuth();

      await addDoc(collection(db, 'Livros'), {
        autor: autor,
        titulo: nomeLivro,
        thumbnail: thumbnail,
        userId: auth.currentUser.uid,
      });

      setSuccessMessage('Livro cadastrado com sucesso!');
      setIsErrorModalVisible(true);

      console.log('Livro cadastrado com sucesso! Document ID:');
    } catch (error) {
      setErrorMessage(error.message);
      setIsErrorModalVisible(true);
    }
  };

  async function BuscaImagem(titulo) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(titulo)}&maxResults=1`
      );

      let thumbnail = 'Capa não encontrada';
      let autor = 'Autor não encontrado';
      let nomeLivro = 'Título não encontrado';

      if (response.data.items && response.data.items.length > 0) {
        thumbnail = response.data.items[0]?.volumeInfo?.imageLinks?.thumbnail || 'Capa não encontrada';
        autor = response.data.items[0]?.volumeInfo?.authors?.join(', ') || 'Autor não encontrado';
        nomeLivro = response.data.items[0]?.volumeInfo?.title || 'Título não encontrado';
      } else {
        throw new Error('Livro não encontrado');
      }

      return { thumbnail, autor, nomeLivro };
    } catch (error) {
      throw new Error('Erro ao buscar livro');
    }
  }

  const closeModal = () => {
    setIsErrorModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1}}>
      <View style={styles.container}>
          <Image
            source={require('./public/images/books.jpg')}
            style={styles.imagem}
          />

        <View style={styles.content}>
          <Text style={styles.title}>Explore e Registre suas  {"\n"} Belas Obras!</Text>
          <Text style={styles.subtitle}>{"\n"}Transforme sua Biblioteca em um{"\n"} Mundo de Inspiração.</Text>

          <Text style={styles.description}>
          Dê vida à sua paixão pela leitura! No Gerenciador de Livros, você pode explorar, registrar e relembrar suas obras literárias favoritas. 
          Crie uma biblioteca repleta de belas histórias e autores inspiradores.
          </Text>

          <Text style={styles.description}>
          Registre cada obra-prima que tocar o seu coração. Da poesia à prosa, cada livro tem seu lugar neste espaço dedicado à magia das palavras.
          Compartilhe suas descobertas literárias e conecte-se com outros amantes de livros em uma comunidade apaixonada.
          </Text>

          <Text style={styles.description}>
          O Gerenciador de Livros é o seu refúgio para a apreciação de belas obras. Explore novos mundos, mergulhe em narrativas envolventes
          e construa sua própria galeria de tesouros literários. Comece a jornada agora e faça cada registro contar uma história única.
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Busque por um livro..."
          value={titulo}
          onChangeText={(text) => setTitulo(text)}
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleCadastrar}
        >
          <Text style={styles.buttonText}>Cadastrar Livro</Text>
        </TouchableOpacity>

        <Modal isVisible={isErrorModalVisible} onBackdropPress={closeModal}>
          <View style={styles.modalContainer}>
            {successMessage ? (
              <Text style={styles.successText}>{successMessage}</Text>
            ) : null}
            <Text style={styles.errorText}>{errorMessage}</Text>
            <Button title="Fechar" onPress={closeModal} />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginBottom: 50,
    width: '80%',
  },
  imagem: {
    width: '100%',
    height: 75, // Ajuste a altura desejada
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },  
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
    color: '#007BFF',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#3498db',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginTop: 30,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#ecf0f1',
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
  successText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'green',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});