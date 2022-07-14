import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { useState} from 'react'

export default function App () {

  const [ name, setName ] = useState ('Earns');

  let [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

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
      <ImageBackground source={require('../sharing/assets/image4.jpg')} style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail}/>
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
        <Text style={styles.text}> {name} Gallery wishes you a good day.</Text>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require('../sharing/assets/image4.jpg')} style={styles.container}>
      <Image source={ require('../sharing/assets/moon.jpg')} style={styles.logo} />
      <ImageBackground>
      <Text style={styles.instructions}>
        Welcome to {name} Gallery. To pick & share any photo stored here, click the button below.
      </Text>
      </ImageBackground>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 400,
    height: 200,
    marginBottom: 20,
    borderRaidus: 15,
    padding: 25,
  },
  instructions: {
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
    margin: 20 ,
    letterSpacing: 1,
  },
  button: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 20,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '10',
    color: 'white',
  },
  thumbnail: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  text: {
  fontSize: 28,
  letterSpacing: 1,
  color: 'white',
  marginHorizontal: 16,
  fontWeight: 'bold',
  },
});
