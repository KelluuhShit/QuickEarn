import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image, ImageBackground, TouchableOpacity, Animated, FlatList  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import smoothImg from '../assets/walletImg/smooth.png'
import noRecent from '../assets/walletImg/noRecent.png'

const RewardScreen = ({ navigation }) => {

  const backgroundColorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundColorAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(backgroundColorAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [backgroundColorAnim]);

  const backgroundColorInterpolation = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#7AB2B2', '#9AD3D3'], // Start and end colors
  });

  // Data for FlatList
  const paymentOptions = [
    { id: '1', title: 'PayPal', color: '#003087' },
    { id: '2', title: 'Safaricom', color: '#0F9D58' },
    { id: '3', title: 'Stripe', color: '#6772e5' },
  ];

  // Render each payment button
  const renderPaymentOption = ({ item }) => (
    <TouchableOpacity style={[styles.paymentButton, { backgroundColor: item.color }]}>
      <Text style={styles.paymentButtonText}>{item.title}</Text>
    </TouchableOpacity>
  );


  return (
    <ScrollView style={styles.pageView}>
    <View style={styles.container}>
      <View style={styles.headerCont}>
      <Text style={styles.header}>My Balance</Text>
      </View>

      <ImageBackground
      source={smoothImg}
      style={styles.BalContainer}
      imageStyle={{ borderRadius: 22 }}
      >
      <View style={styles.balTittle}>
        <Text style={styles.balText}>Available Balance</Text>
        <View style={styles.userBalCon}>
          <Text style={styles.dola}>$</Text>
          <Text style={styles.userBal}>150.00</Text>
        </View>
      </View>
      <Animated.View style={[styles.withdrawCont, { backgroundColor: backgroundColorInterpolation }]}>
      <View style={styles.withdrawCont}>
        <TouchableOpacity style={styles.withdrawButton}><Text style={styles.withdrawText}>Withdraw</Text></TouchableOpacity>
      </View>
      </Animated.View>
    </ImageBackground>

    <View style={styles.historyNav}>
      <Text style={styles.historyNavTxt}>History</Text>
      <TouchableOpacity style={styles.seeAllBtn}><Text style={styles.historyNavTxtAll}>See All</Text></TouchableOpacity>
    </View>
    <ScrollView style={styles.recentCont}>
    {/* recent transaction history */}
        <View style={styles.noRecentAlert}>
          <Text style={styles.noRecentExplain}>No Recent Transactions Found.</Text>
            <Image
                source={noRecent}
                style={styles.noRecent}
              />
        </View>
    </ScrollView>
    {/* fatlist with payment ways */}
    <View style={styles.paymentOptionsContainer}>
          <FlatList
            data={paymentOptions}
            renderItem={renderPaymentOption}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
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
    backgroundColor: '#CDE8E5',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCont:{
    width:'100%',
    justifyContent:'flex-start',
    marginTop:10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4D869C',
    textAlign:'left'
  },
  BalContainer:{
    width:'100%',
    marginTop:10,
    borderRadius:20,
    overflow:'hidden',
    backgroundColor:'#CDE8E5',
    elevation:4
  },
  balTittle:{
    justifyContent:'center',
    width:'100%',
    alignItems:'center',
    marginTop:20,
    
  },
  balText:{
    color:'#4D869C',
    fontSize:18,
  },
  userBalCon:{
    flexDirection:'row',
  },
  userBal:{
    fontSize:40,
    color:'#6c757d'
  },
  dola:{
    fontSize:27,
    color:'#6c757d'
  },
  noRecentExplain:{
    color:'#6c757d',
    fontSize:15,
  },
  withdrawCont:{
    width:'100%',
    height:100,
    justifyContent:'center',
    alignItems:'center',
  },
  withdrawButton:{
    width:'80%',
    paddingVertical:10,
    borderRadius:20,
    elevation:3,
    backgroundColor:'#CDE8E5',


  },
  withdrawText:{
    color:'#4D869C',
    textAlign:'center',
    
  },
  historyNav:{
    flexDirection:'row',
    width:'90%',
    justifyContent:'space-between',
    marginTop:15,
  },
  historyNavTxt:{
    color:'#7AB2B2',
    fontSize:15,
  },
  historyNavTxtAll:{
    color:'#7AB2B2',
    fontSize:15,
    
  },
  seeAllBtn:{
    borderBottomWidth:2,
    borderBottomColor:'#7AB2B2'
  },
  recentCont:{
    height:300,
    // backgroundColor:'#7AB2B2',
    width:'100%',
    marginTop:10,
  },
  noRecentAlert:{
    height:300,
    justifyContent:'center',
    alignItems:'center',
  },
  noRecent:{
    width:200,
    height:200,
  },
  paymentOptionsContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  paymentButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    margin: 10,
    borderRadius: 2,
    alignItems: 'center',
    
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RewardScreen;
