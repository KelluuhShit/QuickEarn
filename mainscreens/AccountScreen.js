import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';


    const initialValues = {
      paidOut: 0,
      dailyTasks: 0,
      taskers: 0,
      reviews: 0
    };

    const targetValues = {
      paidOut: 3,
      dailyTasks: 120,
      taskers: 300,
      reviews: 4.7
    };


// Array with user comments, usernames, and their corresponding images
const userComments = [
  {
    text: "Moodly is a game-changer! I completed a few tasks and got my payment instantly. Highly recommend!",
    image: require('../assets/users/user1.jpg'),
    username: "John Doe"
  },
  {
    text: "I love how easy it is to earn and withdraw money on Moodly. It's been a great side hustle for me.",
    image: require('../assets/users/user2.jpg'),
    username: "Jane Smith"
  },
  {
    text: "Moodly helped me pay off some bills this month. The withdrawal process was smooth and fast!",
    image: require('../assets/users/user3.jpg'),
    username: "Mark Johnson"
  },
  {
    text: "This app is amazing! I completed tasks in my spare time and was able to withdraw my earnings without any hassle.",
    image: require('../assets/users/user4.jpg'),
    username: "Emily Brown"
  },
  {
    text: "Moodly is legit! I’ve already withdrawn twice, and it’s helped me save up for my vacation.",
    image: require('../assets/users/user5.jpg'),
    username: "Chris Davis"
  }
];

const AccountScreen = ({ navigation }) => {
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity

  useEffect(() => {
    const intervalTime = 5000; // Time each comment is displayed

    const intervalId = setInterval(() => {
      // Fade out and in for comments
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();

      setTimeout(() => {
        setCurrentCommentIndex((prevIndex) => (prevIndex + 1) % userComments.length);
      }, 500); // Change comment after fade out

    }, intervalTime);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [currentCommentIndex]);

  const [animatedValues, setAnimatedValues] = useState(initialValues);

useEffect(() => {
  const incrementValue = (key, target, duration) => {
    let incrementInterval = setInterval(() => {
      setAnimatedValues((prevValues) => {
        let newValue = prevValues[key] + (target / duration) * 50; // Increment value

        if (newValue >= target) {
          clearInterval(incrementInterval); // Stop when target is reached
          newValue = target;
        }

        return { ...prevValues, [key]: newValue };
      });
    }, 100); // Update every 100ms
  };

  const animateValues = () => {
    // Reset to initial values before starting new animation
    setAnimatedValues(initialValues);

    // Animate each value again
    incrementValue('paidOut', targetValues.paidOut, 300);
    incrementValue('dailyTasks', targetValues.dailyTasks, 300);
    incrementValue('taskers', targetValues.taskers, 300);
    incrementValue('reviews', targetValues.reviews, 300);
  };

  // Initial run
  animateValues();

  // Replay animation every 5 seconds (5000ms)
  const intervalId = setInterval(() => {
    animateValues();
  }, 10000);

  // Clean up interval on component unmount
  return () => clearInterval(intervalId);
}, []);

      const [isDarkTheme, setIsDarkTheme] = useState(false);

        // Toggle function
        const toggleTheme = () => setIsDarkTheme((previousState) => !previousState);

        // Conditional styles based on theme
        const themeStyles = isDarkTheme ? darkTheme : lightTheme;

  
  return (
    <ScrollView style={styles.pageView}>
      <View style={styles.container}>
        <View style={styles.commentBox}>
          <View style={styles.imageView}>
            {/* Display user image */}
            <Image
              source={userComments[currentCommentIndex].image}
              style={styles.userImage}
            />
            <View style={styles.usernameView}>
              {/* Display user name */}
              <Text style={styles.usernameText}>{userComments[currentCommentIndex].username}</Text>
            </View>
          </View>

          {/* Display user comment */}
          <Animated.Text
            style={[styles.commentText, { opacity: fadeAnim }]}
          >
            {userComments[currentCommentIndex].text}
          </Animated.Text>
          <View style={styles.progressBox}>
          <View style={styles.progressBarContainer}>
            {/* Progress Bars */}
            {userComments.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressBar,
                  { backgroundColor: currentCommentIndex === index ? '#CDE8E5' : '#7AB2B2' }
                ]}
              />
            ))}
          </View>
        </View>
        </View>

        <View style={styles.moodlySummary}>
          <Text style={styles.moodlySummaryTxt}>Moodly - Remote</Text>
        </View>

        <View style={styles.customBox}>
        <View style={styles.customFigBox}>
      <View style={styles.figBox}>
        <View style={styles.txtFigBox}>
          <Text style={styles.largeText}>$</Text>
          <Text style={styles.largeTextAnimated}>{animatedValues.paidOut.toFixed(1)}</Text>
          <Text style={styles.largeText}>M+</Text>
        </View>
        <Text style={styles.largeTextTtl}>Paid Out</Text>
      </View>

      <View style={styles.figBox}>
        <View style={styles.txtFigBox}>
          <Text style={styles.largeTextAnimated}>{Math.floor(animatedValues.dailyTasks)}</Text>
          <Text style={styles.largeText}>+</Text>
        </View>
        <Text style={styles.largeTextTtl}>Tasks for you everyday</Text>
      </View>

      <View style={styles.figBox}>
        <View style={styles.txtFigBox}>
          <Text style={styles.largeTextAnimated}>{Math.floor(animatedValues.taskers)}</Text>
          <Text style={styles.largeText}>K+</Text>
        </View>
        <Text style={styles.largeTextTtl}>Taskers</Text>
      </View>

      <View style={styles.figBox}>
        <View style={styles.txtFigBox}>
          <Text style={styles.largeTextAnimated}>{animatedValues.reviews.toFixed(1)}</Text>
          <Ionicons name="star" size={20} color="#CDE8E5" />
        </View>
        <Text style={styles.largeTextTtl}>Reviews</Text>
      </View>
    </View>
        </View>

        <View style={styles.preferenceBox}>
          <Text style={styles.preferTittle}>User Preference & features</Text>
              <View style={styles.userPrefer}>

                    <View style={styles.themeContainer}>
                        <Text style={styles.themeTxt}>Change Theme</Text>
                        {/* Switch Button */}
                        <Switch
                          // value={isDarkTheme}
                          // onValueChange={toggleTheme}
                          // thumbColor={isDarkTheme ? '#f4f3f4' : '#f4f3f4'}
                          // trackColor={{ false: '#767577', true: '#81b0ff' }}
                        />
                    </View>

                    <View style={styles.themeContainer}>
                        <TouchableOpacity style={styles.privacyBtn}>
                        <Text style={styles.themeTxt}>Privacy Policy</Text>
                        <Text style={styles.arrowRight}><Ionicons name="arrow-forward" size={20} color="#CDE8E5" /></Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.themeContainerLog}>
                        <TouchableOpacity style={styles.logOut}>
                        <Text style={{ color: "#7AB2B2" }}>Log out</Text>
                        <Text style={styles.arrowRight}><Ionicons name="log-out-outline" size={24} color="#7AB2B2" /></Text>
                        </TouchableOpacity>
                    </View>


              </View>
        </View>

        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    backgroundColor: '#CDE8E5',
  },
  container: {
    backgroundColor: '#CDE8E5',
  },
  commentBox: {
    backgroundColor: '#4D869C',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -10,
    width:'100%',
    zIndex:1,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  usernameView: {
    justifyContent: 'center',
  },
  usernameText: {
    fontSize: 16,
    color: '#7AB2B2',
    fontWeight: 'bold',
    // borderBottomWidth:2,
    // borderColor:'#7AB2B2',
  },
  commentText: {
    fontSize: 15,
    color: '#CDE8E5',
    width: '100%',
    backgroundColor: '#7AB2B2',
    padding: 10,
    borderRadius:2,
  },
  progressBarContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  progressBar: {
    height: 5,
    flex: 1,
    marginHorizontal: 3,
    borderRadius:5,
  },
  progressBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodlySummary:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20
  },
  moodlySummaryTxt:{
    fontSize:25,
    textAlign:'center',
    fontWeight:'bold',
    color:'#4D869C',
  },
  customBox:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  customFigBox:{
    justifyContent:'center',
    alignItems:'center',
    gap:30,
    marginTop:20,
    paddingVertical:20,
    width:'95%',
    borderRadius:2,
    backgroundColor:'#7AB2B2',
  },
  figBox:{
    flexDirection:'row',
    width:'80%',
    alignItems:'center',
    justifyContent:'space-between',
  },
  txtFigBox:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:3,
  },
  largeText: {
    fontSize: 20,
    color:'#CDE8E5',
  },
  largeTextAnimated:{
    fontSize: 25,
    fontWeight: 'bold',
    color:'#CDE8E5',
  },
  largeTextTtl:{
    fontSize: 15,
    color:'#CDE8E5',
  },
  preferenceBox:{
    paddingHorizontal:10,
    marginTop:20,
  },
  preferTittle:{
    color:'#4D869C',
    fontSize:16,
  },
  themeContainer:{
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    width:'100%',
    backgroundColor:'#7AB2B2',
    marginTop:10,
    height:50,
    paddingHorizontal:10,
    borderRadius:2,
  },
  themeContainerLog:{
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    width:'100%',
    marginTop:10,
    height:50,
    paddingHorizontal:10,
    borderRadius:2,
    borderWidth:2,
    borderColor:'#7AB2B2',
  },
  userPrefer:{
    width:'100%',
  },
  arrowRight:{
    marginRight:10,
  },
  themeTxt:{
    color:'#CDE8E5',
  },
  privacyBtn:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  logOut:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:20
  }
});

const lightTheme = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#000000',
  },
  
});

// Dark theme styles
const darkTheme = StyleSheet.create({
  background: {
    backgroundColor: '#000000',
  },
  text: {
    color: '#FFFFFF',
  },
});

export default AccountScreen;
