import React, {useEffect, useState} from 'react';
import {
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
    ActivityIndicator
} from 'react-native';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { parseString } from 'react-native-xml2js';
import { getGames } from "../actions/GameActions";
import ListItem from "./ListItem";

export default function Home({ route }) {
    const dispatch = useDispatch();
   // const { navigation } = props;

    // VARIABLES
    const [isFetching, setIsFetching] = useState(false);

    // Access Redux Store State
    const dataReducer = useSelector((state) => state.dataReducer);
    const { games } = dataReducer;


    // MAIN CODE
    useEffect(() => {
        async function getData () {
            setIsFetching(true);

            let leagueArray = ["BL1N", "BL1S"]
            // let leagueArray = ["BL1N", "BL1S", "BL2N", "BL2O", "BL2S", "BL2W","RLnordost", "RLbayern"]
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
    }, []);


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
            <ListItem item={item} index={index} navigation={route}/>
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

