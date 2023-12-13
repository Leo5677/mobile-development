import React from "react";
import styles from "./styles";
import { Button, View, Alert } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Input from "../components/Input";
import { authService } from "../services/auth_service";

export default function Login() {
  /* VARIÁVEIS */
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation<NavigationProp<any>>();

  /* LOGIN */
  const handleSignIn = () => {
    if (
      !username ||
      username.trim() === "" ||
      !password ||
      password.trim() === ""
    ) {
      Alert.alert("Todos os campos são obrigatórios.");
      return false;
    }

    authService.login(username, password).then((logged) => {
      if (logged) {
        Alert.alert("Seja bem-vindo(a)!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Login e/ou senha invalído(a).");
        return false;
      }
    });
  };

  /* COMPONENTE */
  return (
    <View style={styles.container}>
      <Input label="Login" onChangeText={setUsername} />
      <Input label="Password" onChangeText={setPassword} secureTextEntry />

      <View style={styles.buttonView}>
        <Button title="Sign In" onPress={handleSignIn} />
      </View>
    </View>
  );
}
