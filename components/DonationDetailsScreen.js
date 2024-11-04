import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';

const DonationDetailsScreen = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [currentCampaignIndex, setCurrentCampaignIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://donation-backend-app.vercel.app/api/campaigns/all');
        const data = await response.json();
        setCampaigns(data.data || []);
        setCurrentCampaignIndex(0); // Reset index
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleSwipeUp = () => {
    if (currentCampaignIndex < campaigns.length - 1) {
      setCurrentCampaignIndex(currentCampaignIndex + 1);
    }
  };

  const handleSwipeDown = () => {
    if (currentCampaignIndex > 0) {
      setCurrentCampaignIndex(currentCampaignIndex - 1);
    }
  };

  const currentCampaign = campaigns[currentCampaignIndex];

  if (loading) {
    return <ActivityIndicator size="large" color="#FFD700" style={styles.loadingIndicator} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <GestureRecognizer
          onSwipeUp={handleSwipeUp}
          onSwipeDown={handleSwipeDown}
          style={styles.gestureContainer}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Campaign Details</Text>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Image
            source={{ uri: currentCampaign?.image_url }}
            style={styles.image}
          />

          <Text style={styles.title}>{currentCampaign?.title || 'Loading title...'}</Text>

          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Ionicons name="person-outline" size={16} color="gray" />
              <Text style={styles.tagText}>{currentCampaign?.author || 'Author not available'}</Text>
            </View>
            <View style={styles.tag}>
              <Ionicons name="calendar-outline" size={16} color="gray" />
              <Text style={styles.tagText}>{currentCampaign?.fundRaisingEndDate ? new Date(currentCampaign.fundRaisingEndDate).toLocaleDateString() : 'End date not available'}</Text>
            </View>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${(currentCampaign.donationReceived / currentCampaign.donationGoal) * 100}%` }]} />
          </View>

          <View>
            <Text style={styles.description}>{currentCampaign?.content || 'Description not available'}</Text>
            <Text style={styles.donationDetails}>
              Donation Goal: {currentCampaign?.donationGoal}
            </Text>
            <Text style={styles.donationDetails}>
              Donation Received: {currentCampaign?.donationReceived}
            </Text>
          </View>

          <TouchableOpacity style={styles.donateButton}>
            <Text style={styles.donateButtonText}>Donate Now</Text>
          </TouchableOpacity>
        </GestureRecognizer>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
    padding: 20,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFD700',
  },
  gestureContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,

  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'white'
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 5,
    borderRadius: 15,
    marginRight: 10,
  },
  tagText: {
    marginLeft: 5,
    color: 'gray',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 5,
  },
  progress: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 5,
  },
  description: {
    marginBottom: 20,
    color: 'gray',
  },
  donationDetails: {
    color: 'gray',
    fontSize: 16,
    marginBottom: 5,
  },
  donateButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
  },
  donateButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default DonationDetailsScreen;
