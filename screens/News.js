import React, { useEffect, useState, useContext } from 'react';
import {
  View, Text, Image, StyleSheet, ActivityIndicator, Dimensions,
  TouchableOpacity, SafeAreaView, StatusBar,
} from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Newscontext } from '../API/Context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const NewsScreen = () => {
  const { darkTheme } = useContext(Newscontext);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://donation-backend-app.vercel.app/api/campaigns/all');
        const data = await response.json();
        setCampaigns(data.data || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <View style={[styles.card, { backgroundColor: darkTheme ? '#1a1a1a' : 'white' }]}>
        {/* Image Section */}
        <View style={styles.imageSection}>
          <Image 
            source={{ uri: item?.image_url }} 
            style={styles.image}
          />
          <View style={styles.dateOverlay}>
            <Text style={styles.dateText}>
              {new Date(item?.fundRaisingStartDate).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={[styles.title, { color: darkTheme ? 'white' : 'black' }]}>
            {item?.title}
          </Text>

          <View style={styles.authorRow}>
            <Ionicons name="person-outline" size={14} color="gray" />
            <Text style={styles.authorText}>{item?.author || 'Anonymous'}</Text>
          </View>

          <Text style={[styles.content, { color: darkTheme ? '#ddd' : '#444' }]}>
            {item?.content?.split(' ').slice(0, 50).join(' ')}
            {item?.content?.split(' ').length > 50 ? '... ' : ' '}
            <Text 
              style={styles.readMore}
              onPress={() => navigation.navigate('Priviewcompain', { content: item })}
            >
              Read More
            </Text>
          </Text>

          {/* Progress Section */}
          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${Math.min((item.donationReceived / item.donationGoal) * 100, 100)}%` }
                ]} 
              />
            </View>
            <View style={styles.progressStats}>
              <Text style={styles.progressText}>
                ${item.donationReceived.toLocaleString()} raised
              </Text>
              <Text style={styles.progressText}>
                of ${item.donationGoal.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Campaign Dates */}
          <View style={styles.campaignDates}>
            <Text style={styles.dateLabel}>
              Campaign ends: {new Date(item?.fundRaisingEndDate).toLocaleDateString()}
            </Text>
          </View>

          {/* Donate Button */}
          <TouchableOpacity
            style={styles.donateButton}
            onPress={() => navigation.navigate('DonationForm', { content: item })}
          >
            <Text style={styles.donateText}>Donate Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: darkTheme ? 'black' : '#f5f5f5' }]}>
      <StatusBar barStyle={darkTheme ? 'light-content' : 'dark-content'} />
      <SwiperFlatList
        vertical
        data={campaigns}
        renderItem={renderItem}
        showPagination={false}
        keyExtractor={(item) => item._id}
        snapToInterval={height}
        decelerationRate="fast"
        bounces={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    height: height,
    width: width,
  },
  card: {
    flex: 1,
  },
  imageSection: {
    height: height * 0.2,
    position: 'static',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dateOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  dateText: {
    color: 'white',
    fontSize: 12,
  },
  contentSection: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 28,
    marginBottom: 10,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  authorText: {
    color: 'gray',
    marginLeft: 5,
    fontSize: 14,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  readMore: {
    color: '#007AFF',
    fontWeight: '500',
  },
  progressSection: {
    marginVertical: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressText: {
    color: 'gray',
    fontSize: 12,
  },
  campaignDates: {
    marginBottom: 20,
  },
  dateLabel: {
    color: 'gray',
    fontSize: 12,
  },
  donateButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    // marginTop: 'auto',
  },
  donateText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NewsScreen;