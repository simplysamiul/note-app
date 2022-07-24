import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../../App';
import Button from '../components/Button';
import Input from '../components/Input';

const SignIn = ({navigation}) => {
    // landel login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");;
    const [loading, setLoading] = useState(false);
    const handelLogin = async () =>{
        setLoading(true)
        try{
            const result = await signInWithEmailAndPassword(auth, email, password)
        }
        catch(error){
            console.log(error)
        }
        
    }
    return (
        <SafeAreaView style={{paddingHorizontal: 25, flex : 1}}>
            <StatusBar />
            <Image source={require('../../assets/img/login_img.png')} 
            style={{alignSelf: "center", width: 300, height: 300}}
            resizeMode= "contain"
            />
            <Text style={{fontSize: 18, fontWeight: "bold", textAlign: "center"}}>
                Never forget your notes
            </Text>
            <View style={{paddingVertical: 16,}}>
                <Input placeholder='Email' autoCapitalize={"none"} onChangeText={(text) => setEmail(text)} />
                <Input placeholder='Password' secureTextEntry onChangeText={(text) => setPassword(text)} />
                <Button onPress={handelLogin} title={"Login"} customStyle={{alignSelf: "center", marginTop : 40}} />
            </View>
            <View style={{flex : 1, alignItems:"center", marginBottom: 20, justifyContent: "flex-end"}}>
                <View style={{flexDirection:"row",}}>
                <Text>Dont have an account ? </Text>
                <Pressable onPress={() => {navigation.navigate('Signup')}}>
                    <Text style={{color: "green", fontWeight: "bold", marginLeft: 10}}>Sign-Up</Text>
                </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignIn;