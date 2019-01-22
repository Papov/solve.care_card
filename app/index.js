import React from "react";
import { View, Animated, Dimensions, Text, PanResponder } from "react-native";

import styles from "./styles";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const colors = ["gray", "red", "blue", "green", "purple"];

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentIndex: 0
    };

    this.position = new Animated.ValueXY();
    this.scale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: [1, 0.99, 1]
    });
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: (e, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: 0 });
      },
      onPanResponderRelease: (e, gestureState) => {
        if (
          gestureState.dx < 120 &&
          this.state.currentIndex !== colors.length - 1
        ) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH + 40, y: 0 },
            friction: 2,
            overshootClamping: true,
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
        }
        if (gestureState.dx > 120 && this.state.currentIndex !== 0) {
          this.setState(
            prevState => ({
              currentIndex: prevState.currentIndex - 1
            }),
            () => {
              Animated.spring(this.position, {
                toValue: { x: 0, y: 0 },
                friction: 2,
                useNativeDriver: true
              }).start();
            }
          );
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 2,
            useNativeDriver: true
          }).start();
        }
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <View style={styles.main}>
          {colors
            .map((item, index) => {
              if (index === this.state.currentIndex) {
                return (
                  <Animated.View
                    {...this.PanResponder.panHandlers}
                    key={item}
                    style={[
                      { transform: this.position.getTranslateTransform() },
                      { backgroundColor: item, zIndex: 1 + index },
                      styles.box
                    ]}
                  >
                    <Text style={styles.text}>{item}</Text>
                  </Animated.View>
                );
              }
              if (index < this.state.currentIndex) {
                return (
                  <Animated.View
                    key={item}
                    style={[
                      {
                        transform: [
                          { translateX: -SCREEN_WIDTH + 40 },
                          { translateY: 0 },
                          { perspective: 500 }
                        ],
                        backgroundColor: item,
                        zIndex: index
                      },
                      styles.box
                    ]}
                  >
                    <Text style={styles.text}>{item}</Text>
                  </Animated.View>
                );
              }
              return (
                <Animated.View
                  key={item}
                  style={[
                    {
                      transform: [
                        { scale: this.scale },
                        { translateX: 5 + index },
                        { translateY: 5 + index },
                        { perspective: 500 }
                      ]
                    },
                    { backgroundColor: item },
                    styles.box
                  ]}
                >
                  <Text style={styles.text}>{item}</Text>
                </Animated.View>
              );
            })
            .reverse()}
        </View>
        <View style={styles.footer} />
      </View>
    );
  }
}

export default App;
