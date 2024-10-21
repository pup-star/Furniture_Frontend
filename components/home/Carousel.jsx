import { View, StyleSheet, Text, Image } from 'react-native';
import React from 'react';
// import { SliderBox } from 'react-native-image-slider-box';
import { COLORS } from '../../constants';
const logoImg = require("../../assets/images/fn5.jpg")


const Carousel = () => {
    const slides = [
       require('../../assets/images/Pose23.png'),
       require('../../assets/images/profile.jpeg'),
       require('../../assets/images/space.jpg'),
    ]
  return (
    <View style={styles.carouselcontainer}>
        <Image source={logoImg} style={{ width: 360, height: 200, borderRadius: 15}}
        // dotColor={COLORS.primary}
        // inactiveDotColor = {COLORS.secondary}
        // ImageComponentStyle = {{borderRadius: 15, width: "95%", marginTop: 15 }}
        // autoplay
        // circleLoop
        />
    </View>
  )
}

export default Carousel;


const styles = StyleSheet.create({
    carouselcontainer: {
        flex: 1,
        alignItems: "center",
    }
})