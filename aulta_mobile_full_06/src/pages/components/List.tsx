import React from "react";
import { User } from "../model/User";
import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { userService } from "../services/user_service";

type Props = {
  user: User;
};

export default function List({ user }: Props) {
  const navigation = useNavigation<NavigationProp<any>>();
  const [users, setUsers] = React.useState<User[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  // const [teste, setTeste] = React.useState()

  function goToEditUser(user: User) {
    navigation.navigate("User", { user });
  }

  const removeUser = (id: number | undefined) => {
    userService
      .delete(id)
      .then((result) => {
        Alert.alert("Usuário removido!");
        navigation.navigate("Home");
      })
      .catch((error) => {
        Alert.alert("Erro ao apagar o usuário");
      });

    fetchUserList();
  };

  const fetchUserList = () => {
    setRefreshing(true);

    userService
      .list()
      .then((result) => {
        setUsers(result);
        setRefreshing(false);
      })
      .catch((error) => {
        setRefreshing(false);
      });
  };

  React.useEffect(() => {

  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.subtitle}>{user.username}</Text>
      <Button title="Edit" onPress={() => goToEditUser(user)} />
      <Button title="Remove" onPress={() => removeUser(user.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("screen").width - 40,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
  },
});
