import { Animated, Dimensions, Easing, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const SkeletonComponent = () => {

    const {width, height} = Dimensions.get("window")
    const AnimatedLG = Animated.createAnimatedComponent(LinearGradient)
    const AnimatedValue = new Animated.Value(0)

    useEffect(()=>{
        Animated.loop(

            Animated.timing(AnimatedValue, {
                toValue:1,
                duration:1000,
                easing: Easing.linear.inOut,
                useNativeDriver:true
            }),
        ).start()
    })

    const translateX = AnimatedValue.interpolate({
        inputRange:[0,1],
        outputRange:[-width, width]
    })
  return (
    <View style={{
        width:width,
        height:height,
        backgroundColor: "#dddddd",
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center"
    }}>
        <View style={{height:300, width:"90%", overflow:"hidden", borderRadius:100}}>
            <AnimatedLG
            colors = {["#dddddd", "#f0f0f0", "#f0f0f0", "#dddddd"]}
            start={{x:0, y:0}}
            end= {{x:1, y:0}}
            style={{
                height:"100%", width:"100%",transform:[{translateX:translateX}]
            }}
        />
        </View>
    </View>
  )
}

export default SkeletonComponent

const styles = StyleSheet.create({})