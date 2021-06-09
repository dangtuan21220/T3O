import React from "react"
import { View, Text } from 'react-native'
import AnimatedEllipsis from 'react-native-animated-ellipsis';

const Loading = (props) => {
    return (
        <View>
          <Text>
            Loading
            <AnimatedEllipsis />
          </Text>
        </View>
      ); 
}

export default Loading;