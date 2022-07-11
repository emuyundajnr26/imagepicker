import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { Button } from 'react-native-web';
import { useState } from 'react';
export default function App() {
const[name, setName] =useState('Earns');

  let [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../sharing/assets/image4.jpg')} style={{width: '100%', height: '100%'}}>
      <Text style={styles.header}> 
     Welcome to {name} Gallery.To pick & share an image click the button below.
      </Text>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
      <Text style={styles.body}> If you're looking for fine art, look no further.</Text>
      </ImageBackground>
      </View>
  );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignContent: 'center',
    margin:0,
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  header: {
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 25,
    lineHeight: 25,
  },
  button: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'Arial',
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
  thumbnail: {
    width: 400,
    height: 480,
    resizeMode: 'cover',
    borderColor: 'red',
    borderRadius: 15,
    padding: 30,
    marginBottom: 12,
    marginRight: 50,
    marginLeft: 8
  },
  body: {
    padding: 20,
    fontSize: 20,
    color: 'white',
  },
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#000000"
  },
});
