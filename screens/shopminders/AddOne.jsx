import React from 'react';
import { View, Text } from 'react-native';
import { TextInput, FAB } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';

import { auth, db } from '../../firebase';
import firebase from 'firebase';

import styles from './styles';

const AddOne = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const user = auth.currentUser;

    try {
      const shopminder = {
        name: data.shopminder,
        belongsTo: user.uid,
        completed: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      const ref = db.collection('shopminders'); 

      await ref.add(shopminder);

      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            label="Name of Shopminder"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            style={styles.field}
          />
        )}
        name="shopminder"
        rules={{ required: true }}
        defaultValue=""
      />
      <View style={styles.errorMsg}>
        {errors.shopminder && <Text style={styles.errorText}>You must fill in your shopminder</Text>}
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddOne;
