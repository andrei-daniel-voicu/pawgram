import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { isValidEmail, isValidObjField, updateError } from '../utils/methods';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import { useLogin } from '../context/LoginProvider';
import FormSubmitButton from './FormSubmitButton';
import { StackActions } from '@react-navigation/native';

import { Formik } from 'formik';
import * as Yup from 'yup';

import client from '../api/client';

const validationSchema = Yup.object({
  fullname: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Name is required!'),
  username: Yup.string()
    .min(5, 'Invalid username!')
    .required('Username is required!'),
  email: Yup.string()
    .email('Invalid email!')
    .required('Email is required!'),
  password: Yup.string()
    .trim()
    .min(8, 'Password is too short!')
    .required('Password is required!'),
  confirmPassword: Yup.string().equals(
    [Yup.ref('password'), null],
    'Password does not match!'
  ),
});

const SignupForm = ({ navigation }) => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const userInfo = {
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    date: new Date(),
    username: '',
    type: 'Animal',
    patreonLink: ''
  };

  const [error, setError] = useState('');

  const { fullname, email, password, confirmPassword } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // we will accept only if all of the fields have value

    if (!isValidObjField(userInfo))
      return updateError('Required all fields!', setError);
    // if valid name with 3 or more characters
    if (!fullname.trim() || fullname.length < 3)
      return updateError('Invalid name!', setError);
    if (!username.trim() || username.length < 5)
      return updateError('Invalid username!', setError);
    // only valid email id is allowed
    if (!isValidEmail(email)) return updateError('Invalid email!', setError);
    // password must have 8 or more characters
    if (!password.trim() || password.length < 8)
      return updateError('Password is less then 8 characters!', setError);
    // password and confirm password must be the same
    if (password !== confirmPassword)
      return updateError('Password does not match!', setError);

    return true;
  };

  const submitForm = () => {
    if (isValidForm()) {
      // submit form
      // console.log(userInfo);
    }
  };

  const signUp = async (values, formikActions) => {
    try {   
      const rest = await fetch('http://localhost:2345/create-user', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      
      if (rest.ok) {
        const read = rest.body
        .pipeThrough(new TextDecoderStream())
        .getReader();
        let data1 = '';
        while (true) {
          const { value, done } = await read.read();
          if (done) break;
          data1 = value;
        }
        const resu = JSON.parse(data1);
        const res = await fetch('http://localhost:2345/sign-in', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: resu["user"]["email"],
            password: values.password
          })
         })
 
        const reader = res.body
        .pipeThrough(new TextDecoderStream())
        .getReader();
        let data = '';
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          data = value;
        }
        const result = JSON.parse(data);   
        // console.log("Result", result)  
        if (result.success) {
          navigation.dispatch(
            StackActions.replace('ImageUpload', {
              token: result.token
            })
          );
          formikActions.resetForm();
          setProfile(result.user);
          setIsLoggedIn(true);
        }
      } else { console.log ("Nu e succes") }

      formikActions.resetForm();
      formikActions.setSubmitting(false);
    // });
      } catch (e) {
        console.log(e);

      }
  };

  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { fullname, username, email, password, confirmPassword, type } = values;
          return (
            <>
              <FormInput
                value={fullname}
                error={touched.fullname && errors.fullname}
                onChangeText={handleChange('fullname')}
                onBlur={handleBlur('fullname')}
                label='Full Name'
                placeholder='John Smith'
              />
              <FormInput
                value={username}
                error={touched.username && errors.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                label='Username'
                placeholder='john.smith'
              />
              <FormInput
                value={email}
                error={touched.email && errors.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                autoCapitalize='none'
                label='Email'
                placeholder='example@email.com'
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                autoCapitalize='none'
                secureTextEntry
                label='Password'
                placeholder='********'
              />
              <FormInput
                value={confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                autoCapitalize='none'
                secureTextEntry
                label='Confirm Password'
                placeholder='********'
              />
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title='Sign up'
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default SignupForm;
