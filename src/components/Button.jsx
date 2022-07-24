import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({title, onPress, customStyle}) => {
    return (
        <TouchableOpacity style={[styles.button, customStyle]} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    button:{
        borderRadius: 30,
        width: 145,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFE600"
    },
    title:{
        fontSize: 16
    }
})