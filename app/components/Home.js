import React, {useEffect, useState} from 'react';
import {
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
    ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { parseString } from 'react-native-xml2js';
import { getGames } from "../actions/GameActions";
import ListItem from "./ListItem";

export default function Home(props) {
    const dispatch = useDispatch();
    const { navigation } = props;

    //1 - DECLARE VARIABLES
    const [isFetching, setIsFetching] = useState(false);

    //Access Redux Store State
    const dataReducer = useSelector((state) => state.dataReducer);
    const { games } = dataReducer;

    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {

        async function getData () {

            setIsFetching(true);

            const allMatches = await getAllMatches()

            dispatch(getGames(allMatches));

            setIsFetching(false)
            
        }
        getData()
    }, []);


    async function getAllMatches() {

        let matches = []
        let leagueArray = ["BL1N", "BL1S"]

        for (league of leagueArray) {

            console.log("getAllMatches -> league", league)
        
             const url = 'http://www.rugbyweb.de/db2xml.php?dtd=rugbyweb1.0&league=' + league
             console.log("getAllMatches -> url", url)
     
             const response = await fetch(url)
             const text = await response.text()
             let extractedData
             parseString(text, function(err,result){
                 extractedData = JSON.stringify(result)
             });
             const leagueData = JSON.parse(extractedData)
             const leagueMatches = leagueData.rwleague.matches[0].match
        
             matches.push.apply(matches, leagueMatches);

         }

         return new Promise(resolve => {
            resolve(matches)
          });
    }
    //==================================================================================================

    //4 - RENDER FLATLIST ITEM
    const renderItem = ({item, index}) => {
        return (
            <ListItem item={item} index={index} navigation={navigation}/>
        )
    };

    //==================================================================================================

    //7 - RENDER
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

                {/* <TouchableHighlight style={styles.floatingButton}
                                    underlayColor='#ff7043'
                                    onPress={() => navigation.navigate('NewQuote', {title:"New Quote"})}>
                    <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                </TouchableHighlight> */}
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

