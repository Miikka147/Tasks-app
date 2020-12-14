import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';



export default function Weather() {
const [weather, setWeather] = useState(null);


const getLocation = async()   => {
  let   { status} = await Location.requestPermissionsAsync();
  if (status !==   'granted') {
    Alert.alert('No permission to access location');
  } else {
    let loc = await Location.getCurrentPositionAsync({});
    console.log(loc);
    getWeather(loc);
  }
};

  const getWeather = async (loc) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+loc.coords.latitude+'&lon='+loc.coords.longitude+'&APPID=2b2fc0a21bdeb3b150fc9d741055fabd';
    
    try {
      const response = await fetch(url);
      const weatherData = await response.json();
      setWeather(weatherData);
      
    } catch(e){
      Alert.alert('Error!')
    }
  }
   
  useEffect(() => { getLocation() }, []);


  if(weather !== null) {
    return (
  <View style={styles.container}>
    <View style={styles.weather}>
      <View style={styles.weatherholder}>
      <Image source={{uri:"http://openweathermap.org/img/wn/"+ weather.weather[0].icon + "@2x.png"}} style={styles.weathericon}/>
      <View>
      <Text style={styles.temptext}>{(parseInt(weather.main.temp)-273.15).toFixed(0).toString()} C</Text>
        <Text style={styles.citytext}>{weather.name}</Text>
      </View>
        </View>
    </View>
    <View style={styles.info}>
      <View style={styles.infoholder}>
        <Text style={styles.infoheader}>{weather.weather[0].main}</Text>
        <View>
        <Text style={styles.infotext}>Temperature feels like: {(parseInt(weather.main.feels_like)-273.15).toFixed(0).toString()} C</Text>
        <Text style={styles.infotext}>Humidity: {weather.main.humidity} %</Text>
        <Text style={styles.infotext}>Wind: {weather.wind.speed} m/s</Text>
        </View>
      </View>
    </View>
  </View>

  );
}else{
  return(
    <View style={styles.container}>
      
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38c28f',
    justifyContent:'flex-start',
  },
  box: {
    paddingTop: 70,
    padding:20,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  weather:{
    height:"40%",
    width:"100%",
    justifyContent: "center",
    alignItems:"center",
    flexDirection:"row",

  },
  weatherholder:{
    height:"80%",
    width:"90%",
    backgroundColor:"rgba(255,255,255,0.3)",
    borderRadius:15,
    alignItems:"center",
    flexDirection:"row"
  },
  temptext:{
    fontSize:40,
    color:'#fff'
  },
  citytext:{
    fontSize:25,
    color:'grey'
  }
  ,
  weathericon:{
    height:"40%",
    width:"40%",
    marginBottom:"5%"
  },
  info:{
    height:"45%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  infoholder:{
    height:"80%",
    width:"90%",
    backgroundColor:"rgba(255,255,255,0.3)",
    borderRadius:15
  },
 infoheader:{
   fontSize:30,
   color:"#fff",
   marginLeft:"10%",
   marginTop:"10%"
 },
 infotext:{
   fontSize:15,
   color:'grey',
   marginLeft:"10%",
   marginTop:"2%"
 }
});
const colors = {
  main:"#38c28f",
  white:"#fff",
  black:"#a4a4a4",
  background:"#f4d6fc"

}