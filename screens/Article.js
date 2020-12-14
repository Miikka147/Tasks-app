import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,  FlatList,Alert, Image,Linking } from 'react-native';
import { Button, ListItem,Input} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';






export default function Article({ navigation }) {
    const article = navigation.getParam('article');
    
 



    
          
      
  return (
    <View style={styles.container}>
        <View style={styles.titlecontainer}>
        <Text style={styles.titles}>
            {article.title}
        </Text>
        </View>
        <Image source={{uri:article.urlToImage}} style={styles.image}/>

        <View style={styles.storycontainer}>
            <Text style={styles.contenttext}>
            {article.content.substring(0, article.content.length - 14)}
            </Text>
            <View style={styles.button}>
                <Button containerStyle={{backgroundColor:"rgba(255,255,255,0.0)"}} titleStyle={{color:'black'}}
                    type="clear"
                    title="READ FULL ARTICLE"
                    onPress={ ()=>{ Linking.openURL(article.url)}} />
            </View>
        </View>


   
      

 
      
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38c28f',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  titlecontainer:{
    borderRadius:15,
    margin:10
  },
  image:{
    height:"40%",
    width:"100%",
    marginBottom:"5%"
  },
  storycontainer:{
    height:"38%",
    width:"90%",
    backgroundColor:"rgba(255,255,255,0.3)",
    borderRadius:15,
    paddingBottom:20,
    justifyContent:'space-evenly'
 
  },
  contenttext:{
    fontSize:20,
    color:'black',
    marginLeft:"5%",
    marginRight:"5%",
    marginTop:"2%",
    marginBottom:"2%"
  },  

  titles:{
    fontWeight:'bold',
    color:'#fff',
    fontSize:25
  },
  button:{
    width:'90%',
    marginLeft:'5%',
    
    backgroundColor:'#fff',
    borderRadius:15
    
  },
 
});
const colors = {
  main:"#38c28f",
  white:"#fff",
  black:"#a4a4a4",
  background:"#f4d6fc"

}
