// mainscreens/LearnScreen.js
import React, { useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProjectWelcome from '../welcomeScreens/projectWelcome';
import CodeWelcome from '../welcomeScreens/codeWelcome';
import NutritionWelcome from '../welcomeScreens/nutritionWelcome';
import CookingWelcome from '../welcomeScreens/cookingWelcome';
import SocialWelcome from '../welcomeScreens/socialWelcome';

const LearnScreen = () => {

  const [questionsModal, setQuestionsModal] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const startTest = (assessment) => {
    setSelectedAssessment(assessment); // Set the selected assessment
    setQuestionsModal(true);           // Open the modal
  };

  const renderSelectedAssessment = () => {
    switch (selectedAssessment) {
      case 'project':
        return <ProjectWelcome />;
      case 'coding':
        return <CodeWelcome />;
      case 'nutrition':
        return <NutritionWelcome />;
      case 'cooking':
        return <CookingWelcome />;
      case 'social':
        return <SocialWelcome />;
      default:
        return null;
    }
  };

  
  return (
    <ScrollView style={styles.pageView}>
      <View style={styles.container}>
          <View style={styles.headerBar}>
            <Text style={styles.content}>
              You need to complete at least one assessment before you can start Moodly tasks. 
              Once you've finished one or more assessments, you'll be eligible to proceed with the tasks.
            </Text>
            <View style={styles.checkProgress}>
              <View style={styles.progressBarContainer}>
                {/* Progress Bars */}
                {[...Array(5)].map((_, index) => (
                  <View key={index} style={styles.progressBar} />
                ))}
              </View>
              <Text style={styles.completeHeader}>0/5 Completed</Text>
            </View>
          </View>

          <View style={styles.coverCont}>
          <View style={styles.assessInstructCont}>
            <Text style={styles.assessInstruct}>To achieve the best results on this assessment, please complete it in a quiet place with no interruptions. 
              You only need your smartphone to finish the assessment. 
              Allocate up to 30 minutes to complete it.</Text>
          </View>

          {/*Test Views*/}

          <View style={styles.testContainer}>

            <View>
              <Text style={styles.assesTittle}>Assessments - Basics</Text>
            </View>

            {/* Project Management Assessment */}
            <View style={styles.testView}>
              <View style={styles.testExplain}>
                <Text style={styles.testTittle}>Project Management</Text>
                <Text style={styles.startText}>Remote - Test</Text>
              </View>
              <TouchableOpacity
                style={styles.testButton}
                onPress={() => startTest('project')}
              >
                <Ionicons name="play-circle-outline" size={15} color="#6c757d" />
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>

            {/* Coding & Programming Assessment */}
            <View style={styles.testView}>
              <View style={styles.testExplain}>
                <Text style={styles.testTittle}>Coding & Programming</Text>
                <Text style={styles.startText}>Remote - Test</Text>
              </View>
              <TouchableOpacity
                style={styles.testButton}
                onPress={() => startTest('coding')}
              >
                <Ionicons name="play-circle-outline" size={15} color="#6c757d" />
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>

            {/* Nutrition & Health Assessment */}
            <View style={styles.testView}>
              <View style={styles.testExplain}>
                <Text style={styles.testTittle}>Nutrition & Health</Text>
                <Text style={styles.startText}>Remote - Test</Text>
              </View>
              <TouchableOpacity
                style={styles.testButton}
                onPress={() => startTest('nutrition')}
              >
                <Ionicons name="play-circle-outline" size={15} color="#6c757d" />
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>

            {/* Cooking & Culinary Arts Assessment */}
            <View style={styles.testView}>
              <View style={styles.testExplain}>
                <Text style={styles.testTittle}>Cooking & Culinary Arts</Text>
                <Text style={styles.startText}>Remote - Test</Text>
              </View>
              <TouchableOpacity
                style={styles.testButton}
                onPress={() => startTest('cooking')}
              >
                <Ionicons name="play-circle-outline" size={15} color="#6c757d" />
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>

            {/* Social Media Management Assessment */}
            <View style={styles.testView}>
              <View style={styles.testExplain}>
                <Text style={styles.testTittle}>Social Media Management</Text>
                <Text style={styles.startText}>Remote - Test</Text>
              </View>
              <TouchableOpacity
                style={styles.testButton}
                onPress={() => startTest('social')}
              >
                <Ionicons name="play-circle-outline" size={15} color="#6c757d" />
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

          <Modal
          transparent={true}
          animationType="slide"
          visible={questionsModal}
          onRequestClose={() => setQuestionsModal(false)}
          >
          <View style={styles.questionsView}>
        <View style={styles.modalContent}>
            {renderSelectedAssessment()}
        </View>
    </View>

          </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageView:{
    flex: 1,
    backgroundColor: '#CDE8E5',
  },
  container: {
    flex: 1,
    backgroundColor: '#CDE8E5',
    alignItems: 'center',
  },
  content: {
    fontSize: 16,
    color: '#EEF7FF',
    padding:20,
    borderRadius:2,
    backgroundColor:"#4D869C",
  },
  headerBar:{
    width:'100%',
    
  },
  checkProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    alignItems:'center',
    marginLeft:10,
    marginRight:10,
    marginTop:5,
    marginBottom:-5,
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    marginRight: 10,
    
  },
  progressBar: {
    width: 35,
    height: 7,
    backgroundColor: '#6c757d',
    borderRadius: 1,
    marginRight: 5,
  },
  completeHeader:{
    color:'#6c757d',
    fontSize:14,
  },
  coverCont:{
    width:'100%',
    padding:10
  },
  assessInstruct:{
    color:'#7AB2B2',
  },
  testContainer:{
    width:'100%',
    borderRadius:2,
    gap:15,
  },
  testView:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#fff',
    height:80,
    padding:5,
    borderRadius:2,
    elevation:3,

  },
  testTittle:{
    color:'#4D869C',
    fontSize:15,
    fontWeight:'bold',
  },
  assesTittle:{
    color:'#4D869C',
    fontSize:18,
  },
  testButton:{
    color:'#6c757d',
    marginRight:5,
    backgroundColor:'#CDE8E5',
    paddingHorizontal:10,
    paddingVertical:3,
    borderRadius:2,
    elevation:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:3
  },
  startText:{
    color:'#6c757d',
  },
  testExplain:{
    marginLeft:5,
    flexDirection:'column',
    gap:5
  },
  questionsView: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
},
modalContent: {
    
    alignItems: 'center',
    justifyContent:'center',
    
},
});

export default LearnScreen;
