import { signOut } from 'firebase/auth';
import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { auth } from '../../App';

const Home = () => {
    const handelsignOut = () =>{
        signOut(auth)
        .then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flexDirection: "row", justifyContent: "center", padding: 20}}>
                <Text>My Note</Text>
            </View>
        </SafeAreaView>
    );
};

export default Home;