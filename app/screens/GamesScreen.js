import React, {useEffect, useState} from 'react';
import {
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { parseString } from 'react-native-xml2js';
import { getGames } from "../actions/GameActions";
import GamesListItem from "../components/GamesListItem";
import { useFocusEffect } from '@react-navigation/native';

export default function Games({ navigation }) {
    const dispatch = useDispatch();

    // User can not go back to SplashScreen
    navigation.canGoBack(false)

    // Variables
    const [isFetching, setIsFetching] = useState(false);

    // Access Redux Store State
    const gamesReducer = useSelector((state) => state.gamesReducer);
    const { games } = gamesReducer;

    // Fetch games when th screen is focused
    useFocusEffect(
        React.useCallback(() => {
            async function getData () {
    
                setIsFetching(true);

                const settingsString = await AsyncStorage.getItem('settings')
                const settingsArr = JSON.parse(settingsString)
    
                let leagueArray = []
                for (let { leagueKey, leagueState } of settingsArr) {
                    if (leagueState) leagueArray.push(leagueKey)          
                }
    
                const matches = await getAllMatches(leagueArray)
    
                const sortedMatches = matches.sort(function(a, b) {
                    const aDate = moment(a.$.date, "DD.MM.YYYY").toISOString()
                    const bDate = moment(b.$.date, "DD.MM.YYYY").toISOString()
                    return moment(aDate).diff(moment(bDate))
                });
    
                dispatch(getGames(sortedMatches));
    
                setIsFetching(false)
            }
            getData()
      
            return () => {
              // Do something when the screen is unfocused

            };
          }, [])
    )

    async function getAllMatches(leagueArray) {
        let matches = []
        for (league of leagueArray) {
            try {          
                const leagueMatches = await getLeagueMatches(league).catch((e) => { throw e })
                matches.push.apply(matches, leagueMatches);
            } catch (error) {          
                console.log("ERROR - ", error)
            }
         }

         return new Promise(function(resolve, reject) {
              if (matches) {
                resolve(matches);
              }
            });
    }

    async function getLeagueMatches(league) {
        try {
            const url = 'http://www.rugbyweb.de/db2xml.php?dtd=rugbyweb1.0&league=' + league  

            const response = await fetch(url).catch((e) => { throw e })
            const text = await response.text().catch((e) => { throw e })
    
            let extractedData
            parseString(text, function(err,result){
                extractedData = JSON.stringify(result)
            });
    
            const leagueData = JSON.parse(extractedData)
            const leagueMatches = leagueData.rwleague.matches[0].match
    
            return new Promise(resolve => {
                if (leagueMatches) {
                    resolve(leagueMatches);
                  }
              });
        } catch (error) {  
            return new Promise(reject => {
                console.log("ERROR - ", error, league)
                reject(`Error while fetching data for ${league}`);
              });
        }
    }


    const renderItem = ({item, index}) => {
        return (
            <GamesListItem item={item} index={index} navigation={navigation}/>
        )
    };

    // RENDER
    if (isFetching) {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator animating={true}/>
            </View>
        );
    } else{
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={games}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `games_${index}`}/>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});

