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
  text: Yup.string()
    .trim()
    .min(3, 'Invalid text!')
    .required('Text is required!'),
  photoLink: Yup.string()
    .trim()
    .min(3, 'Invalid url!')
    .required('URL is required!')
});

const Post = ({ navigation }) => {
  const { profile } = useLogin();
  const userInfo = {
    text: '',
    userId: profile._id,
    photoLink: '',
    commentList: [],
    likesList: [],
    date: new Date(),
  };

  const [error, setError] = useState('');

  const { text, photoLink } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // we will accept only if all of the fields have value

    console.log("Validare ce naiba frate")
    if (!isValidObjField(userInfo))
      return updateError('Required all fields!', setError);
    // if valid url with 3 or more characters
    if (!text.trim() || text.length < 3)
      return updateError('Invalid text!', setError);
    if (!photoLink.trim() || photoLink.length < 3)
      return updateError('Invalid photo link!', setError);

    return true;
  };

  const submitForm = () => {
    if (isValidForm()) {
      // submit form
      console.log(userInfo);
      return true;
    }
  };

  const postIt = async (values, formikActions) => {
      userInfo.text = values.text;
      userInfo.photoLink = values.photoLink;
      console.log("UserInfo", userInfo)
      const rest = await fetch(`http://localhost:2345/create-post/${profile._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
      formikActions.resetForm();
      formikActions.setSubmitting(false);
  };

  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={postIt}
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
          const {text, photoLink} = values;
          return (
            <>
              <FormInput
                value={text}
                error={touched.text && errors.text}
                onChangeText={handleChange('text')}
                onBlur={handleBlur('text')}
                label='Text'
                placeholder='Say something'
              />
              <FormInput
                value={photoLink}
                error={touched.photoLink && errors.photoLink}
                onChangeText={handleChange('photoLink')}
                onBlur={handleBlur('photoLink')}
                autoCapitalize='none'
                label='Photo'
                placeholder='Add a picture'
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
