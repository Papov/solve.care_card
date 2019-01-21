import React from "react";
import { View, Dimensions, Animated, Image } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Users = [
  { id: "1", uri: require("../../../assets/image1.jpg") },
  { id: "2", uri: require("../../../assets/image2.jpg") },
  { id: "3", uri: require("../../../assets/image3.png") },
  { id: "4", uri: require("../../../assets/image4.jpg") }
];

class Card extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image source={require("../../../assets/image1.jpg")} />
        {/* <View style={{ height: 60 }} />
        <View style={{ flex: 1 }}>
          <Animated.View
            style={{ height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH }}
          >
            <Image style={{ resizeMode: "cover" }} source={Users[0].uri} />
          </Animated.View>
        </View>
        <View style={{ height: 60 }} /> */}
      </View>
    );
  }
}

export default Card;
