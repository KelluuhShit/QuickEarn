import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert, Image, ScrollView, FlatList  } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import bonusImg from '../assets/homeImg/bonus.png';
import defaultPhoto from '../assets/homeImg/defaultUserPhoto.png';

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';




const HomeScreen = () => {
  const { username } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [surveyModalVisible, setSurveyModalVisible] = useState(false);
  
  
  const flatListRef = useRef(null);

  const handleTopicPress = (item, index) => {
    setSelectedTopic(item);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
    }
  };

  useEffect(() => {
    if (username) {
      setModalVisible(true);
    }
  }, [username]);

  useEffect(() => {
    const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        return 'Good Morning';
      } else if (currentHour < 18) {
        return 'Good Afternoon';
      } else {
        return 'Good Evening';
      }
    };
    setGreeting(getGreeting());
  }, []);

  useEffect(() => {


    if (!selectedTopic && surveyTopics.length > 0) {
      setSelectedTopic(surveyTopics[0]);
    }
  }, [surveyTopics, selectedTopic]);


  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Constants.isDevice) {
      try {
        // Check current permission status
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
  
        // Request permission if not already granted
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
  
        // Handle case where permission is not granted
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification! Permissions not granted.');
          return;
        }
  
        // Retrieve push token
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Push Token:', token);
  
        // Optionally, store the token securely if needed
  
      } catch (error) {
        console.error('Error registering for push notifications:', error);
      }
  
      // Configure notification channel for Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    } else {
      // alert('Must use a physical device for Push Notifications');
    }
  
    return token;
  }
  
  

  async function testNotification() {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Test Notification",
          body: "This is a test notification",
        },
        trigger: { seconds: 1 },
      });
    } catch (error) {
      console.log("Error scheduling notification:", error);
    }
  }
  
  const handleClaimBonus = async () => {
    // Alert.alert('Bonus Claimed', 'You have claimed your bonus.');
    setModalVisible(false);
    await testNotification();
  };
  


  const handleProfilePress = () => {
    // Handle profile icon press (e.g., navigate to profile screen)
  };

  const handleNotificationsPress = () => {
    // Handle notifications icon press (e.g., navigate to notifications screen)
  };

  const handleBalancePress = () => {

  };

  const handleChangePhoto = () => {
    // Handle changing user photo logic
  };

  const handleSurveyPress = () => {
    setSurveyModalVisible(true);
  };

  const closeSurveyModal = () => {
    setSurveyModalVisible(false);
  }


      const surveyTopics = [
        { topic: 'Recent Work Experience', surveys: [
          'Recent role & responsibility',
          'Skills developed',
          'Challenges faced',
          'Enjoyable aspects',
          'Areas for improvement',
          'Job preparation',
          'Successful project',
          'Lessons learned',
          'Work-life balance',
          'Future career goals'
        ]
      },
      { topic: 'Daily Habits', surveys: [
          'Morning routine',
          'Task management',
          'Productivity habits',
          'Diet balance',
          'Exercise routine',
          'Evening unwind',
          'Sleep schedule',
          'Goal tracking',
          'Focus strategies',
          'Habit changes'
        ]
      },
      { topic: 'Fitness Activities', surveys: [
          'Favorite exercise',
          'Workout frequency',
          'Fitness goals',
          'Motivation strategies',
          'Workout routine',
          'Fitness challenges',
          'Progress tracking',
          'Post-workout routine',
          'Balance with responsibilities',
          'New fitness activities'
        ]
      },
      { topic: 'Social Media Usage', surveys: [
          'Daily usage time',
          'Preferred platforms',
          'Content preference',
          'Privacy management',
          'Impact on life',
          'Engagement with others',
          'Reducing time',
          'Handling negativity',
          'Benefits',
          'Habit changes'
        ]
      },
      { topic: 'Travel Experiences', surveys: [
          'Favorite destination',
          'Trip planning',
          'Travel experiences',
          'Expense management',
          'Memorable trip',
          'Travel challenges',
          'Safety measures',
          'Bucket list destinations',
          'Documenting experiences',
          'Cultural experiences'
        ]
      },
      { topic: 'Healthy Eating', surveys: [
          'Typical healthy meal',
          'Fruit & vegetable intake',
          'Avoiding unhealthy snacks',
          'Meal planning',
          'Favorite recipes',
          'Hydration',
          'Diet challenges',
          'Balancing indulgence',
          'Diet changes',
          'Portion control'
        ]
      },
      { topic: 'Favorite Hobbies', surveys: [
          'Joyful hobbies',
          'Discovery of hobbies',
          'Time management',
          'New hobbies to try',
          'Well-being contribution',
          'Memorable experiences',
          'Sharing hobbies',
          'Pursuit challenges',
          'Influence on daily life',
          'Skills learned'
        ]
      },
      { topic: 'Weekend Plans', surveys: [
          'Typical weekend',
          'Favorite activities',
          'Relaxation vs. productivity',
          'Weekend day activity',
          'Activity planning',
          'New activities to try',
          'Involving others',
          'Making the most of weekends',
          'Seasonal changes',
          'Recent enjoyable plan'
        ]
      },
      { topic: 'Tech Gadgets', surveys: [
          'Indispensable gadgets',
          'Tech trends',
          'Gadget features',
          'Gadget management',
          'Latest innovations',
          'Maintenance',
          'Next gadgets',
          'Daily integration',
          'Recent useful gadget',
          'Performance evaluation'
        ]
      },
      { topic: 'Entertainment Choices', surveys: [
          'Preferred types',
          'Discovering options',
          'Favorite movie/show',
          'Balancing with activities',
          'Favorite books/authors',
          'Upcoming events',
          'Role in life',
          'New trends',
          'Sharing preferences',
          'Recent experience'
        ]
      }
      ];

      const topicIcons = {
        'Recent Work Experience': 'briefcase-outline',
        'Daily Habits': 'time-outline',
        'Fitness Activities': 'barbell-outline',
        'Social Media Usage': 'logo-facebook',
        'Travel Experiences': 'airplane-outline',
        'Healthy Eating': 'nutrition-outline',
        'Favorite Hobbies': 'brush-outline',
        'Weekend Plans': 'calendar-outline',
        'Tech Gadgets': 'phone-portrait-outline',
        'Entertainment Choices': 'videocam-outline',
      };

      const SurveyItem = ({ survey, index }) => {
        const iconName = topicIcons[selectedTopic?.topic] || 'clipboard-outline';
        return (
          <View key={index} style={styles.surveyContainer}>
            <View style={styles.surveyItemContainer}>
              <Ionicons name={iconName} size={30} color="#4D869C" style={styles.surveyIcon} />
              <View>
                <Text style={styles.surveyTitleText}>{selectedTopic?.topic}</Text>
                <Text style={styles.surveyText}>{survey}</Text>
              </View>
            </View>
          </View>
        );
      };


  return (
    <View style={styles.container}>
      {/* Top Icons */}
      <View style={styles.userProfile}>
          <View style={styles.topIconsContainer}>
              <TouchableOpacity onPress={handleProfilePress}>
                <Ionicons name="person-circle-outline" size={32} color="#EEF7FF" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleNotificationsPress}>
                <Ionicons name="notifications-outline" size={32} color="#EEF7FF" />
              </TouchableOpacity>
          </View>

          {/* Greeting and Photo Container */}
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>
              {greeting} {'\n'}
              <Text style={styles.usernameText}>{username}</Text>!
            </Text>
            <TouchableOpacity onPress={handleChangePhoto}>
              <Image
                source={defaultPhoto} // Replace with user's photo or default
                style={styles.userPhoto}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.powerText}>
            <Text style={styles.powerTittle}>Powered by Summit Tests </Text>
            <Ionicons name="shield-checkmark-outline" size={18} color="#EEF7FF" />
            </View>
      </View>

      <View style={styles.categorySec}>
      <Text style={styles.balText}>survey categories</Text>
      <Text style={styles.balText}>|</Text>
        <TouchableOpacity onPress={handleSurveyPress} style={styles.seeAll}>
          <Text style={styles.seeAlltext}>see all</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Survey Topics */}
          <FlatList 
                ref={flatListRef}
                horizontal
                data={surveyTopics}
                extraData={selectedTopic} // Force FlatList to re-render when selectedTopic changes
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={styles.surveyButton}
                    onPress={() => handleTopicPress(item, index)}
                  >
                    <View style={styles.buttonContent}>
                      {selectedTopic?.topic === item.topic && (
                        <Ionicons name="checkmark-circle-outline" size={15} color="#EEF7FF" style={styles.icon} />
                      )}
                      <Text style={styles.surveyButtonText}>{item.topic}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.topic}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollContainer}
          />


          <View style={styles.availableOuter}><Text style={styles.availableTittle}>Available Tasks for You:</Text></View>



      <ScrollView style={styles.surveyListContainer}>
            {selectedTopic?.surveys.map((survey, index) => (
              <SurveyItem key={index} survey={survey} index={index} />
            ))}
      </ScrollView>

      {/* Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={bonusImg} style={styles.bonusImg} />
            <Text style={styles.modalText}>
              Congratulations!! {username}.
              {'\n'}You have received KES 50 Welcome bonus.
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleClaimBonus}>
              <Text style={styles.buttonText}>Claim Bonus</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for Survey Topics */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={surveyModalVisible}
        onRequestClose={closeSurveyModal}
      >
            <View style={styles.surveyModalContainer}>
                <View style={styles.surveyModalContent}>
                  <Text style={styles.surveyModalTitle}>All Survey Categories</Text>

                  <Text style={styles.surveyExplain}>
                  Pick your favorite survey topic below to view related tasks and start earning rewards.{'\n'}
                  Good luck and enjoy the rewards!
                  </Text>
                  
                  <View style={styles.surveyButtonGrid}>
                      {surveyTopics.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.surveyModalButton}
                          onPress={() => {
                            handleTopicPress(item, index); // Pass index here
                            closeSurveyModal();
                          }}
                        >
                          <Text style={styles.surveyModalButtonText}>{item.topic}</Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                  
                  <TouchableOpacity style={styles.closeButton} onPress={closeSurveyModal}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
            </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDE8E5',
    // paddingHorizontal: 10,
    // paddingTop: 40,
  },
  topIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    margin: 20,
  },
  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  userProfile:{
    backgroundColor: '#4D869C',
    borderBottomEndRadius:20,
    borderBottomStartRadius:20,
    elevation: 3,
    
  },
  greetingText: {
    fontSize: 20,
    color: '#EEF7FF',
    fontFamily: 'Rubik-Regular',
    fontWeight: '200',
  },
  usernameText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#EEF7FF',
    fontFamily: 'Rubik-Bold',
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#EEF7FF',
  },
  scrollContainer: {
    margin:10,
    minHeight:40,
  },
  surveyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#4D869C',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginRight: 5,
    maxHeight:35,
  },
  icon:{
    marginRight: 5,
  },
  surveyButtonText: {
    color: '#EEF7FF',
    fontSize: 15,
    fontFamily: 'Rubik-Regular',
    justifyContent:'center',
    alignItems:'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedTopicContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    
  },
  selectedTopicContainer: {
    // marginTop: 20,
  },
  // availableOuter:{
  // marginTop:20
  // },
  surveyContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    margin:10,
    overflow:'hidden'
  },
  surveyTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4D869C',
    marginBottom: 5,
    fontFamily: 'Rubik-Bold',
  },
  surveyText: {
    fontSize: 16,
    color: '#4D869C',
    fontFamily: 'Rubik-Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#4D869C',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Rubik-Regular',
  },
  button: {
    backgroundColor: '#4D869C',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
  },
  buttonText: {
    color: '#EEF7FF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Rubik-Regular',
    textAlign: 'center',
  },
  bonusImg: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  categorySec:{
  flexDirection:'row',
  
  },
  balText:{
    fontSize: 15,
    color: '#4D869C',
    fontFamily: 'Rubik-Regular',
    marginLeft:10,
    marginTop:10
  },
  seeAlltext:{
    fontSize: 15,
    color: '#7AB2B2',
    fontFamily: 'Rubik-Regular',
    marginLeft:10,
    marginTop:10,
    justifyContent:'center',
    alignItems:'center',
    borderBottomWidth:2,
    borderBottomColor:'#7AB2B2'
  },
  seeAll:{
    
  },
  surveyModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  surveyModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    flex: 1,
    width: '100%',
    justifyContent:'center'
  },
  surveyButtonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  surveyModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4D869C',
    marginBottom: 20,
    textAlign: 'center',
  },
  surveyModalButton: {
    backgroundColor: '#4D869C',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height:35,
    marginTop:10,
  },
  surveyModalButtonText: {
    color: '#EEF7FF',
    fontSize: 15,
    fontFamily: 'Rubik-Regular',
  },
  closeButton: {
    marginTop: 50,
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    borderWidth:2,
    borderColor:'#4D869C',

  },
  closeButtonText: {
    color: '#4D869C',
    fontSize: 18,
  },
  surveyExplain:{
    color: '#4D869C',
    fontSize: 15,
    marginBottom:10
  },
  availableTittle:{
    fontSize: 18,
    color: '#4D869C',
    marginLeft:10,
  },
  surveyItemContainer:{
  flexDirection:'row',
  alignItems:'center'
  },
  surveyIcon:{
    marginRight:10
  },
  powerText:{
    marginLeft:20,
    marginBottom:10,
    marginTop:-10,
    flexDirection:'row',
    alignItems:'center',
  },
  powerTittle:{
    color:'#EEF7FF'
  }
  
});

export default HomeScreen;
