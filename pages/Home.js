import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Main from '../components/Main';

export default function About() {
  return (
    <View style={styles.container}>
      <Header/>
      <Text>Home</Text>
      <Main/>
      <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'pink',
  },
});
