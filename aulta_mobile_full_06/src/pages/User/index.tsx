import React from "react";
import styles from "./styles";
import { Button, View, Alert } from "react-native";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { userService } from "../services/user_service";
import Input from "../components/Input";

export default function Login() {
  /* VARIÁVEIS */
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const params = route.params as any;
  const user = params ? params.user : undefined;

  const [name, setName] = React.useState(user ? user.name : "");
  const [login, setLogin] = React.useState(user ? user.username : "");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const fields = [name, login, password, confirmPassword];

  /* TÍTULO DINÂMICO */
  React.useEffect(() => {
    if (user === undefined) {
      navigation.setOptions({ title: "New User" });
    } else {
      navigation.setOptions({ title: "Update User" });
    }
  }, []);

  /* CADASTRAR */
  const handleRegister = () => {
    let verifyFields = 0;

    fields.forEach((field) => {
      if (field.length <= 0) {
        verifyFields++;
      }
    });

    if (verifyFields === 0) {
      if (password !== confirmPassword) {
        Alert.alert("Senha e confirma senha devem ser iguais.");
        return false;
      } else {
        userService
          .create(name, login, password)
          .then((result) => Alert.alert("Usuário cadastrado com sucesso!"))
          .catch((error) => Alert.alert("Ocorreu um erro no cadastro."));

        navigation.goBack();
      }
    } else {
      Alert.alert("Todos os campos são obrigatórios.");
      return false;
    }
  };

  /* ATUALIZAR */
  const handleUpdate = () => {
    let verifyFields = 0;

    fields.forEach((field) => {
      if (field.length <= 0) {
        verifyFields++;
      }
    });

    if (verifyFields === 0) {
      if (password !== confirmPassword) {
        Alert.alert("Senha e confirma senha devem ser iguais.");
        return false;
      } else {
        userService
          .update(user.id, name, password)
          .then((result) => Alert.alert("Usuário atualizado com sucesso!"))
          .catch((error) => Alert.alert("Ocorreu um erro na atualização."));

        navigation.goBack();
      }
    } else {
      Alert.alert("Todos os campos são obrigatórios.");
      return false;
    }
  };

  /* COMPONENTE */
  return (
    <View style={styles.container}>
      <Input label="Name" value={name} onChangeText={setName} />

      <Input
        label="Login"
        value={login}
        onChangeText={setLogin}
        editable={user === undefined}
      />

      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Input
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <View style={styles.buttonView}>
        <Button
          title={user === undefined ? "Register" : "Update"}
          onPress={user === undefined ? handleRegister : handleUpdate}
        />
      </View>
    </View>
  );
}
