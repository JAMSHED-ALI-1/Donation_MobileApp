import React, { useContext } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Context, { Newscontext } from "./API/Context";
import InshortTabs from "./components/InshortTabs";
import Login from "./screens/Auth/Login";
import Stacknavigation from "./screens/navigation/Stacknavigation";

function App() {
  const { darkTheme } = useContext(Newscontext);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: darkTheme ? "#282C35" : "white",
      }}
    >
      {/* <InshortTabs /> */}
      <Stacknavigation/>
      {/* <Login/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
  },
});

export default () => {
  return (
    <Context>
      <App />
    </Context>
  );
};
