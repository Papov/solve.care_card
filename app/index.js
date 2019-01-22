import React from "react";
import { View, Animated, Dimensions, Text, PanResponder } from "react-native";

import styles from "./styles";

const SCREEN_WIDTH = Dimensions.get("window").width;

const colors = ["gray", "red", "blue", "green", "purple"];

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentIndex: 0
    };

    this.positionCenter = new Animated.ValueXY();
    this.positionLeft = new Animated.ValueXY({ x: -SCREEN_WIDTH + 40, y: 0 });
    this.currentLeft = [
      ...this.positionLeft.getTranslateTransform(),
      { perspective: 800 }
    ];

    this.scale = this.positionCenter.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: [1, 0.95, 1]
    });
  }

  // componentDidMount dont work with PanResponder!! need to solve
  // *undefined is not an object (this.PanResponder.panHandlers)
  componentWillMount = () => {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        console.log(this.zindex);
        if (gestureState.dx > 0 && this.state.currentIndex !== 0) {
          this.positionLeft.setValue({
            x: -SCREEN_WIDTH + 40 + gestureState.dx,
            y: 0
          });
        } else {
          this.positionCenter.setValue({ x: gestureState.dx, y: 0 });
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (
          gestureState.dx < -100 &&
          this.state.currentIndex !== colors.length - 1
        ) {
          Animated.spring(this.positionCenter, {
            toValue: { x: -SCREEN_WIDTH + 40, y: 0 },
            bounciness: 10,
            useNativeDriver: true
          }).start(() => {
            this.setState(
              prevState => ({
                currentIndex: prevState.currentIndex + 1
              }),
              () => {
                this.positionCenter.setValue({ x: 0, y: 0 });
              }
            );
          });
        }
        if (gestureState.dx > 100 && this.state.currentIndex !== 0) {
          Animated.spring(this.positionLeft, {
            toValue: { x: 0, y: 0 },
            bounciness: 10,
            useNativeDriver: true
          }).start(() => {
            this.setState(
              prevState => ({
                currentIndex: prevState.currentIndex - 1
              }),
              () => {
                this.positionLeft.setValue({ x: 0, y: 0 });
                this.positionCenter.setValue({ x: 0, y: 0 });
              }
            );
          });
        } else {
          Animated.spring(this.positionCenter, {
            toValue: { x: 0, y: 0 },
            bounciness: 10,
            useNativeDriver: true
          }).start();
        }
      }
    });
  };

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
                      {
                        transform: this.positionCenter.getTranslateTransform()
                      },
                      { backgroundColor: item, zIndex: 2 },
                      styles.box
                    ]}
                  >
                    <Text style={styles.text}>{item}</Text>
                  </Animated.View>
                );
              }
              if (index === this.state.currentIndex - 1) {
                return (
                  <Animated.View
                    {...this.PanResponder.panHandlers}
                    key={item}
                    style={[
                      {
                        transform: this.currentLeft,
                        backgroundColor: item,
                        zIndex: 2
                      },
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
                    {...this.PanResponder.panHandlers}
                    key={item}
                    style={[
                      {
                        transform: [
                          { translateX: -SCREEN_WIDTH + 40 },
                          { translateY: 0 },
                          { perspective: 800 }
                        ],
                        backgroundColor: item,
                        zIndex: -1000
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
                        { perspective: 800 }
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
