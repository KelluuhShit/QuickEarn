import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import projectImg from '../assets/assesWelcome/projectImg.png';
import { useAuth } from '../context/AuthContext';

const ProjectWelcome = () => {
    const { username } = useAuth();

    return (
        <View style={styles.welcomePage}>
                <Image
                    source={projectImg}
                    style={styles.projectImg}
                />
                
                <Text style={styles.greeting}>Welcome, {username}!</Text>
                <Text style={styles.infoText}>
                    You're about to start the Project Management assessment.
                    Please complete it within 30 minutes. 
                    Upon completion, you'll receive a certificate confirming your eligibility 
                    to undertake tasks.
                </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    welcomePage:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    projectImg: {
        height: 200,
        width: 200,
    },
    projectContent: {
        alignItems: 'center',
        // width:'100%',
    },
    greeting: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color:'#4D869C',
    },
    infoText: {
        fontSize: 15,
        marginHorizontal: 20,
        color:'#7AB2B2',
    },
});

export default ProjectWelcome;
