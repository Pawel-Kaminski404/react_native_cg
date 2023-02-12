import * as React from "react"
import { View, Text, StyleSheet } from "react-native"

const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.content}>- An app is using drawer navigation. Press 
            hamburger icon or swipe left-to-right to open it.</Text>
            <Text style={styles.content}>- First screen is a simple to do list. 
            There is an input box which doesn't accept empty string. You can also 
            save your list to local device and load it from there.</Text>
            <Text style={styles.content}>- Second screen is SWAPI. You can find there
            some informations about star wars universe. This screen is communicating
            with external API "https://swapi.dev/api"</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 35,
        alignItems: "center"
    },
    title: {
        fontSize: 40,
        marginBottom: 40,
        fontWeight: "bold",
        textDecorationLine: "underline"
        },
    content: {
        fontSize: 20,
        marginBottom: 40,
        },
});

export default WelcomeScreen