import React from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
// Constants
import { images, theme } from "../../constants";

const { onBoarding1, onBoarding2, onBoarding3 } = images;
// Theme
const { COLORS, FONTS, SIZES } = theme;

// Dummy Data

const onBoardings = [
  {
    title: "Let's Travelling",
    descriptions:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis animi exercitationem.",
    img: onBoarding1,
  },
  {
    title: "Navigation",
    descriptions:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis animi exercitationem.",
    img: onBoarding2,
  },
  {
    title: "Destination",
    descriptions:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis animi exercitationem.",
    img: onBoarding3,
  },
];

export default function OnBoarding() {
  // Render
  const [completed, setCompleted] = React.useState(false);

  const scrollX = new Animated.Value(0);
  React.useEffect(() => {
    scrollX.addListener(({ value }) => {
      if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
        setCompleted(true);
      }
    });

    return () => scrollX.removeListener();
  }, []);

  function renderDots() {

    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
        <View style={styles.dotsContainer}>
            {onBoardings.map((item, index) => {
                const opacity = dotPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: "clamp"
                });

                const dotSize = dotPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [SIZES.base, 17, SIZES.base],
                    extrapolate: "clamp"
                });

                return (
                    <Animated.View
                        key={`dot-${index}`}
                        opacity={opacity}
                        style={[styles.dot, { width: dotSize, height: dotSize, }]}
                    />
                );
            })}
        </View>
    );
}
  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment='center'
        onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
        ], { useNativeDriver: false })}
      >
        {onBoardings.map((item, index) => (
          <View key={index} style={{ width: SIZES.width }}>
            {/* Image */}
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={item.img}
                resizeMode='cover'
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
            {/* Text */}
            <View
              style={{
                position: "absolute",
                bottom: "10%",
                left: 40,
                right: 40,
              }}
            >
              <Text
                style={{
                  ...FONTS.h1,
                  color: COLORS.gray,
                  textAlign: "center",
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.gray,
                  textAlign: "center",
                  marginTop: SIZES.base,
                }}
              >
                {item.descriptions}
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>{renderContent()}</View>
      <View>{renderDots()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  dotsContainer: {
    flexDirection: "row",
    bottom: 20,
    alignItems: "center"
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
});
