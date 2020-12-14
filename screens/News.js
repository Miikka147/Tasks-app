import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,  FlatList,Alert } from 'react-native';
import { Button, ListItem,Input} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationHelpersContext } from '@react-navigation/native';



import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';






export default function News({navigation}) {
  const [allnews, setAllnews] = useState([]);


    
          
            const getNews = async () => {
              const url = 'http://newsapi.org/v2/top-headlines?category=general&country=us&apiKey=080194b5c545452f9d03847e1719fced'
              
              try {
                const response = await fetch(url);
                const newsData = await response.json();
                setAllnews(newsData.articles);
                console.log(newsData.articles)
                
              } catch(e){
                Alert.alert('Error!')
              }
            }
             
            useEffect(() => { getNews() }, []);

            if(allnews !== null) {
  return (
    
    <View style={styles.container}>
  
                  
      <FlatList
          keyExtractor={() => Math.random().toString(36).substr(2, 9)}
          data={allnews}
          
          renderItem={({item}) =>
          
            <ListItem 
            onPress={() => navigation.navigate('Article',{article:item})}
            containerStyle={{backgroundColor:"rgba(255,255,255,0.3)",borderRadius:15,marginTop:10}}>
              <View style={styles.listitems}>
              <ListItem.Content>
              <ListItem.Title style={styles.titles}>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
              
              </ListItem.Content>
              </View>
  
                
            </ListItem>
            
        }
    />
   
      

 
      
    </View>
  );
}else{
  return(
    <View style={styles.container}>

    <Text>Ei haettuja tietoja</Text>
    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38c28f',
    
    justifyContent:'flex-start',
  },
  titles:{
    fontWeight:'bold',
    color:'#fff',
    fontSize:25
  }
 
});
const colors = {
  main:"#38c28f",
  white:"#fff",
  black:"#a4a4a4",
  background:"#f4d6fc"

}
