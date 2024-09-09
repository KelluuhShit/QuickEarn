import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert, Image, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import bonusImg from '../assets/homeImg/bonus.png';
import defaultPhoto from '../assets/homeImg/defaultUserPhoto.png';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

import { v4 as uuidv4 } from 'uuid';




const HomeScreen = () => {
  const { username } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [surveyModalVisible, setSurveyModalVisible] = useState(false);
  const [userPhoto, setUserPhoto] = useState(defaultPhoto);

  const [notifications, setNotifications] = useState([]);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const [redirectModal, setredirectModal] = useState(false);


  
  
  const flatListRef = useRef(null);

  const handleTopicPress = (item, index) => {
    setSelectedTopic(item);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
    }
  };

  useEffect(() => {
    if (username) {
      // setModalVisible(true);
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


  const requestNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      return newStatus === 'granted';
    }
    return true;
  };
  

  const testNotification = async () => {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      console.log("Notification permission not granted.");
      return;
    }
  
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Moodly Tasks",
          body: "Reward Claimed Succesfully",
          data: { timestamp: new Date().toISOString() },
        },
        trigger: { seconds: 1 },
      });

      const newNotification = {
        id: uuidv4(),
        title: "Test Notification",
        body: "This is a test notification",
        timestamp: new Date().toISOString(),
      };
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);

    } catch (error) {
      console.log("Error scheduling notification:", error);
    }
  };

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  
  const handleClaimBonus = async () => {
    // Alert.alert('Bonus Claimed', 'You have claimed your bonus.');
    setModalVisible(false);
    await testNotification();
  };
  


  const handleProfilePress = () => {
    // Handle profile icon press (e.g., navigate to profile screen)
  };

  const handleNotificationsPress = () => {
    setNotificationModalVisible(true);
  };

  const handleBalancePress = () => {

  };

  const handleChangePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    
    if (!result.canceled) {
      const selectedImageUri = result.assets[0]?.uri;
      
      if (typeof selectedImageUri === 'string') {
        // console.log('Selected image URI:', selectedImageUri);
        setUserPhoto(selectedImageUri);
      } else {
        // console.error('Selected image URI is not a string:', selectedImageUri);
      }
    }
  };

      useEffect(() => {
        // Set up notification listener
        const subscription = Notifications.addNotificationReceivedListener(notification => {
          setSelectedNotification({
            title: notification.request.content.title,
            body: notification.request.content.body,
            timestamp: Date.now(),
          });
          // setNotificationModalVisible(true);
        });

        return () => {
          subscription.remove();
        };
      }, []);

  const handleSurveyPress = () => {
    setSurveyModalVisible(true);
  };

  const closeSurveyModal = () => {
    setSurveyModalVisible(false);
  };

  const handleOpenRedirect = ()=>{
    setredirectModal(true);
  };


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
    ]},
    { topic: 'AI & Tech Innovations', surveys: [
      'Latest AI tools used',
      'Impact of AI on work',
      'Tech skills learned',
      'Future of AI & tech',
      'Tech trends to watch',
      'Ethics in AI development',
      'Tech-driven productivity',
      'AI in daily life',
      'Personal AI projects',
      'AI and job security'
    ]},
    { topic: 'Blockchain & Crypto', surveys: [
      'Understanding blockchain',
      'Crypto investments',
      'Blockchain applications',
      'Risks in crypto market',
      'Future of blockchain',
      'Impact on finance',
      'Decentralized finance (DeFi)',
      'Crypto security practices',
      'NFTs and digital assets',
      'Personal experiences with crypto'
    ]},
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
    ]},
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
    ]},
    { topic: 'Social Media & Digital Life', surveys: [
      'Daily usage time',
      'Preferred platforms',
      'Content preference',
      'Privacy management',
      'Impact on life',
      'Digital well-being',
      'Reducing screen time',
      'Handling negativity online',
      'Benefits of social media',
      'Managing digital identity'
    ]},
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
    ]},
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
    ]},
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
    ]},
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
    ]},
    { topic: 'Tech Gadgets & Trends', surveys: [
      'Indispensable gadgets',
      'Tech trends',
      'Gadget features',
      'Gadget management',
      'Latest innovations',
      'Maintenance tips',
      'Next gadgets',
      'Daily integration of tech',
      'Recent useful gadget',
      'Performance evaluation'
    ]},
    { topic: 'Entertainment Choices', surveys: [
      'Preferred entertainment types',
      'Discovering new options',
      'Favorite movie/show',
      'Balancing entertainment with activities',
      'Favorite books/authors',
      'Upcoming events',
      'Role in daily life',
      'New entertainment trends',
      'Sharing entertainment preferences',
      'Recent entertainment experiences'
    ]}
  ];

  const topicIcons = {
    'AI & Tech Innovations': 'code-outline',
    'Blockchain & Crypto': 'server-outline',
    'Recent Work Experience': 'briefcase-outline',
    'Daily Habits': 'time-outline',
    'Fitness Activities': 'barbell-outline',
    'Social Media & Digital Life': 'logo-facebook',
    'Travel Experiences': 'airplane-outline',
    'Healthy Eating': 'nutrition-outline',
    'Favorite Hobbies': 'brush-outline',
    'Weekend Plans': 'calendar-outline',
    'Tech Gadgets & Trends': 'phone-portrait-outline',
    'Entertainment Choices': 'videocam-outline',
  };

      const removeNotification = (id) => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
      };

      const SurveyItem = ({ survey, index }) => {
        const iconName = topicIcons[selectedTopic?.topic] || 'clipboard-outline';
        return (
          <TouchableOpacity onPress={handleOpenRedirect} style={styles.surveyContainer} activeOpacity={0.7}>
            <View key={index} style={styles.surveyItemContainer}>
              <View style={styles.iconMin}>
              <Ionicons name={iconName} size={30} color="#6c757d" style={styles.surveyIcon} />
              <View style={styles.durationContainer}>
                {/* <Ionicons name="time-outline" size={16} color="#6c757d" style={styles.clockIcon} /> */}
                <Text style={styles.durationText}>up to $10</Text>
              </View>
              </View>
              <View>
                <Text style={styles.surveyTitleText}>{selectedTopic?.topic}</Text>
                <Text style={styles.surveyText}>{survey}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      };

      const NotificationModal = ({
        notificationModalVisible,
        setNotificationModalVisible,
        notifications,
        removeNotification,
      }) => {
        const getTimeAgo = (timestamp) => {
          const now = new Date();
          const notificationTime = new Date(timestamp);
          const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
      
          if (diffInMinutes < 1) return 'Just now';
          if (diffInMinutes === 1) return '1 minute ago';
          return `${diffInMinutes} minutes ago`;
        };
      
        const handleRemoveNotification = (id) => {
          removeNotification(id);
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Notification deleted',
            text2: 'The notification has been successfully removed.',
          });
        };
      
        return (
          <Modal
            transparent={true}
            animationType="slide"
            visible={notificationModalVisible}
            onRequestClose={() => setNotificationModalVisible(false)}
          >
            <View style={styles.notificationModal}>
              <View style={styles.notificationModalContent}>
                {notifications.length > 0 ? (
                  <ScrollView>
                    {notifications
                      .slice()
                      .reverse()
                      .map((notification, index) => (
                        <TouchableOpacity
                          key={index}
                          onLongPress={() => handleRemoveNotification(notification.id)}
                          style={styles.notificationItem}
                        >
                          <Text style={styles.modalTitle}>
                              {selectedNotification?.title || 'No Title'}
                            </Text>
                            <Text style={styles.notificationmodalText}>
                              {selectedNotification?.body || 'No Body'}
                            </Text>
                            <Text style={styles.notificationmodalText}>
                              Received {getTimeAgo(notification.timestamp)}
                            </Text>
                        </TouchableOpacity>
                      ))}
                  </ScrollView>
                ) : (
                  <Text style={styles.modalText}>No notifications</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.notificationButton}
                onPress={() => setNotificationModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
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

              <View style={styles.notificationContainer}>
                {notifications.length > 0 && (
                  <View style={styles.notificationMark} />
                )}
                <TouchableOpacity onPress={handleNotificationsPress}>
                  <Ionicons name="notifications-outline" size={32} color="#EEF7FF" />
                </TouchableOpacity>
              </View>
          </View>

          {/* Greeting and Photo Container */}
          <View style={styles.greetingContainer}>
              <Text style={styles.greetingText}>
                {greeting} {'\n'}
                <Text style={styles.usernameText}>{username}</Text>!
              </Text>
              <TouchableOpacity onPress={handleChangePhoto}>
              <Image
                source={userPhoto && typeof userPhoto === 'string' ? { uri: userPhoto } : defaultPhoto}
                style={styles.userPhoto}
              />
                <Ionicons
                  name="pencil"
                  size={15}
                  color="white"
                  style={styles.editIcon}
                />
              </TouchableOpacity>
          </View>
          <View style={styles.powerText}>
            <Text style={styles.powerTittle}>Powered by Summit Tests </Text>
            <Ionicons name="shield-checkmark-outline" size={13} color="#EEF7FF" />
            </View>
      </View>

      <View style={styles.categorySec}>
      <Text style={styles.balText}>Task categories</Text>
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


          <View style={styles.availableOuter}><Text style={styles.availableTittle}>Remote Tasks for You:</Text></View>


                    {/* survey List.Home */}
      
      <ScrollView style={styles.surveyListContainer} >
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
              {'\n'}You have received USD 50 Welcome bonus.
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
                  <Text style={styles.surveyModalTitle}>All Task Categories</Text>

                  <Text style={styles.surveyExplain}>
                  Pick your favorite topics below to view related tasks and start earning rewards.{'\n'}
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

      {/* Modal for Notifications */}

      <NotificationModal
        notificationModalVisible={notificationModalVisible}
        setNotificationModalVisible={setNotificationModalVisible}
        notifications={notifications}
        removeNotification={removeNotification}
      />


          <Modal
            transparent={true}
            animationType="slide"
            visible={redirectModal}
            onRequestClose={() => setredirectModal(false)}
          >
            <View style={styles.surveyRedirect}>
              <Text>You are about to start task</Text>
              
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
    marginBottom: 10,
    marginTop:-20,
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
    // fontFamily: 'Rubik-Regular', 
    fontWeight: '200',
  },
  usernameText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#EEF7FF',
    // fontFamily: 'Rubik-Regular', 
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
    // fontFamily: 'Rubik-Regular', 
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
    borderRadius: 2,
    padding: 15,
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
    // fontFamily: 'Rubik-Regular', 
  },
  surveyText: {
    fontSize: 14,
    color: '#6c757d',
    // fontFamily: 'Rubik-Regular', 
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
    // fontFamily: 'Rubik-Regular', 
  },
  button: {
    borderWidth:2,
    borderColor:'#4D869C',
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '100%',
    borderRadius:50
  },
  buttonText: {
    color: '#4D869C',
    fontSize: 16,
    fontWeight: 'bold',
    // fontFamily: 'Rubik-Regular', 
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
    // fontFamily: 'Rubik-Regular', 
    marginLeft:10,
    marginTop:10
  },
  seeAlltext:{
    fontSize: 15,
    color: '#7AB2B2',
    // fontFamily: 'Rubik-Regular', 
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
    // fontFamily: 'Rubik-Regular', 
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
  iconMin:{
  flexDirection:'column',
  marginRight:10,
  gap:5,
  },
  powerText:{
    marginLeft:20,
    marginBottom:10,
    marginTop:-10,
    flexDirection:'row',
    alignItems:'center',
  },
  powerTittle:{
    color:'#EEF7FF',
    fontSize:10,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // or any other color you want for the icon background
    borderRadius: 20,
    padding: 5, // adjust the padding as needed
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationMark: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  notificationModal:{
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    justifyContent:'center',
    alignItems:'center'
    
  },
  notificationModalContent:{
    flex: 1,
    marginTop:20,
    width:'90%'
  },
  notificationButton:{
    borderWidth:2,
    borderColor:'#4D869C',
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '90%',
    borderRadius:50,
    marginBottom:50
  },
  notificationItem:{
    backgroundColor: '#FFF',
    borderRadius: 2,
    padding: 10,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    margin:3,
    overflow:'hidden'
  },
  notificationmodalText:{
    fontSize: 15,
    color: '#4D869C',
  },
  surveyRedirect:{
    flex:1,
    backgroundColor:'#FFF'
  },
  durationContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:5,
  },
  durationText:{
    color:'#6c757d',
    fontSize:12,
    padding:2,
    paddingHorizontal:7,
    borderRadius:2,
    borderColor:'#4D869C',
    backgroundColor:'#CDE8E5',
    elevation: 1,
  }
});

export default HomeScreen;