import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

const checkUser = async (currUid: string, username: string) => {
  const usersDB = await firestore().collection("users").get();
  const curruser = await firestore().collection("users").doc(currUid).get();

  if (!curruser.exists) {
    Alert.alert("Error", "Current user does not exist.");
    return false;
  }

  let isUserInDB: boolean = false;
  for (const doc of usersDB.docs) {
    const data = doc.data();
    if (data.username === username) {
      if (data.username === curruser.data()?.username) {
        Alert.alert("You can't add yourself");
        return false;
      } else {
        isUserInDB = true;
        console.log(`${username} is in the database`);
        break;
      }
    }
  }
  if (!isUserInDB) {
    Alert.alert("User not in database");
  }

  console.log("isUserInDB =", isUserInDB);
  return isUserInDB;
};
export default checkUser;
