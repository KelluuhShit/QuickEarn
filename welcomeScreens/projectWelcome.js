import React, { useState, useEffect  } from 'react';
import { View, StyleSheet, Image, Text, ActivityIndicator, TouchableOpacity, Modal, Alert, ProgressBarAndroid } from 'react-native';
import projectImg from '../assets/assesWelcome/projectImg.png';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import ProjectManagementQuestions from '../assesments/projectManagementQuestions';
import ProgressBar from 'react-native-progress/Bar';
import CertificatePage from '../certification/cerificate';

const ProjectWelcome = ({ closeModal }) => {
    const { username } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [assesmentModal, setAssesmentModal] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Keep track of the current question
    const [selectedOption, setSelectedOption] = useState(null); // Track selected option
    const [score, setScore] = useState(0); // Track user's score
    const [quizCompleted, setQuizCompleted] = useState(false); // Track quiz completion
    const [remainingTime, setRemainingTime] = useState(30 * 60);

    const currentQuestion = ProjectManagementQuestions[currentQuestionIndex];

    const handleOptionPress = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption === currentQuestion.answer) {
            setScore(score + 1); // Increment score if answer is correct
        }
        
        if (currentQuestionIndex < ProjectManagementQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null); // Reset selected option for next question
        } else {
            // Quiz is completed
            setQuizCompleted(true);
        }
    };

    const calculateProgress = () => {
        return score / ProjectManagementQuestions.length;
    };

    const progressBarColor = calculateProgress() < 0.5 ? '#6c757d' : '#4CAF50';

    useEffect(() => {
        if (assesmentModal && !quizCompleted) {
            const timer = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setQuizCompleted(true);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timer); // Cleanup on unmount
        }
    }, [assesmentModal, quizCompleted]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };

    const currentQuestionNumber = currentQuestionIndex + 1; // Start at 1
    const remainingQuestions = ProjectManagementQuestions.length - currentQuestionNumber + 1;

    const getPerformanceLevel = () => {
        const percentage = (score / ProjectManagementQuestions.length) * 100;
        if (percentage <= 30) {
            return 'belowaverage'; // Ensure this matches with your options
        } else if (percentage <= 60) {
            return 'average'; // Ensure this matches with your options
        } else {
            return 'excellent'; // Ensure this matches with your options
        }
    };

    useEffect(() => {
        if (quizCompleted) {
            const performanceLevel = getPerformanceLevel().toLowerCase();
            setSelectedOption(performanceLevel);
        }
    }, [quizCompleted, score]);

    

    return (
        <View style={styles.welcomePage}>
            {isLoading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#6c757d" />
                </View>
            )}

            <Image
                source={projectImg}
                style={styles.projectImg}
                onLoad={() => setIsLoading(false)}
            />

            {!isLoading && !quizCompleted && (
                <>
                    <Text style={styles.greeting}>Participant: {username}</Text>
                    <Text style={styles.infoText}>
                        You're about to start the Project Management assessment.
                        Please complete it within 30 minutes.
                        Upon completion, you'll receive a certificate confirming your eligibility
                        to undertake tasks.
                    </Text>
                </>
            )}

            {!isLoading && !quizCompleted && (
                <TouchableOpacity style={styles.startBtn} onPress={() => setAssesmentModal(true)}>
                    <Text style={styles.startText}>Start</Text>
                </TouchableOpacity>
            )}

            {!isLoading && (
                <View style={styles.powerTittle}>
                    <Text style={styles.powerTittleText}>powered by summit tests</Text>
                    <Ionicons name="shield-checkmark-outline" size={11} color="#6c757d" />
                </View>
            )}

            {/* Assessment modal */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={assesmentModal}
                onRequestClose={() =>
                    Alert.alert(
                        'Warning!',
                        'Your progress will be lost and you will fail the assessment',
                        [
                            {
                                text: 'Close Anyway',
                                onPress: () => {
                                    setAssesmentModal(false); // Close current modal
                                    closeModal(); // Close the modal in LearnScreen
                                },
                                style: 'destructive',
                            },
                            {
                                text: 'OK',
                                style: 'default',
                            },
                        ],
                        { cancelable: true }
                    )
                }
            >
                <View style={styles.assesmentModal}>
                    {!quizCompleted ? (
                        <View style={styles.container}>
                            <View style={styles.infoContainer}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name="timer-outline" size={20} color="#6c757d" />
                                    <Text style={styles.timeText}>{formatTime(remainingTime)}</Text>
                                </View>
                                <View style={styles.iconContainer}>
                                    <Ionicons name="document-text-outline" size={20} color="#6c757d" />
                                    <Text style={styles.quizText}>{currentQuestionNumber}/{ProjectManagementQuestions.length}</Text>
                                </View>
                            </View>
                            <Text style={styles.questionText}>{currentQuestion.question}</Text>
                            {currentQuestion.options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.optionButton,
                                        selectedOption === option && styles.selectedOption, // Add border color to the selected option
                                    ]}
                                    onPress={() => handleOptionPress(option)}
                                >
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}

                            <TouchableOpacity
                                style={[styles.nextButton, !selectedOption && styles.disabledButton]} // Disable button if no option is selected
                                onPress={handleNextQuestion}
                                disabled={!selectedOption} // Button is inactive unless an option is selected
                            >
                                <Text style={styles.nextButtonText}>Next Question</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        // Quiz completion and progress display
                        <View style={styles.resultContainer}>
                            {/* Existing content */}
                            <View style={styles.existingContent}>
                                <Text style={styles.resultText}>
                                    Assessment completed! Your score is {score} out of {ProjectManagementQuestions.length}.
                                </Text>
                                <ProgressBar
                                    progress={calculateProgress()}
                                    width={300}
                                    height={20}
                                    color={progressBarColor} // Use dynamic color
                                    borderColor="#ccc"
                                    borderRadius={20}
                                />
                                <Text style={styles.performanceText}>
                                    Performance: {getPerformanceLevel()}
                                </Text>
                            </View>

                            {/* New content */}
                            <View style={styles.newContent}>
                                    <TouchableOpacity
                                        style={[styles.radioButton, selectedOption === 'excellent' && { backgroundColor: '#ddd' }]}
                                        disabled={true}
                                    >
                                        <View style={styles.radioCircle}>
                                            {selectedOption === 'excellent' && <View style={styles.selectedRb} />}
                                        </View>
                                        <Text>Excellent - $1</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.radioButton, selectedOption === 'average' && { backgroundColor: '#ddd' }]}
                                        disabled={true}
                                    >
                                        <View style={styles.radioCircle}>
                                            {selectedOption === 'average' && <View style={styles.selectedRb} />}
                                        </View>
                                        <Text>Average - $2</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.radioButton, selectedOption === 'belowaverage' && { backgroundColor: '#ddd' }]}
                                        disabled={true}
                                    >
                                        <View style={styles.radioCircle}>
                                            {selectedOption === 'belowaverage' && <View style={styles.selectedRb} />}
                                        </View>
                                        <Text>Below Average - $3</Text>
                                    </TouchableOpacity>
                                </View>

                                {/*certification Page */}

                                <View>
                                    <CertificatePage/>
                                </View>
                        </View>

                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    welcomePage: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 40,
        alignItems: 'center',
    },
    projectImg: {
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
    startBtn: {
        borderWidth: 2,
        borderColor: '#6c757d',
        paddingVertical: 10,
        paddingHorizontal: 100,
        borderRadius: 50,
    },
    startText: {
        color: '#6c757d',
    },
    powerTittle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    powerTittleText: {
        fontSize: 11,
        color: '#6c757d',
    },
    assesmentModal: {
        flex:1,
        backgroundColor: '#fff',
    },
    container: {
        flex:1,
        justifyContent: 'center',
        padding: 20,
        width: '100%',
        gap:10,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    optionButton: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        borderWidth: 1, // Add default border
        borderColor: 'transparent', // Default no color
    },
    selectedOption: {
        borderColor: '#6c757d', // Highlight selected option border
        borderWidth: 2,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    nextButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#6c757d',
        borderRadius: 50,
        width: '100%',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#ccc', // Greyed-out color for disabled state
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    existingContent: {
        alignItems: 'center',
        padding:20,
        width:'100%',
        backgroundColor:'#f0f0f0'
    },
    resultText: {
        fontSize: 20,
        marginBottom: 20,
        color: '#6c757d',
        textAlign:'center',
    },
    progressBarWrapper: {
        width: '100%', // Adjust the width as needed
        height: 10, // Adjust the height as needed
        borderRadius: 5, // Round the corners
        overflow: 'hidden', // Hide overflow to maintain rounded corners
        borderColor: '#6c757d',
        borderWidth: 1, // Border around the progress bar
        backgroundColor: '#f0f0f0', // Background color behind the progress bar
    },
    progressBar: {
        flex:1,
        width:'100%',
        height: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        borderRadius: 2,
        position: 'absolute', // Position the container absolutely
        top: 10, // Align it to the top
        left: 10, // Make sure it stretches across the screen
        right: 10, // Ensure full width
        zIndex: 1, // Place it above other content
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    timeText: {
        fontSize: 16,
        marginLeft: 5,
        color: '#6c757d',
    },
    quizText: {
        fontSize: 16,
        marginLeft: 5,
        color: '#6c757d',
    },
    performanceText:{
        color:'#6c757d',
        marginTop:10,
    },
    newContent:{
        marginTop:20,
        margin:10,
        borderWidth:1,
        borderColor:'#f0f0f0',
        padding:10,
        borderRadius:10,

    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth:1,
        borderColor:'#f0f0f0',
        padding:10,
        justifyContent:'space-between',
        borderRadius:5,
        backgroundColor:'#f0f0f0',
        paddingVertical:15,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#444',
    },
});

export default ProjectWelcome;
