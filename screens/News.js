import React, { useEffect, useState, useContext } from 'react';
import {
  View, Text, Image, StyleSheet, ActivityIndicator, Dimensions,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Newscontext } from '../API/Context'; // Use context for theme selection

const NewsScreen = () => {
  const { darkTheme } = useContext(Newscontext); // Use the context for theme
  const [news, setNews] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const windowHeight = Dimensions.get('window').height;

  // Fetch news when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/health/in.json');
        const data = await response.json();
        console.log(data);
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

  // Swipe up to move to the next article
  const handleSwipeUp = () => {
    if (currentNewsIndex < news.length - 1) {
      setCurrentNewsIndex(currentNewsIndex + 1);
    }
  };

  // Swipe down to move to the previous article
  const handleSwipeDown = () => {
    if (currentNewsIndex > 0) {
      setCurrentNewsIndex(currentNewsIndex - 1);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const currentNews = news[currentNewsIndex];

  return (
    <GestureRecognizer
      onSwipeUp={handleSwipeUp}
      onSwipeDown={handleSwipeDown}
      style={styles.container}
    >
      <View style={{...styles.newsCard,backgroundColor:darkTheme ? 'black':'white'}}>
        <Image source={{ uri: currentNews?.urlToImage }} style={styles.newsImage} />
        <Text style={{ ...styles.title, color: darkTheme ? 'white' : 'black' }}>
          {currentNews?.title}
        </Text>
        <Text style={{ ...styles.description, color: darkTheme ? 'white' : 'black' }}>
          {currentNews?.description}
        </Text>
      </View>
    </GestureRecognizer>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsCard: {
    height: '100%',
    width: '100%',
    // borderRadius: 10,
    backgroundColor: '#121212',
    paddingHorizontal: 15,
    // justifyContent: 'center',
  },
  newsImage: {
    height: '50%',
    width: '100%',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
});
