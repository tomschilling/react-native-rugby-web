import React, {useRef} from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

let colours = ["#F8F8F8", "#F1F1F1"];

export default function ListItem ({item, index, navigation}){
    const inputEl = useRef(null);

    // @TODO: Add error handling 

    let reason 
    let homeTeamScore = "0"
    let awayTeamScore = "0"
   
    if (item.$ && item.$.status && item.$.statusText) {
        // @TODO: Better to check for status code
        if (item.$.statusText === "verlegt") {        
            reason = "postponed" 
        } else if (item.$.statusText === "ausgesetzt") {
            reason = "suspended" 
        }
        else if (item.$.statusText === "abgesagt") {
            reason = "cancelled" 
        }
    }
    
    if (item.result) {
        homeTeamScore = item.result[0].home[0].$.score
        awayTeamScore = item.result[0].away[0].$.score
    }

    const homeTeam = (item.homeTeam) ? getTeamName(item.homeTeam[0]) : "Error"
    const awayTeam = (item.awayTeam) ? getTeamName(item.awayTeam[0]) : "Error"

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
        <View style={styles.row}>
        { reason && 
                    <Text style={styles.reason}>
                        {reason}
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

    home: {
        marginTop: 5,
        fontSize: 17,
        lineHeight: 21,
        color: '#000000',
        textAlign: "center"
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

    reason: {
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
    }

});

