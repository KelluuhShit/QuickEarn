import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import cookingImg from '../assets/assesWelcome/cookingImg.png';
import { useAuth } from '../context/AuthContext';

const CookingWelcome = () => {
    const { username } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    return (
        <View style={styles.welcomePage}>
            {isLoading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#4D869C" />
                </View>
            )}

            <Image
                source={cookingImg}
                style={styles.cookingImg}
                onLoad={() => setIsLoading(false)} // Hide loader when image is loaded
            />
            
            {!isLoading && (
                <>
                    <Text style={styles.greeting}>Welcome, {username}!</Text>
                    <Text style={styles.infoText}>
                        You're about to start the Cooking and Culinary Arts.
                        Please complete it within 30 minutes.
                        Upon completion, you'll receive a certificate confirming your eligibility
                        to undertake tasks.
                    </Text>
                </>
            )}

            {!isLoading && (
                <TouchableOpacity style={styles.startBtn}>
                <Text style={styles.startText}>Start</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    welcomePage: {
        flex: 1,
        flexDirection:'column',
        justifyContent:'center',
        gap:40,
        alignItems: 'center'
    },
    cookingImg: {
        height: 200,
        width: 200,
    },
    loaderContainer: {
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    greeting: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#4D869C',
    },
    infoText: {
        fontSize: 15,
        marginHorizontal: 20,
        color: '#7AB2B2',
    },
    startBtn:{
        borderWidth:2,
        borderColor:'#7AB2B2',
        paddingVertical:10,
        paddingHorizontal:100,
        borderRadius:50,
    },
    startText:{
        color:"#7AB2B2",
    },
});

export default CookingWelcome;
