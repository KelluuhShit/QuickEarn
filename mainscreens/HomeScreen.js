// mainscreens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import bonusImg from '../assets/homeImg/bonus.png';

const HomeScreen = () => {
  const { username } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (username) {
      setModalVisible(true);
    }
  }, [username]);

  const handleClaimBonus = () => {
    Alert.alert('Bonus Claimed', 'You have claimed your bonus.');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {username}</Text>

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDE8E5',
  },
  text: {
    fontSize: 24,
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
  },
  buttonText: {
    color: '#EEF7FF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Rubik-Regular',
  },
  bonusImg: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default HomeScreen;
