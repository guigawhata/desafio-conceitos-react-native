import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  View,
  Button,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './components/Header';

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);


  async function handleLikeRepository(id) {
    const response = await api.post(`/repositories/${id}/like`);

    if (response) {
      const repository = repositories.find(repository => repository.id === id);    

      repository.likes = response.data.likes;

      setRepositories([...repositories]);
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2e2e2e" />
      <SafeAreaView style={styles.container}>
        <Header />
        <FlatList
          data={repositories}
          keyExtractor={(repository) => repository.id}
          renderItem={({item: repository}) => (
            <View style={styles.containerList}>
              <Text style={styles.title}>{repository.title}</Text>    
              <Text testID={`repository-likes-${repository.id}`}>{repository.likes} curtidas</Text>      
              <View style={styles.techsCont}>
                {repository.techs.map((tech, key) =>
                  <Button color="#3dbfb2" key={key} title={tech}/>
                )}
              </View>     
              <View style={styles.iconCont}>
                <Icon
                  name="github"
                  size={40}
                  color="#2e2e2e"
                  onPress={ ()=>{ Linking.openURL(`${repository.url}`)}}
                />
                <Icon
                  name="thumbs-up"
                  size={40}
                  color="#6edb8b"
                  onPress={() => handleLikeRepository(repository.id)}
                  testID={`like-button-${repository.id}`}
                />
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2e2e2e',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerList: {
    justifyContent: 'center',
    alignItems: 'center',

    padding: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 15,
  },
  techsCont: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  iconCont: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  title: {
    color: '#2e2e2e',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
