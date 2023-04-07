import { useState, useRef } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, SafeAreaView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import ImageViewer from './components/ImageViewer';
import User from './components/User';
import Button from './components/Button';
import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';

// import Home from './pages/Home';
// import About from './pages/About';
// import {Link, NativeRouter, Route, Routes} from "react-router-native";

const PlaceholderImage = require("./assets/images/orange.png");

export default function App() {
  const imageRef = useRef();

  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [selectedImage, setSelectImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  // const [age, setAge] = useState(18);
  // const handleChangeAge = () => {
  //   setAge(23);
  // }

  // const [user, setUser] = useState(null);

  // const login = () => {
  //   // Ouverture caméra 
  //   // Prendre en photo le QR Code
  //   // Récupérer UUID
  //   // Fetch de l'api d'authentification avec l'UUID
  //   // Si l'UUID existe, on continue le programme 
  //   const data = {
  //     firstname: 'Enis',
  //     lastname: 'MERMER',
  //     isAdmin: true
  //   }
  //   setUser(data);

  // }

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
  } else {
    domtoimage
      .toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        })
      .then(dataUrl => {
        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      })
      .catch(e => {
        console.log(e);
      });
    }
  };


  return (
    // <NativeRouter>
    //   <Routes>
    //   <Route exact path="/" element={<Home/>} />
    //   <Route path="/about" element={<About/>} />
    //   </Routes>
    // </NativeRouter>

    // <SafeAreaView style={styles.container}>
    //     <View style={styles.imageContainer}>
    //       <ImageViewer toto={PlaceholderImage}></ImageViewer>
    //       <Text style={styles.color}>{age}</Text>
    //       <Button
    //         title="Appuie"
    //         onPress={handleChangeAge}
    //       />
    //       <Button
    //         title="Login"
    //         onPress={login}
    //       />
    //       {user != null && <Text>{user.name}</Text>}
          
    //     </View>

    //      {user != null && <User props={user}/>}
    //    </SafeAreaView>

    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji !== null ? ( <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> ) : null}
        </View>
      </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
            <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
          </View>
        )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58
  },
  footerContainer: {
    flex: 1 /3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
