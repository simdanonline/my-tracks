import Axios from "axios";
import { Toast } from "native-base";
import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const onReset = async () => {
    try {
      if (!validateEmail(email)) {
        return Alert.alert("Error", "Please enter a valid email address");
      }

      setIsLoading(true);

      const response = await Axios.post(
        "https://simdanonline-tracksapp.herokuapp.com/v1/user-password/reset",
        { email }
      );
      Toast.show({
        type: "success",
        text: "Password reset email sent successfully",
      });
      setIsLoading(false);
    } catch (error) {
      let errm = error.message;
      if (error.response) {
        if (error.response.data) {
          if (error.response.data.error) {
            errm = error.response.data.error;
          }
        }
      }
      setIsLoading(false);
      Toast.show({
        type: "danger",
        text: errm,
        duration: 3500,
      });
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center" }}
    >
      <View style={{ paddingHorizontal: 25 }}>
        <Input
          placeholder="Enter email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={{
            paddingVertical: 10,
            backgroundColor: "#0D5581",
            marginTop: 20,
          }}
          onPress={onReset}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Send Password Reset Email
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;
