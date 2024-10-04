import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';

const DonationDetailsScreen = () => {
  const [news, setNews] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/health/in.json');
        const data = await response.json();
        setNews(data.articles || []);
        setCurrentNewsIndex(0); // Reset index
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleSwipeUp = () => {
    if (currentNewsIndex < news.length - 1) {
      setCurrentNewsIndex(currentNewsIndex + 1);
    }
  };

  const handleSwipeDown = () => {
    if (currentNewsIndex > 0) {
      setCurrentNewsIndex(currentNewsIndex - 1);
    }
  };

  const currentNews = news[currentNewsIndex];

  if (loading) {
    return <ActivityIndicator size="large" color="#FFD700" />;
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
          <Text style={styles.headerTitle}>Details</Text>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: currentNews?.urlToImage }}
          style={styles.image}
        />

        <Text style={styles.title}>{currentNews?.title || 'Loading...'}</Text>

        <View style={styles.tagContainer}>
          <View style={styles.tag}>
            <Ionicons name="location-outline" size={16} color="gray" />
            <Text style={styles.tagText}>{currentNews?.source.name || 'Loading...'}</Text>
          </View>
          <View style={styles.tag}>
            <Ionicons name="eye-outline" size={16} color="gray" />
            <Text style={styles.tagText}>{currentNews?.publishedAt ? new Date(currentNews.publishedAt).toLocaleDateString() : 'Loading...'}</Text>
          </View>
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${(currentNewsIndex + 1) / news.length * 100}%` }]} />
        </View>

        <View>
          <Text style={{ ...styles.description, fontSize: 14 }}>{currentNews?.description || 'Loading...'}</Text>
          <Text style={{ ...styles.description, fontSize: 14 }}>{currentNews?.description || 'Loading...'}</Text>
          <Text style={{ ...styles.description, fontSize: 14 }}>{currentNews?.description || 'Loading...'}</Text>
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
