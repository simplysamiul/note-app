import React, { useState } from 'react';
import {  ActivityIndicator, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../App';
import { addDoc, collection, getDocs, doc, setDoc, onSnapshot, query, where } from "firebase/firestore";



// gender option
const genderOptions = ["Male", "Female"]

const SignUp = ({navigation}) => {
    const [gender, setGender] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handelSignUp = async () =>{
        setLoading(true);
        try{
            // create user with email and password
            const result = await createUserWithEmailAndPassword(auth, email, password)
            // add user profile to databse
            await addDoc(collection(db, "users"), {
                name,
                email,
                age,
                gender,
                uid : result.user.uid
            })
            if(result.user.uid){

            }
            setLoading(false)
        }catch(error){
            console.log(error.message)
            setLoading(false)
           
        }
        
    }
    return (
        <SafeAreaView style={{paddingHorizontal: 25, flex : 1}}>
            <StatusBar />
            <Text style={{fontSize: 18, fontWeight: "bold", textAlign: "center", marginTop: 20}}>
                Never forget your notes
            </Text>
            {loading ? <ActivityIndicator color="blue" size="large" />
            :<View style={{paddingVertical: 16,}}>
                <Input placeholder='Full Name'
                autoCapitalize={"words"} 
                onChangeText={(text) => setName(text)} />
                <Input placeholder='Email'
                autoCapitalize={"none"}
                onChangeText={(text) => setEmail(text)} />
                <Input placeholder='Age' 
                onChangeText={(text) => setAge(text)} />
                <Input placeholder='Password' secureTextEntry 
                onChangeText={(text) => setPassword(text)}/>


                {
                    genderOptions.map((option) => {
                        const selected = option === gender;
                        return(
                        <Pressable 
                            onPress={() => setGender(option)} 
                            key={option} 
                            style={styles.radioContainer}>

                            <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
                                <View style={[styles.inerCircle, selected && styles.selectedInnerCircle]} />
                            </View>
                            <Text stylew={styles.radioText}>{option}</Text>

                        </Pressable>
                        )
                    })
                }
                <Button
                onPress={handelSignUp}
                title={"Sign-up"} 
                customStyle={{alignSelf: "center", 
                marginTop : 40}} />
            </View>}
            <View style={{flex : 1, 
                alignItems:"flex-end", 
                marginBottom: 20, 
                justifyContent: "center",
                flexDirection: "row"
                }}>
                <View style={{flexDirection:"row",}}>
                <Text>Already have an account ? </Text>
                <Pressable onPress={() => {navigation.navigate("Signin")}}>
                    <Text style={{color: "green", fontWeight: "bold", marginLeft: 10}}>Login</Text>
                </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignUp;


const styles = StyleSheet.create({
    radioContainer : {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    outerCircle : {
        height: 30,
        width: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#cfcfcf",
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    inerCircle:{
        height: 15,
        width: 15,
        borderRadius: 7.5,
        borderWidth: 1,
        borderColor: "#cfcfcf",
    },
    radioText :{

    },
    selectedOuterCircle : {
        borderColor: "orange",
    },
    selectedInnerCircle : {
        backgroundColor: "orange",
        borderColor: "orange"
    }

})