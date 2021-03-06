import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      isFlashLightOn: Camera.Constants.FlashMode.off
    };
  }
  static navigationOption = {
    title: "CameraScreen"
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  }

  flipCamera = () => {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };

  toggleFlashLight = () => {
    this.setState({
      isFlashLightOn:
        this.state.isFlashLightOn === Camera.Constants.FlashMode.off
          ? Camera.Constants.FlashMode.on
          : Camera.Constants.FlashMode.off
    });
  };

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.props.navigation.navigate("Home", { photo: photo });
    }
  };
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <View />;
    } else if (hasCameraPermission === true) {
      return (
        <View style={styles.container}>
          <Camera
            style={styles.cameraView}
            type={this.state.type}
            flashMode={this.state.isFlashLightOn}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View style={styles.actionContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.flipCamera();
                }}
                style={styles.iconHolder}
              >
                <FontAwesome name="camera" size={35} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.takePicture();
                }}
                style={styles.iconHolder}
              >
                <FontAwesome name="circle" size={35} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.toggleFlashLight();
                }}
                style={styles.iconHolder}
              >
                <FontAwesome name="flash" size={35} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
    // return (
    //   <View style={styles.container}>
    //     <Text>CameraScreen</Text>
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center"
  },
  imageHolder: {
    alignSelf: "center"
  },
  button: {
    margin: 20
  },
  cameraView: {
    flex: 1
  },
  actionContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent"
  },
  iconHolder: {
    flex: 1,
    alignItems: "center",
    alignSelf: "flex-end"
  },
  icon: {
    marginBottom: 10,
    color: "#fff"
  }
});
