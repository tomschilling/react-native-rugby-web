import React, {useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import { AppLoading } from 'expo';

import SampleData from '../sample'

//1 - LOADING SCREEN
export default function LoadingScreen({ routes }) {

    console.log("LoadingScreen -> routes", routes)

    useEffect(() => checkLocalData(), []);

    function checkLocalData(){
        //Check if LocalStorage has been populated with the sample data
        AsyncStorage.getItem('games', (err, data) => {
            //if it doesn't exist, extract from json fil
            if (data === null){
                AsyncStorage.setItem('games', JSON.stringify(SampleData.games));//save the initial data in Async

                routes.navigate('Home'); //Navigate to the home page
            }else{
                routes.navigate('Home'); //Navigate to the home page
            }
        });
    }

    return <AppLoading/>;
}