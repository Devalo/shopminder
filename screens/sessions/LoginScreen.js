import React from 'react'
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper'

import styles from './styles';
import { auth } from '../../firebase';

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    auth
      .signInWithEmailAndPassword(
        email.trim().toLowerCase(), password
      );
  }

  return (
    <View style={styles.authFormContainer}>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            label="Email"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            style={styles.formInput}
          />
        )}
        name="email"
        rules={{ required: true }}
        defaultValue=""
      />
      <View style={styles.errorMsg}>
        {errors.email && <Text style={styles.errorText}>You must fill in your email</Text>}
      </View>

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            style={styles.formInput}
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue=""
      />
      <View style={styles.errorMsg}>
        {errors.password && <Text style={styles.errorText}>You must fill in your password</Text>}
      </View>
      <View>
        <Button
          mode="contained"
          compact={false}
          onPress={handleSubmit(onSubmit)}
          icon="account-arrow-right"
          style={styles.submitButton}
        >
          Sign in
        </Button>
      </View>
      <View style={styles.switchScreenText}>
        <Text>
          Don't have an account yet?
        </Text>
      </View>
      <Button
        mode="outlined"
        style={styles.switchBtn}
        icon="account-plus"
        compact
        onPress={() => navigation.navigate('register')}
      >
        Register Account
      </Button>
    </View>
  )
};

export default LoginScreen;

