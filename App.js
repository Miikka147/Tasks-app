import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native'; 
import MainScreenNavigator from "./Router";


export default function App() {
  return(
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="light-content"/>
      <MainScreenNavigator/>
    </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });