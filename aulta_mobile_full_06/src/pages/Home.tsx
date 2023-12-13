import React from "react";
import { Button, FlatList, Text, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { userService } from "./services/user_service";
import { User } from "./model/User";
import List from "./components/List";

export default function Home() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation<NavigationProp<any>>();

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Button title="Exit" onPress={logOff} />,
      headerRight: () => <Button title="Add" onPress={goToCreateUser} />,
    });

    fetchUserList();
  }, []);

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
        logOff();
      });
  };

  function logOff() {
    navigation.goBack();
  }

  function goToCreateUser() {
    navigation.navigate("User");
  }

  if (users.length < 1) {
    return (
      <View>
        <Text>Nenhum usuário cadastrado</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={users}
        onRefresh={fetchUserList}
        refreshing={refreshing}
        renderItem={({ item }) => <List user={item} />}
      />
    </View>
  );
}
