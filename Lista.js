import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, Image  } from 'react-native';
import { collection, query, getDocs, deleteDoc, doc, where } from 'firebase/firestore';
import { db } from './Firebase';
import { useFocusEffect } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


export default function Lista () {
    const [livros, setLivros] = useState([]);
  
    useEffect(() => {
      ler();
    }, []);
  
    const ler = async () => {
      const livrosArray = [];
      const auth = getAuth();

        const consulta = query(
          collection(db, 'Livros'),
          where('userId', '==', auth.currentUser.uid) 
        );
      
        try {
        const resultConsulta = await getDocs(consulta);
  
        resultConsulta.forEach((doc) => {

          const livro = {
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
            thumbnail: doc.data().thumbnail
          };
  
          livrosArray.push(livro);
        });
  
        setLivros(livrosArray);
      } catch (error) {
        console.error('Erro ao buscar os livros:', error.message);
      }
    };

    const atualizar = () => {
      setTimeout(() => {
        ler();
      }, 500); 
    };

    
    const handleExcluir = async (id) => {
      try {

        await deleteDoc(doc(db, 'Livros', id));
    
        console.log('Livro excluído com sucesso!');

        atualizar();
      } catch (error) {
        console.error('Erro ao excluir o livro:', error.message);
      }
    };
  
    useFocusEffect(
      React.useCallback(() => {
        ler();
      }, [])
    );

    return (
      <View style={{flex: 1, justifyContent: 'center',}}>

      <Text style={styles.title}>Sua Biblioteca</Text>
        <Text style={styles.subtitle}>Explore e gerencie seus livros favoritos</Text>

        <FlatList
          data={livros}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ borderWidth: 1, borderColor: '#3498db', marginBottom: 10, borderRadius: 5, margin: 20}}>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                <View style={{ width: 80, height: 120, backgroundColor: 'lightgray', marginRight: 10, }} >
                <Image
                  source={{ uri: `${item.thumbnail}` }} 
                  style={{ width: '100%', height: '100%', borderRadius: 5 }}
                  resizeMode="cover"
                />
        </View>
              
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.titulo}</Text>
          <Text>Autor: {item.autor}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          
          <TouchableOpacity style={{ backgroundColor: '#fc6d68', padding: 8, borderRadius: 60 }}  onPress={() => handleExcluir(item.id)}>
            <Text style={{ color: 'white' }}><MaterialCommunityIcons name="delete" size={28} color="white" /></Text>
          </TouchableOpacity>
        </View>

              </View>
            </View>
          )}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    title: {
      fontSize: 31,
      fontWeight: 'bold',
      textAlign: 'center',
      marginHorizontal: 20,
      color: '#007BFF',
    },
    subtitle:{
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginHorizontal: 20,
      color: '#3498db',
    }
  });