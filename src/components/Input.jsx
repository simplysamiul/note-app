import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = ({placeholder, secureTextEntry = false, onChangeText, autoCapitalize}) => {
    return (
        <TextInput 
        placeholder={placeholder} 
        style={styles.input} 
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
        />
    );
};

export default Input;


const styles = StyleSheet.create({
    input : {
        height: 48,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc", 
        paddingHorizontal: 8,
        marginBottom: 25,

    }
})