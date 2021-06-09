import React, { useState } from "react";
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

const EditPassword = (props) => {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState();
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntry1, setIsSecureEntry1] = useState(true);
  const [isSecureEntry2, setIsSecureEntry2] = useState(true);
  var editPassInProcess = false;

  const editPassword = () => {
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      setError("Hãy điền đầy đủ các trường!");
    }
    else if (newPassword !== confirmPassword) {
      setError("Nhập lại mật khẩu trùng với mật khẩu mới!");
    }

    let passwordUpdate = {
      oldPassword: oldPassword,
      newPassword: confirmPassword
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
      .put(`${baseURL}/users/changePassword`, passwordUpdate, config)
      // .then(console.log(passwordUpdate))
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Đã cập nhật password thành công!",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("User Profile");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Opps, sai mật khẩu cũ rồi.",
          text2: "Xin vui lòng thử lại",
        });
      });
  }



  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <View style={{ height: 40 }}></View>

      <FormContainer title={"Đổi mật khẩu"}>
        <View style={{ height: 15 }}></View>
        <Input
          leftIcon={
            <Icon
              name='lock'
              size={24}
              color='#aaaaaa'
              style={{ paddingRight: 10, paddingLeft: 5 }}
            />
          }
          label={"Mật khẩu cũ"}
          placeholder={"******"}
          name={"oldPassword"}
          id={"oldPassword"}
          secureTextEntry={isSecureEntry}
          rightIcon={
            <TouchableOpacity onPress={() => { setIsSecureEntry((prev) => !prev) }}>
              <Icon
                name='eye'
                size={20}
                color='#aaaaaa'
                style={{ paddingRight: 5 }}

              />
            </TouchableOpacity>
          }
          onChangeText={(text) => setOldPassword(text)}
        />
        <Input
          leftIcon={
            <Icon
              name='lock'
              size={24}
              color='#aaaaaa'
              style={{ paddingRight: 10, paddingLeft: 5 }}
            />
          }
          label={"Nhập mật khẩu mới"}
          placeholder={"******"}
          name={"newPassword"}
          id={"newPassword"}
          secureTextEntry={isSecureEntry1}
          rightIcon={
            <TouchableOpacity onPress={() => { setIsSecureEntry1((prev) => !prev) }}>
              <Icon
                name='eye'
                size={20}
                color='#aaaaaa'
                style={{ paddingRight: 5 }}

              />
            </TouchableOpacity>
          }
          onChangeText={(text) => setNewPassword(text)}
        />
        <Input
          leftIcon={
            <Icon
              name='lock'
              size={24}
              color='#aaaaaa'
              style={{ paddingRight: 10, paddingLeft: 5 }}
            />
          }
          label={"Nhập lại mật khẩu mới"}
          placeholder={"******"}
          name={"confirmPassword"}
          id={"confirmPassword"}
          secureTextEntry={isSecureEntry2}
          rightIcon={
            <TouchableOpacity onPress={() => { setIsSecureEntry2((prev) => !prev) }}>
              <Icon
                name='eye'
                size={20}
                color='#aaaaaa'
                style={{ paddingRight: 5 }}

              />
            </TouchableOpacity>
          }
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <Button title={'Xác nhận'} onPress={() => {
            if (!editPassInProcess) {
              editPassInProcess = true;
              editPassword()
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
    marginTop: 15,
    alignItems: "center",
  },
});

export default EditPassword;