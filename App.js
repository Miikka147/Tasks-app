import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import MainScreenNavigator from "./Router";







export default function App() {
  return(
    <View style={styles.container}>
      <StatusBar backgroundColor="#2b2b39" barStyle="light-content"/>
      <MainScreenNavigator/>
    </View>
    
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
   
    },
  });