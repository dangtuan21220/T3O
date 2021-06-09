import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from 'react-native-elements'
import FormContainer from "../Form/FormContainer";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-community/async-storage"
import Loading from "../../Shared/Loading"
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const EditProfile = (props) => {


    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState();
    var editProfileInProcess = false;

    useEffect(() => {
        
        AsyncStorage.getItem("jwt")
            .then((res) => {
                const AuthStr = 'Bearer '.concat(res); 
                axios.get(`${baseURL}/users/getCurrentUser`,  { headers: { Authorization: AuthStr } })
                    .then(
                        (user) => {
                            setName(user.data.name),
                            setPhone(user.data.phone),
                            setAddress(user.data.address),
                            setCity(user.data.city)                           
                        },
                    )
                    .then(res => {
                        // If request is good...
                        console.log("Good request ");
                    })
                    .catch((error) => {
                        console.log('error ' + error);
                    });
            })
            .catch((error) => console.log(error))

        return () => {
            setName();
            setAddress();
            setCity();
            setPhone();
        };

    }, [])
    

  const editProfile = () => {
    if (name === "" || phone === "" || address === "" || city === "") {
      setError("Hãy điền đầy đủ các trường!");
    }

    let userUpdate = {
      name: name,
      phone: phone,
      address: address,
      city: city
    };

    AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

    axios
        .put(`${baseURL}/users/updateUser`, userUpdate, config)
        .then((res) => {
            if (res.status == 200 || res.status == 201) {
            Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Đã cập nhật tài khoản.",
                text2: "",
            });
            setTimeout(() => {
                props.navigation.navigate("User Profile");
            }, 1000);
            }
        })
}

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <View style={{ height: 40}}></View>
      <FormContainer title={"Sửa thông tin"}>
      <View style={{ height: 10}}></View>
        <Input
          leftIcon={
            <Icon
              name='user'
              size={25}
              color='#aaaaaa'
              style={{paddingRight: 10, paddingLeft: 5}}
            />
          }
          label={"Họ và tên"}
          placeholder={"Tên"}
          value={name}
          name={"name"}
          id={"name"}
          onChangeText={(text) => setName(text)}
        />
        <Input
          leftIcon={
            <Icon
              name='phone-square'
              size={25}
              color='#aaaaaa'
              style={{paddingRight: 10, paddingLeft: 5}}
            />
          }
          label={"Số điện thoại"}
          placeholder={"Số điện thoại"}
          value={phone}
          name={"phone"}
          id={"phone"}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          leftIcon={
            <Icon
              name='address-book-o'
              size={25}
              color='#aaaaaa'
              style={{paddingRight: 10, paddingLeft: 5}}
            />
          }
          label={"Địa chỉ"}
          placeholder={"Địa chỉ"}
          value={address}
          name={"address"}
          id={"address"}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          leftIcon={
            <Icon
              name='building-o'
              size={25}
              color='#aaaaaa'
              style={{paddingRight: 10, paddingLeft: 5}}
            />
          }
          label={"Thành phố"}
          placeholder={"Thành phố"}
          value={city}
          name={"city"}
          id={"city"}
          onChangeText={(text) => setCity(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <Button title={'Xác nhận'} onPress={() => {
            if(!editProfileInProcess){
              editProfileInProcess = true;
              editProfile();
            } else {
              <Loading />
            }
          }} />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("User Profile")}
          >
            <Text style={{
                paddingTop: 20, 
                color: "red",
            }}>Quay về trang Profile</Text>
          </TouchableOpacity>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
});

export default EditProfile;