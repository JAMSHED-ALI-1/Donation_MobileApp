import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {  View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
const API_URL = 'https://jsonplaceholder.typicode.com';

const Card = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [news, setNews] = useState([]);
const navigation=useNavigation()




useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/health/in.json');
        const data = await response.json();
        setNews(data.articles || []);
       
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch(`${API_URL}/photos?_limit=3`);
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
         <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.spotlight}>
        <Text style={styles.spotlightTitle}>Spotlight</Text>
        <View style={styles.spotlightContent}>
          <Image 
            source={require('../assets/Image.png')} 
            style={styles.spotlightIcon} 
          />
          <View>
            <Text style={styles.spotlightText}>Surat kuasa untuk generasi muda mengaji</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Donasi sekarang</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.donationSection}>
        <Text style={styles.sectionTitle}>Donation Balance:</Text>
        <Text style={styles.donationAmount}>Rp. 500.000</Text>
      </View>

      <View style={styles.campaignSection}>
        <Text style={styles.sectionTitle}>Latest Campaign</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {campaigns.map((campaign) => (
            <TouchableOpacity key={campaign.id} style={styles.campaignCard} onPress={()=>navigation.navigate('DonationDetailsScreen')}>
              <Image source={{ uri: campaign.thumbnailUrl }} style={styles.campaignImage} />
              <Text style={styles.campaignTitle}>{campaign.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
       <View style={{marginTop:20}}>
       <Text style={styles.sectionTitle}>Latest Campaign</Text>
       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {campaigns.map((campaign) => (
            <View key={campaign.id} style={styles.campaignCard}>
              <Image source={{ uri: campaign.thumbnailUrl }} style={styles.campaignImage} />
              <Text style={styles.LocationTitle}>New Delhi</Text>
            </View>
          ))}
        </ScrollView>
       </View>
      </View>

      {/* Add more sections as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 20,
    padding:15
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  spotlight: {
    backgroundColor: '#FFD700',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  spotlightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  spotlightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotlightIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  spotlightText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  donationSection: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  donationAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  campaignSection: {
    margin: 10,
  },
  campaignCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150,
  },
  campaignImage: {
    width: 130,
    height: 100,
    borderRadius: 5,
    marginBottom: 5,
  },
  campaignTitle: {
    fontSize: 14,
  },
  LocationTitle:{
    fontSize:14,
    color:'#111',
    alignSelf:'center'
  }
});



export default Card
