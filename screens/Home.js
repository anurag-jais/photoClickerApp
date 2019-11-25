import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

export default class Home extends React.Component {
  render() {
    let photo = this.props.navigation.getParam("photo", "empty");
    return (
      <View style={styles.container}>
        <Image
          resizeMode="center"
          style={styles.imageHolder}
          source={photo === "empty" ? require("../assets/email.png") : photo}
        />
        <Button
          title="take photo"
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("CameraScreen");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  imageHolder: {
    alignSelf: "center",
    height: 500,
    width: 20
  },
  button: {
    margin: 20
  }
});
