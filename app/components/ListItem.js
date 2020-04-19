import React, {useRef} from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

let colours = ["#F8F8F8", "#F1F1F1"];

export default function ListItem ({item, index, navigation}){
    const inputEl = useRef(null);

    // Add error handling 

    let postponed 
    let homeTeamScore = "0"
    let awayTeamScore = "0"
   
    if (item.$ && item.$.status && item.$.statusText) {
        if (item.$.statusText === "verlegt") {        
            postponed = "postponed" 
        } else if (item.$.statusText === "ausgesetzt") {
            postponed = "suspended" 

        }
    }
    
    if (item.result) {
        homeTeamScore = item.result[0].home[0].$.score
        awayTeamScore = item.result[0].away[0].$.score
    }

    const homeTeam = (item.homeTeam) ? getTeamName(item.homeTeam[0]) : "Error"
    const awayTeam = (item.awayTeam) ? getTeamName(item.awayTeam[0]) : "Error"

    const RightActions = ({ progress, dragX, onPress, item}) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <View style={styles.buttons}>
                <RectButton onPress={() =>  {
                    inputEl.current.close();
                }}>
                    <View style={[styles.rightAction, styles.editAction]}>
                        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
                            Details Page coming
                        </Animated.Text>
                    </View>
                </RectButton>
            </View>
        );
    };

    //Returns a colour based on the index
    function random() {
        if (index % 2 === 0) { //check if its an even number
            return colours[0];
        }else{
            return colours[1];
        }
    } 

    // Returns the home team 
    function getTeamName (item) {
       let teamName
      if (typeof item === 'object') {
        teamName = item["_"]
       } else if (typeof item === 'string' || item instanceof String) {
        teamName = item
       } else {
        teamName = ""
       }
       return teamName
    }

    return (
        <Swipeable  ref={inputEl}
            renderRightActions={(progress, dragX) => (
                <RightActions progress={progress} dragX={dragX} item={item}/>
            )}>
            <View style={styles.row}>
            { postponed && 
                        <Text style={styles.postponed}>
                            {postponed}
                        </Text>
                    }    
                <View style={[styles.container, {backgroundColor: random()}]}>
                    <View style={[styles.homeTeamContainer]}>
                        <Text style={styles.home}>
                            {homeTeam}
                        </Text>
                        <Text style={styles.score}>
                            {homeTeamScore}
                        </Text>
                    </View>
                    <View style={[styles.awayTeamContainer]}>
                        <Text style={styles.away}>
                            {awayTeam}
                        </Text>
                        <Text style={styles.score}>
                            {awayTeamScore}
                        </Text>
                    </View>
                </View>
            </View>
        </Swipeable>
    )

};



const styles = StyleSheet.create({
    row:{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor:"#ccc",
        backgroundColor: '#FFF',
        padding: 10
    },

    container:{
        padding: 10,
        flex: 1, 
        flexDirection: 'row',
        justifyContent: "space-evenly"
    },

    homeTeamContainer:{
        width: "50%",
        flexDirection: 'column',
        justifyContent: "space-evenly"
    },

    awayTeamContainer:{
        width: "50%"
    },

    away: {
        marginTop: 5,
        fontSize: 17,
        lineHeight: 21,
        color: '#000000',
        textAlign: "center"
    },

    home: {
        marginTop: 5,
        fontSize: 17,
        lineHeight: 21,
        color: '#000000',
        textAlign: "center"
    },


    postponed: {
        marginTop: 5,
        marginBottom: 10,
        fontSize: 17,
        lineHeight: 21,
        color: '#000000',
        textAlign: "center"
    },

    score: {
        marginTop: 5,
        fontSize: 17,
        lineHeight: 21,
        color: '#000000',
        textAlign: "center"
    },

    buttons:{
        width: 190,
        flexDirection: 'row'
    },

    rightAction: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: 95,
    },

    editAction: {
        backgroundColor: '#C5C5C5'
    },

    actionText: {
        color: '#fff',
        fontWeight: '600',
        padding: 20,
    }
});

