import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import cookingImg from '../assets/assesWelcome/cookingImg.png';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const CookingWelcome = () => {
    const { username } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    return (
        <View style={styles.welcomePage}>
            {isLoading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#6c757d" />
                </View>
            )}

            <Image
                source={cookingImg}
                style={styles.cookingImg}
                onLoad={() => setIsLoading(false)} // Hide loader when image is loaded
            />
            
            {!isLoading && (
                <>
                    <Text style={styles.greeting}>Participant: {username}</Text>
                    <Text style={styles.infoText}>
                        You're about to start the Cooking and Culinary Arts assesment.
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

            {!isLoading && (
                <View style={styles.powerTittle}>
                <Text style={styles.powerTittleText}>powered by summit tests</Text>
                <Ionicons name="shield-checkmark-outline" size={11} color="#6c757d" />
                </View>
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
        color: '#6c757d',
    },
    infoText: {
        fontSize: 15,
        marginHorizontal: 20,
        color: '#6c757d',
    },
    startBtn:{
        borderWidth:2,
        borderColor:'#6c757d',
        paddingVertical:10,
        paddingHorizontal:100,
        borderRadius:50,
    },
    startText:{
        color:"#6c757d",
    },
    powerTittle:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:5,
    },
    powerTittleText:{
        fontSize:11,
        color:"#6c757d",
    }
});

export default CookingWelcome;
