// mainscreens/LearnScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LearnScreen = () => {
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

          <View style={styles.assessInstructCont}>
            <Text style={styles.assessInstruct}>To achieve the best results on this assessment, please complete it in a quiet place with no interruptions. 
              You only need your smartphone to finish the assessment. 
              Allocate up to 30 minutes to complete it.</Text>
          </View>

          {/*Test Views*/}

          <View style={styles.testContainer}>

            <View>
              <Text style={styles.assesTittle}>Assessments</Text>
            </View>

            <View style={styles.testView} >
              <View style={styles.testExplain}>
                <Text style={styles.testTittle}>Professional Development</Text>
                <Text style={styles.startText}>Remote - Test</Text>
              </View>
              <TouchableOpacity style={styles.testButton} >
                <Ionicons name="play-circle-outline" size={15} color="#6c757d" />
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.testView}>
              <View style={styles.testExplain}>
                <Text style={styles.testTittle}>Tech & Innovations</Text>
                <Text style={styles.startText}>Remote - Test</Text>
              </View>
              <TouchableOpacity style={styles.testButton} >
                <Ionicons name="play-circle-outline" size={15} color="#6c757d" />
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.testView}>
              <View style={styles.testExplain}>
                <Text style={styles.testTittle}>Lifestyle & Wellness</Text>
                <Text style={styles.startText}>Remote - Test</Text>
              </View>
              <TouchableOpacity style={styles.testButton} >
                <Ionicons name="play-circle-outline" size={15} color="#6c757d" />
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.testView}>
              <View style={styles.testExplain}>
                <Text style={styles.testTittle}>Personal Interests & Hobbies</Text>
                <Text style={styles.startText}>Remote - Test</Text>
              </View>
              <TouchableOpacity style={styles.testButton} >
                <Ionicons name="play-circle-outline" size={15} color="#6c757d" />
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.testView}>
              <View style={styles.testExplain}>
                <Text style={styles.testTittle}>Entertainment & Media</Text>
                <Text style={styles.startText}>Remote - Test</Text>
              </View>
              <TouchableOpacity style={styles.testButton} >
                <Ionicons name="play-circle-outline" size={15} color="#6c757d" />
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>

          </View>

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
    padding: 20,
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

  },
  checkProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    width:"100%",
    justifyContent:'space-between',
    marginTop:5,
  },
  progressBarContainer: {
    flexDirection: 'row',
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
  assessInstructCont:{
    marginTop:5,
  },
  assessInstruct:{
    color:'#7AB2B2',
  },
  testContainer:{
    width:'100%',
    marginTop:20,
    borderWidth:1,
    padding:10,
    borderColor:'#6c757d',
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
  }
});

export default LearnScreen;
