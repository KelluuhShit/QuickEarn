import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert, Image, ScrollView, FlatList  } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import bonusImg from '../assets/homeImg/bonus.png';
import defaultPhoto from '../assets/homeImg/defaultUserPhoto.png';


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

  const handleClaimBonus = () => {
    Alert.alert('Bonus Claimed', 'You have claimed your bonus.');
    setModalVisible(false);
  };

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
    { topic: 'Recent Work Experience', surveys: ['Survey 1', 'Survey 2', 'Survey 3'] },
    { topic: 'Daily Habits', surveys: ['Survey 4', 'Survey 5', 'Survey 6'] },
    { topic: 'Fitness Activities', surveys: ['Survey 7', 'Survey 8', 'Survey 9'] },
    { topic: 'Social Media Usage', surveys: ['Survey 10', 'Survey 11', 'Survey 12'] },
    { topic: 'Travel Experiences', surveys: ['Survey 13', 'Survey 14', 'Survey 15'] },
    { topic: 'Healthy Eating', surveys: ['Survey 16', 'Survey 17', 'Survey 18'] },
    { topic: 'Favorite Hobbies', surveys: ['Survey 19', 'Survey 20', 'Survey 21'] },
    { topic: 'Weekend Plans', surveys: ['Survey 22', 'Survey 23', 'Survey 24'] },
    { topic: 'Tech Gadgets', surveys: ['Survey 25', 'Survey 26', 'Survey 27'] },
    { topic: 'Entertainment Choices', surveys: ['Survey 28', 'Survey 29', 'Survey 30'] },
  ];

  // const handleTopicPress = (topic) => {
  //   setSelectedTopic(topic);
  // };

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

          <Text style={styles.availableTittle}>Available Tasks for You:</Text>



      {/* Display Selected Surveys in a Specific Container */}
            {selectedTopic && (
        <ScrollView style={styles.selectedTopicContainer}>
          {selectedTopic.surveys.map((survey, index) => (
            <View key={index} style={styles.surveyContainer}>
              <Text style={styles.surveyTitleText}>{selectedTopic.topic} Survey {index + 1}:</Text>
              <Text style={styles.surveyText}>{survey}</Text>
            </View>
          ))}
        </ScrollView>
      )}

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
    height: 35,
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
  surveyContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    margin:10
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
  }
  
});

export default HomeScreen;
