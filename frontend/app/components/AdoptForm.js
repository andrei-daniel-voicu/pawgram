import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { isValidEmail, isValidObjField, updateError } from '../utils/methods';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import { useLogin } from '../context/LoginProvider';
import FormSubmitButton from './FormSubmitButton';
import { DrawerActions } from '@react-navigation/native';

import { Formik } from 'formik';
import * as Yup from 'yup';

import client from '../api/client';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(3, 'Invalid firstName!')
    .required('Name is required!'),
	lastName: Yup.string()
    .trim()
    .min(3, 'Invalid lastName!')
    .required('Surname is required!'),
  address: Yup.string().required('Address is required!'),
  phone: Yup.string()
    .trim()
    .required('Phone is required!'),
});

const AdoptForm = ({ navigation, route }) => {
  const { profile } = useLogin();
  const userInfo = {
    firstName: '',
    address: '',
    phone: '',
    message: '',
    date: new Date(),
    lastName: '',
    animalId: route.params.id,
    regularId: profile._id
  };

  const [error, setError] = useState('');

  const { firstName, address, phone, message } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // we will accept only if all of the fields have value

    console.log("Validare ce naiba frate")
    if (!isValidObjField(userInfo))
      return updateError('Required all fields!', setError);
    // if valid firstName with 3 or more characters
    if (!firstName.trim() || firstName.length < 3)
      return updateError('Invalid firstName!', setError);
    if (!lastName.trim() || lastName.length < 5)
      return updateError('Invalid lastName!', setError);
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
      console.log ("De ce de 2 ori animal ID", values)
      const rest = await fetch('http://localhost:2345/create-adoption', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      formikActions.resetForm();
      formikActions.setSubmitting(false);
      const jumpToAction = 
        DrawerActions.jumpTo('ForeignProfile', 
          { username: route.params.username});
      navigation.dispatch(jumpToAction);
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
          const { firstName, lastName, address, phone, message, date, animalId, regularId } = values;
          return (
            <>
              <FormInput
                value={firstName}
                error={touched.firstName && errors.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                label='First Name'
                placeholder='John'
              />
              <FormInput
                value={lastName}
                error={touched.lastName && errors.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                label='Last Name'
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
