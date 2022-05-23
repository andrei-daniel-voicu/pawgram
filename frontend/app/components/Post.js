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
  url: Yup.string()
    .trim()
    .min(3, 'Invalid url!')
    .required('URL is required!'),
});

const Post = ({ navigation }) => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const userInfo = {
    url: '',
    caption: '',
    date: new Date(),
  };

  const [error, setError] = useState('');

  const { url, caption } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // we will accept only if all of the fields have value

    console.log("Validare ce naiba frate")
    if (!isValidObjField(userInfo))
      return updateError('Required all fields!', setError);
    // if valid url with 3 or more characters
    if (!url.trim() || url.length < 3)
      return updateError('Invalid url!', setError);

    return true;
  };

  const submitForm = () => {
    if (isValidForm()) {
      // submit form
      console.log(userInfo);
    }
  };

  const post = async (values, formikActions) => {    
      const rest = await fetch(`http://localhost:2345/create-post/${profile._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
  };

  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={post}
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
          const { url, caption } = values;
          return (
            <>
              <FormInput
                value={url}
                error={touched.url && errors.url}
                onChangeText={handleChange('url')}
                onBlur={handleBlur('url')}
                label='URL'
                placeholder='http://photo.jpg'
              />
              <FormInput
                value={caption}
                error={touched.caption && errors.caption}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                autoCapitalize='none'
                label='Caption'
                placeholder='What a lovely picture!'
              />
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title='Post'
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default Post;
