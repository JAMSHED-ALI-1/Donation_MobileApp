import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
import { SceneMap, TabView } from 'react-native-tab-view';
import Discoverscreen from '../screens/Discoverscreen';
import News from '../screens/News';
import Topnavigation from './Topnavigation';

const InshortTabs = () => {
  const layout=useWindowDimensions()
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Discover' },
    { key: 'second', title: 'News' },
  ]);

  const renderScene = SceneMap({
    first: News,
    second: Discoverscreen,
    // second: News,
  });
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={()=><Topnavigation index={index} setIndex={setIndex}/>}
    />
  )
}



const styles = StyleSheet.create({})

export default InshortTabs

