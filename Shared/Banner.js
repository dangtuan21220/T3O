import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Dimensions, View, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper/src'

var { width } = Dimensions.get("window");
const Banner = () => {
    const [bannerData, setBannerData] = useState([])
    useEffect(() => {
        setBannerData([
            "https://i.pinimg.com/564x/24/7a/0a/247a0a55e5e6aa0cb2215f375b85dc67.jpg",
            "https://hudson.com.mt/wp-content/uploads/2020/10/bb-8.jpg",
            "https://bizweb.dktcdn.net/100/352/697/products/maxresdefault.jpg?v=1563686552833"
        ])
        return () => {
            setBannerData([])
        }
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
            <View style={styles.swiper}>
                <Swiper
                    style={{ height: width / 2 }}
                    showButtons={false}
                    autoplay={true}
                    autoplayTimeout={5}
                >
                    {bannerData.map((item) => {
                        return (
                            <Image  
                                key={item}
                                style={styles.imageBanner}
                                resizeMode="contain"
                                source={{uri: item}}
                            />
                        );
                    })}
                </Swiper>
            </View>
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        width: width,
        flex: 1,
        alignItems: 'center',
        marginBottom: 10,
    },
    swiper: {
        width: width,
        alignItems: 'center',
    },
    imageBanner: {
        height: width / 2,
        width: width,
        borderRadius: 10,
    }
})
export default Banner;