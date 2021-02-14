import React, { useState, useEffect } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { List, Divider, FAB } from 'react-native-paper';

import { db, auth } from '../../firebase';

import styles from './styles';

const ViewAll = ({ navigation }) => {
  const [shopminders, setShopminders] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const ref = db.collection('shopminders')
      .where('belongsTo', '==', user.uid)
      .orderBy('createdAt', 'desc');
    ref.onSnapshot((query) => {
        const objs = [];
        query.forEach((doc) => {
          objs.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setShopminders(objs);
      });
  }, [])

  const handleComplete = async (shopminder) => {
    const ref = db
      .collection('shopminders')
      .doc(shopminder.id);

    try {
      await ref.set({
        completed: !shopminder.completed,
      }, { merge: true });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (shopminder) => {
    const ref = db
      .collection('shopminders')
      .doc(shopminder.id);

    try {
      Alert.alert(
        'Are you sure?',
        'Are you sure you want to delete?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
          },
          {
            text: 'Delete',
            onPress: async () => await ref.delete(),
          }
        ],
      )
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <ScrollView>
        <View>
          {shopminders.map((shopminder) => (
            <View key={shopminder.id}>
              <List.Item 
              title={shopminder.name}
              onPress={() => handleComplete(shopminder)}
              onLongPress={() => handleDelete(shopminder)}
              titleStyle={shopminder.completed 
                ? styles.complete 
                : styles.notComplete}
              />
              <Divider />
            </View>
          ))}
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('addOne')}
      />
    </>

  )
};

export default ViewAll;
