import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import FormContainer from "../Form/FormContainer";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MyButton from "../../Shared/MyButton";
import Loading from "../../Shared/Loading"
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [isSecureEntry1, setIsSecureEntry1] = useState(true);
  const [isSecureEntry2, setIsSecureEntry2] = useState(true);
  var registerInProcess = false;
  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "" || city === "" || address === "") {
      setError("Hãy điền đầy đủ các trường!");
    } else if(password !== password2){
      setError("Mật khẩu nhập lại không trùng khớp!");
    } else {
      let user = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address,
        city: city,
        isAdmin: false,
      };
      axios
        .post(`${baseURL}/users/register`, user)
        .then((res) => {
          if (res.status == 200) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Đăng ký thành công!",
              text2: "Hãy đăng nhập tài khoản của bạn",
            });
            setTimeout(() => {
              props.navigation.navigate("Login");
            }, 500);
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Opp, Đã có lỗi xảy ra!",
            text2: "Vui lòng thử lại.",
          });
        });
    }
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer>
        <Text style={{fontSize: 30}}> Đăng ký</Text>
        <Input
          leftIcon={
            <Icon
              name='envelope'
              size={20}
              color='#aaaaaa'
              style={{paddingRight: 10, paddingLeft: 5}}
            />
          }
          label={"Email"}
          style={{fontSize: 15, paddingLeft: 10}}
          placeholder={"abc@gmail.com"}
          name={"email"}
          id={"email"}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
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
          style={{fontSize: 15, paddingLeft: 10}}  
          placeholder={"Nguyen Van A"}
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
          style={{fontSize: 15, paddingLeft: 10}}
          placeholder={"0123456789"}
          name={"phone"}
          id={"phone"}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          leftIcon={
            <Icon
              name='lock'
              size={25}
              color='#aaaaaa'
              style={{paddingRight: 10, paddingLeft: 5}}
            />
          }
          label={"Mật khẩu"}
          style={{fontSize: 15, paddingLeft: 10}}
          placeholder={"********"}
          name={"password"}
          id={"password"}
          secureTextEntry={isSecureEntry1}
          rightIcon={
             <TouchableOpacity onPress={() => {setIsSecureEntry1( (prev) => !prev)}}>
                <Icon
                name='eye'
                size={20}
                color='#aaaaaa'
                style={{paddingRight: 5}}
                
              /> 
             </TouchableOpacity> 
          }
          onChangeText={(text) => setPassword(text)}
        />
         <Input
          leftIcon={
            <Icon
              name='lock'
              size={25}
              color='#aaaaaa'
              style={{paddingRight: 10, paddingLeft: 5}}
            />
          }
          label={"Nhập lại mật khẩu"}
          style={{fontSize: 15, paddingLeft: 10}}
          placeholder={"********"}
          name={"password2"}
          id={"password2"}
          secureTextEntry={isSecureEntry2}
            rightIcon={
               <TouchableOpacity onPress={() => {setIsSecureEntry2( (prev) => !prev)}}>
                  <Icon
                  name='eye'
                  size={20}
                  color='#aaaaaa'
                  style={{paddingRight: 5}}
                  
                /> 
               </TouchableOpacity> 
            }
          onChangeText={(text) => setPassword2(text)}
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
          style={{fontSize: 15, paddingLeft: 10}}
          placeholder={"Nhập địa chỉ"}
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
          style={{fontSize: 15, paddingLeft: 10}}
          placeholder={"Nhập thành phố"}
          name={"city"}
          id={"city"}
          onChangeText={(text) => setCity(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <MyButton style={{
                    backgroundColor:'#1ab7ea', 
                    borderRadius: 20, 
                    marginTop: -15
                    }} large primary onPress={() => {
                      if (!registerInProcess) {
                        registerInProcess = true;
                        register()
                    } else {
                        <Loading />                    
                    }}}>
            <Text style={{ color: "white", fontWeight:'700', fontSize: 16 }}>Đăng ký</Text>
          </MyButton>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={{
                paddingTop: 5, 
                color: "#3250FF",
            }}>Trở về trang Đăng nhập</Text>
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

export default Register;