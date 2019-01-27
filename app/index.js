import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  PanResponder
} from "react-native";

import Item from "./Item";

const SCREEN = Dimensions.get("window").width;

const colors = ["red", "green", "yellow"];

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
    width: SCREEN,
    height: SCREEN,
    alignItems: "center",
    justifyContent: "center"
  }
});

class App extends React.Component {
  constructor() {
    super();

    this.currentIndex = 0;

    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: -50 };

    this.data = [...colors];

    this.state = {
      isLoading: false,
      data: this.data
    };

    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestures) => {
        if (gestures.dx <= 120 && this.currentIndex === colors.length - 1) {
          console.log("show preloader!");
        }
      },
      onPanResponderRelease: (e, gestures) => {
        if (
          this.currentIndex === this.state.data.length - 1 &&
          gestures.dx <= 120
        ) {
          this.setState(
            {
              isLoading: true
            },
            () => {
              setTimeout(() => {
                this.setState({
                  isLoading: false,
                  data: [...this.state.data, "gray", "purple"]
                });
              }, 3000);
            }
          );
        }
      }
    });
  }

  showActivitiIndicator = item => {
    this.currentIndex = item.viewableItems[0].index;
  };

  render() {
    return (
      <View>
        <FlatList
          {...this.PanResponder.panHandlers}
          data={this.state.data}
          renderItem={({ item, index }) => {
            return (
              <Item
                last={index === colors.length - 1}
                changeEnabled={this.changeEnabled}
                style={[{ backgroundColor: item }, styles.box]}
              >
                <Text>{item}</Text>
              </Item>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={{ width: SCREEN }}
          keyExtractor={item => item}
          onViewableItemsChanged={this.showActivitiIndicator}
          viewabilityConfig={this.viewabilityConfig}
        />
        {this.state.isLoading && (
          <ActivityIndicator size="large" color="#000" />
        )}
      </View>
    );
  }
}

export default App;
