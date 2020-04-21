import React, {useEffect, useState} from 'react';
import {
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings } from "../actions/SettingsActions";
import SettingsListItem from "../components/SettingsListItem";
import SampleData from '../sample'



export default function Settings({ route }) {
    const dispatch = useDispatch();
   // const { navigation } = props;

    // VARIABLES
    const [isFetching, setIsFetching] = useState(false);

    // Access Redux Store State
    const dataReducer = useSelector((state) => state.dataReducer);
    const { settings } = dataReducer;


    //2 - MAIN CODE BEGINS HERE
    useEffect(() => getData(), []);

    //==================================================================================================

    //3 - GET FLATLIST DATA
    const getData = () => {
        setIsFetching(true);

        AsyncStorage.getItem('settings', (err, data) => {
        console.log("getData -> data", data)
          
            //if it doesn't exist, extract from json fil
            if (data === null){
                AsyncStorage.setItem('settings', JSON.stringify(SampleData.settings));//save the initial data in Async
            } else {
              dispatch(getSettings(JSON.parse(data)));
            }
        });

      //getSettings(JSON.parse(settings)));


      setIsFetching(false);
    };

    const renderItem = ({item, index}) => {
        return (
            <SettingsListItem item={item} index={index} navigation={route}/>
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
                    data={settings}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `settings_${index}`}/>
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

