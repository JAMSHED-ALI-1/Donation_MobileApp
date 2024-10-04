import React, { useContext,useState,useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
// import Carousel from "react-native-reanimated-carousel"; // Unused import
import { categories, sources } from "../API/api";
import { Newscontext } from "../API/Context";
// import Search from "../components/Search";
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const DiscoverScreen = () => {
  const windowWidth = Dimensions.get("window").width; 
  const [news, setNews] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const currentNews = news[currentNewsIndex];
  const [loading, setLoading] = useState(true);
  const { setCategory, setSource, darkTheme } = useContext(Newscontext);
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/health/in.json');
        const data = await response.json();
        // console.log(data);
        setNews(data.articles || []);
       
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <View style={{...styles.box,backgroundColor:darkTheme ? 'white':'black',shadowColor:darkTheme ? 'black':'white'}}>
        <Image source={require('../assets/Image.png')} style={styles.newsImage} />
       <View>

      
        <Text style={[styles.itemTitle,{fontSize:14,fontWeight:'500',color: darkTheme ? "black" : "white"}]}>{item.title}</Text>
        <Text style={{...styles.itemTitle,color: darkTheme ? "black" : "white"}}>{item.description}</Text>
        </View>
      </View>
    );
  };
  
  return (
    <View style={[styles.discover,{backgroundColor: darkTheme ? "white" : "black"}]}>
      {/* <Search /> */}
      <Text
        style={{ ...styles.subtitle, color: darkTheme ? "black" : "white" }}
      >
        Categories
      </Text>

      <View style={styles.sources}>
        {sources.map((s) => (
          <TouchableOpacity
            onPress={() => setSource(s.id)}
            key={s.id}
            style={styles.sourceContainer}
          >
            <Image source={{ uri: s.pic }} style={styles.sourceImage} />
          </TouchableOpacity>
        ))}
      </View>

      <Text
        style={{ ...styles.subtitle, color: darkTheme ? "black" : "white"}}
      >
        Resent
      </Text>
      <FlatList
        data={news}
        renderItem={renderItem}
        // keyExtractor={item => item.id}
        
      />


    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  discover: {
    padding: 10,
    // alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 8,
    marginHorizontal: 5,
    borderBottomColor: "#007FFF",
    borderBottomWidth: 5,
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  category: {
    height: 130,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  categoryImage: {
    height: "60%",
    width: "100%",
    resizeMode: "contain",
  },
  name: {
    fontSize: 14,
    textTransform: "capitalize",
  },
  sources: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 15,
  },
  sourceContainer: {
    height: 150,
    width: "40%",
    borderRadius: 10,
    margin: 15,
    backgroundColor: "#cc313d",
  },
  sourceImage: {
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  box: {
    height: 100,
    width: '100%',
    backgroundColor: '#fff',
    marginTop:15,
    borderRadius:10,
    flexDirection:'row',
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4,
  },
  newsImage: {
    height: '100%',
    width: '30%',
    borderRadius: 10,
  },itemTitle:{
// fontWeight:'300',
fontSize:12,
left:10,

  }
});
