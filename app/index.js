import React from "react";
import { View, Dimensions, Animated, Image, PanResponder } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Users = [
  { id: "1", uri: require("../assets/image1.jpg") },
  { id: "2", uri: require("../assets/image2.jpg") },
  { id: "3", uri: require("../assets/image3.png") },
  { id: "4", uri: require("../assets/image4.jpg") }
];

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY();
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-5deg", "0deg", "5deg"],
      extrapolate: "clamp"
    });

    this.rotateAndTranslate = {
      transform: [
        { rotate: this.rotate },
        ...this.position.getTranslateTransform()
      ]
    };

    this.scaleImages = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: "clamp"
    });

    this.state = {
      currentIndex: 0
    };
  }

  componentWillMount = () => {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: (e, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: 0 });
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: 0 },
            useNativeDriver: true
          }).start(() => {
            this.setState(
              prevState => ({
                currentIndex: prevState.currentIndex + 1
              }),
              () => {
                this.position.setValue({ x: 0, y: 0 });
              }
            );
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
            useNativeDriver: true
          }).start(() => {
            this.setState(
              prevState => ({
                currentIndex: prevState.currentIndex + 1
              }),
              () => {
                this.position.setValue({ x: 0, y: 0 });
              }
            );
          });
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: true
          }).start();
        }
      }
    });
  };

  renderUser = () => {
    return Users.map((user, i) => {
      if (i < this.state.currentIndex) {
        return null;
      } else if (i === this.state.currentIndex) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={user.id}
            style={[
              this.rotateAndTranslate,
              {
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: "absolute"
              }
            ]}
          >
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20
              }}
              source={user.uri}
            />
          </Animated.View>
        );
      } else {
        return (
          <Animated.View
            key={user.id}
            style={{
              transform: [{ scale: this.scaleImages }],
              height: SCREEN_HEIGHT - 120,
              width: SCREEN_WIDTH,
              padding: 10,
              position: "absolute"
            }}
          >
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20
              }}
              source={user.uri}
            />
          </Animated.View>
        );
      }
    }).reverse();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }} />
        <View style={{ flex: 1 }}>{this.renderUser()}</View>
        <View style={{ height: 60 }} />
      </View>
    );
  }
}

export default Card;
