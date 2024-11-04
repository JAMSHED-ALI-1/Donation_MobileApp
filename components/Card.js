import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Newscontext } from '../API/Context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomTextInput from '../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../screens/utils/Utils';

const categories = [
  { name: 'Human', icon: 'person', color: '#F28B82' },
  { name: 'Study', icon: 'school', color: '#FBBC05' },
  { name: 'Food', icon: 'restaurant', color: '#34A853' },
  { name: 'Medicine', icon: 'local-hospital', color: '#4285F4' },
];

const Card = () => {
  const { darkTheme } = useContext(Newscontext);
  const [campaignData, setCampaignData] = useState([]);
  const navigation=useNavigation()

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(`${BASE_URL}campaigns/all`);
        const data = await response.json();
        setCampaignData(data.data || []);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <View style={{ ...styles.container, backgroundColor: darkTheme ? 'black' : 'white' }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ ...styles.userCircle, backgroundColor: darkTheme ? 'white' : 'white', alignItems: "center", justifyContent: 'center' }}>
            <Icon name='person' size={30} color="pink" />
          </View>
          <Text style={{ ...styles.text, color: darkTheme ? 'white' : 'black' }}>Welcome</Text>
        </View>
        <View style={{ ...styles.notificationCircle, backgroundColor: darkTheme ? 'white' : 'white' }}>
          <Image source={require('../assets/notification.png')} style={{ height: 20, width: 20 }} tintColor={darkTheme ? 'black' : 'black'} />
        </View>
      </View>

      {/* Search Bar */}
      <CustomTextInput placeholder={'Search'} bgcolor={'white'} />

      {/* Hero Image */}
      <View style={styles.hero}>
        <Image source={require('../assets/Donation.jpg')} style={{ height: '100%', width: '100%', borderRadius: 10 }} />
      </View>

      {/* Categories Section */}
        <Text style={{fontSize:18,fontWeight:'600',color:darkTheme?"white":'black',paddingVertical:10}}>Category</Text>
      <View style={styles.hero2}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={[styles.categoryContainer, { backgroundColor: category.color }]}>
            <Icon name={category.icon} size={24} color="white" />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={{fontSize:18,fontWeight:'600',color:darkTheme?"white":'black',paddingVertical:10}}>Compain</Text>
      {/* Donation Campaigns */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.donationScroll}>
        {campaignData.map((campaign, index) => (
          <TouchableOpacity key={index} style={{ ...styles.donationCard, backgroundColor: darkTheme ? 'white' : 'white' }}
          onPress={() => navigation.navigate('Priviewcompain', { content: campaign })}>
            <Image source={{ uri: campaign.image_url }} style={styles.donationImage} />
            <View style={styles.cardContent}>
              <Text style={styles.donationTitle}>{campaign.title}</Text>
              <Text style={styles.donationRaised}>
                ${campaign.donationReceived.toFixed(2)} raised of ${campaign.donationGoal.toFixed(2)}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={{
                    ...styles.progress,
                    width: `${(campaign.donationReceived / campaign.donationGoal) * 100}%`,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
  },
  notificationCircle: {
    width: 35,
    height: 35,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '800',
  },
  userCircle: {
    width: 50,
    height: 50,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  hero: {
    height: '25%',
    width: '100%',
    backgroundColor: 'red',
    borderRadius: 10,
    marginTop: 10,
  },
  hero2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  
  },
  categoryContainer: {
    width: '20%',
    height: 80,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    color: 'white',
    marginTop: 5,
    fontWeight: '600',
  },
  donationScroll: {
    flexDirection: 'row',
    // marginTop: 15,
  },
  donationCard: {
    height: "80%",
    backgroundColor: 'white',
    borderRadius: 10,
    width: 200,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  donationImage: {
    width: '100%',
    height: 100,
  },
  cardContent: {
    padding: 10,
  },
  donationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  donationRaised: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
});


export default Card
