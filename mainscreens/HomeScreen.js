import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import bonusImg from '../assets/homeImg/bonus.png';
import defaultPhoto from '../assets/homeImg/defaultUserPhoto.png';

const HomeScreen = () => {
  const { username } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);

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

  const handleChangePhoto = () => {
    // Handle changing user photo logic
  };

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

  const handleTopicPress = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <View style={styles.container}>
      {/* Top Icons */}
      <View style={styles.topIconsContainer}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Ionicons name="person-circle-outline" size={32} color="#4D869C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNotificationsPress}>
          <Ionicons name="notifications-outline" size={32} color="#4D869C" />
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

      {/* Scrollable Survey Topics */}
      <ScrollView horizontal={true} style={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
        {surveyTopics.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.surveyButton}
            onPress={() => handleTopicPress(item)}
          >
            <Text style={styles.surveyButtonText}>{item.topic}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDE8E5',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  topIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEF7FF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 20,
    color: '#4D869C',
    fontFamily: 'Rubik-Regular',
    fontWeight: '200',
  },
  usernameText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#4D869C',
    fontFamily: 'Rubik-Bold',
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#4D869C',
  },
  scrollContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  surveyButton: {
    backgroundColor: '#4D869C',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginRight: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surveyButtonText: {
    color: '#EEF7FF',
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
  },
  selectedTopicContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  selectedTopicContainer: {
    marginTop: 20,
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
});

export default HomeScreen;
