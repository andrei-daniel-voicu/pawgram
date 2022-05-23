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
  name: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Name is required!'),
	surname: Yup.string()
    .trim()
    .min(3, 'Invalid surname!')
    .required('Surname is required!'),
  address: Yup.string().required('Address is required!'),
  phone: Yup.string()
    .trim()
    .required('Phone is required!'),
});

const AdoptForm = ({ navigation }) => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const userInfo = {
    name: '',
    address: '',
    phone: '',
    message: '',
    date: new Date(),
    surname: '',
    patreonLink: ''
  };

  const [error, setError] = useState('');

  const { name, address, phone, message } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // we will accept only if all of the fields have value

    console.log("Validare ce naiba frate")
    if (!isValidObjField(userInfo))
      return updateError('Required all fields!', setError);
    // if valid name with 3 or more characters
    if (!name.trim() || name.length < 3)
      return updateError('Invalid name!', setError);
    if (!surname.trim() || surname.length < 5)
      return updateError('Invalid surname!', setError);
    // only valid address id is allowed
    if (!isValidEmail(address)) return updateError('Invalid address!', setError);
    // phone must have 8 or more characters
    if (!phone.trim() || phone.length < 10)
      return updateError('Phone is less then 10 characters!', setError);

    return true;
  };

  const submitForm = () => {
    if (isValidForm()) {
      // submit form
      console.log(userInfo);
    }
  };

  const signUp = async (values, formikActions) => {    
      const rest = await fetch('http://localhost:2345/create-user', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

    try {
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
            address: resu["user"]["address"],
            phone: values.phone
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
        console.log("Result", result)  
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
      // formikActions.setSubmitting(false); 
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
          const { name, surname, address, phone, message } = values;
          return (
            <>
              <FormInput
                value={name}
                error={touched.name && errors.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                label='Name'
                placeholder='John'
              />
              <FormInput
                value={surname}
                error={touched.surname && errors.surname}
                onChangeText={handleChange('surname')}
                onBlur={handleBlur('surname')}
                label='Surname'
                placeholder='Smith'
              />
              <FormInput
                value={address}
                error={touched.address && errors.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                autoCapitalize='none'
                label='Adress'
                placeholder='Mulberry Street'
              />
              <FormInput
                value={phone}
                error={touched.phone && errors.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                autoCapitalize='none'
                label='Phone'
                placeholder='0123456789'
              />
              <FormInput
                value={message}
                error={touched.message && errors.message}
                onChangeText={handleChange('message')}
                onBlur={handleBlur('message')}
                autoCapitalize='none'
                label='Message'
                placeholder='I want to adopt your pet!'
              />
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title='Send Form'
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default AdoptForm;
