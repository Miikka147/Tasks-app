import React from 'react';
import { StyleSheet, Text, View } from 'react-native'; 
import { createAppContainer} from "react-navigation";
import { createMaterialTopTabNavigator} from "react-navigation-tabs";
import { createStackNavigator} from "react-navigation-stack";

import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import News from "./screens/News";
import Tasks from "./screens/Tasks";
import Weather from "./screens/Weather";
import Article from "./screens/Article";



const Tabs = createMaterialTopTabNavigator(
    {
    Tasks: {
        screen : Tasks,
        navigationOptions : {
            tabBarLabel : ({})=> (
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name="clipboard-text"
                        size={30}
                        style={{ color: colors.white }}/>
                </View>
            ),
        },
    },
    Weather: {
        screen : Weather,
        navigationOptions : {
            tabBarLabel : ({})=>(
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name="weather-cloudy-arrow-right"
                        size={30}
                        style={{ color: colors.white }}/>
                </View>
            ),
        },
    },
    News: {
        screen : News,
        navigationOptions : {
            tabBarLabel : ({})=>(
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name="newspaper"
                        size={30}
                        style={{ color: colors.white }}/>
                </View>
            ),
        },
    },

 
},
{
    initialRouteName : "Tasks",
    lazyLoad : true,
    tabBarPosition : "top",
    swipeEnabled : true,
    tabBarOptions : {
        style : {
            height : 60,
            backgroundColor: "#38c28f",
            paddingBottom: 3,
            paddingTop : 3,
        },
        activeTintColor : '#fff',
        inactiveTintColor: 'gray',
    },
},
);

const MainScreenNavigator = createStackNavigator({
    Tabs: {
        screen: Tabs,
        navigationOptions: {
            title: 'Tasks-app',
            headerTitleStyle:{color:'#fff'},
            headerStyle: {
                backgroundColor: '#38c28f',
                
            },
        },
    },
    Article: {
        screen : Article,
        
    },
});

export default createAppContainer(MainScreenNavigator);



const styles = StyleSheet.create({
    iconContainer : {
        justifyContent : "center",
        alignItems: "center",
        alignContent : "center"
    }
})
const colors = {
    main:"#38c28f",
    white:"#fff",
    black:"#a4a4a4",
    background:"#f4d6fc"
  
  }