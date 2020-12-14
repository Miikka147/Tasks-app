import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,  FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { Button, ListItem,Input} from 'react-native-elements';
import * as SQlite from 'expo-sqlite';

/*const firebaseConfig = {
    apiKey: "AIzaSyBOrBEcUVWQZEo5zhudJdl3PqmU0U8-B4Q",
    authDomain: "tasks-b997e.firebaseapp.com",
    databaseURL: "https://tasks-b997e-default-rtdb.firebaseio.com/",
    projectId: "tasks-b997e",
    storageBucket: "tasks-b997e.appspot.com",
    messagingSenderId: "1041755818022",
    
  };



  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }else {
    firebase.app(); // if already initialized, use that one
  }
*/
const db = SQlite.openDatabase('itemdb.db');


export default function Tasks() {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [task, setTask] = useState('');
    const [items, setItems] = useState([]);
  
    /*useEffect(() => {
      firebase.database().ref('data/').on('value', snapshot =>  {
        console.log(snapshot.docs);
        const data = snapshot.val();
         
        const prods = Object.values(data);
        setItems(prods);
        console.log(prods);
        
      });
    }, []);
  
    const saveItem = () => {
      firebase.database().ref('data/').push(
        {
          'task': task,
           'time': date.toString().substr(0,10) + ' at ' + date.toString().substr(15,6)
          }
          );
      setTask('');
      
    }
    const deleteItem = () => {
      firebase.database().ref('data/').remove(0)
      
    }*/
    useEffect(() => {
      db.transaction(tx => {
        tx.executeSql('create table if not exists tasks (id integer primary key not null, task text, time text);');
      });
      updateList();
    }, []);
  
    const saveItem = () => {
      db.transaction(tx => {
        tx.executeSql('insert into tasks (task, time) values (?, ?);', [task, date.toString().substr(0,10) + ' at ' + date.toString().substr(15,6)]);
      }, null, updateList
      )
      setTask('');
    }
    const updateList = () => {
      db.transaction(tx => {
        tx.executeSql('select * from tasks;',[],(_, { rows }) =>
        setItems(rows._array)
        );
      });
    }
  
    function deleteItem(id) {
      console.log(id);
      db.transaction(
        tx => {
          tx.executeSql('delete from tasks where id=?;',[id]);
        },null, updateList
      )
    }



  
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      console.log(currentDate);
    }
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    }
  
    const showDatepicker = () => {
      showMode('date');
    }
  
    const showTimepicker = () => {
      showMode('time');
    }
   

    
  
    return (
      
      <View style={styles.container}>
      <View style={styles.inputscontainer}>
        <View style={styles.inputs}>
      <Input
        placeholder="Type task here"
        onChangeText={text => setTask(text)}
        value={task}
      ></Input></View>
      <View style={{width:'20%'}}>
      <Button containerStyle={{backgroundColor:"rgba(255,255,255,0.0)"}} titleStyle={{color:'black'}}
       type="clear"
       
       title="Date"
       onPress={showDatepicker}/>
      </View>
      <View style={{width:'20%'}}>
      <Button containerStyle={{backgroundColor:"rgba(255,255,255,0.0)"}} titleStyle={{color:'black'}}
        type="clear"
        title="Time"
        onPress={showTimepicker}/>
      </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
  
  
      
      <View style={styles.button}>
      <Button containerStyle={{backgroundColor:"rgba(255,255,255,0.0)"}} titleStyle={{color:'black'}}
        type="clear"
        title="SAVE NEW TASK"
        onPress={saveItem}>
        </Button>
       
      </View>
      
      
      
     
        <FlatList
          keyExtractor={() => Math.random().toString(36).substr(2, 9)}
          data={items}
          renderItem={({item}) =>
            <ListItem containerStyle={{backgroundColor:"rgba(255,255,255,0.3)",borderRadius:15,marginTop:10}}>
              <View style={styles.listitems}>
              <ListItem.Content>
              <ListItem.Title>{item.task}</ListItem.Title>
              <ListItem.Subtitle subtitleStyle={{fontSize:50}}>{item.time}</ListItem.Subtitle>
              </ListItem.Content>
              </View>
                <AntDesign name="delete" size={30} color="white" onPress={() => deleteItem(item.id)} />
            </ListItem>
            
        }
    />
      
  </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#38c28f',
      alignItems: 'center',
      justifyContent: 'center',

      
    },
    button:{
      width:'90%',
      margin:2,
      backgroundColor:'#fff',
      borderRadius:15
      
    },
    inputscontainer:{
      flexDirection:'row',
      width:'90%',
      height:50,
      marginTop:'5%',
      backgroundColor:"#fff",
      alignItems:'center',
      justifyContent:'center',
      borderRadius:15,
      marginBottom:'1%'
    },
    inputs:{
      height:'100%',
      width:200,
      
    },
    
    listitems:{
      
      width:'80%',
    }
  });
