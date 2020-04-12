import React, {useRef} from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

let colours = ["#F8F8F8", "#F1F1F1"];

export default function ListItem ({item, index, navigation}){
    const inputEl = useRef(null);

    const homeTeam  = typeof item.homeTeam[0] === "object" ? item.homeTeam[0]["_"] : item.homeTeam[0]   
    const awayTeam = item.awayTeam[0]

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

    return (
        <Swipeable  ref={inputEl}
            renderRightActions={(progress, dragX) => (
                <RightActions progress={progress} dragX={dragX} item={item}/>
            )}>
            <View style={styles.row}>
                <View style={[styles.container, {backgroundColor: random()}]}>
                    <Text style={styles.home}>
                        {homeTeam}
                    </Text>
                    <Text style={styles.guest}>
                        {awayTeam}
                    </Text>
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
        padding: 10
    },

    guest: {
        marginTop: 25,
        marginBottom: 5,
        fontSize: 17,
        color: '#000000',
        textAlign: "right"
    },

    home: {
        marginTop: 5,
        fontSize: 17,
        lineHeight: 21,
        color: '#000000',
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