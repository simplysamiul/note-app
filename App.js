import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Create from './src/screens/Create';
import Edit from './src/screens/Edit';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';


//  app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfPmTPKYetct7qp8FUfbejCOiB_Ymmn90",
  authDomain: "note-app-4b356.firebaseapp.com",
  projectId: "note-app-4b356",
  storageBucket: "note-app-4b356.appspot.com",
  messagingSenderId: "950926251237",
  appId: "1:950926251237:web:a7bee5f1646b6e73d7f00c"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const appTheme = {
  ...DefaultTheme,
  colors : {
    ...DefaultTheme.colors,
    background: "#fff"
  }
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    const authSubcription = onAuthStateChanged(auth, (user) =>{
      if(user){
        setUser(true)
        setLoading(false)
      }else{
        setUser(null)
        setLoading(false)
      }

    })
    return authSubcription;
  },[]);
  if(loading){
    return (
      <View style={{flex: 1,justifyContent: "center", alignItems:"center"}}>
          <ActivityIndicator color="blue" size="large" />
      </View>
    )
  }
  return (
    <NavigationContainer theme={appTheme}>
        <Stack.Navigator>
          {
            user ? (
              <>
                <Stack.Screen 
                name="Home" 
                options={{headerShown: false}}
                >
                  {(props) => <Home {...props} user={user} />}
                </Stack.Screen>
                <Stack.Screen name="Create" component={Create} />
                <Stack.Screen name="Edit" component={Edit} />
              </>
            ) : (
              <>
              <Stack.Screen name="Signin" 
              component={SignIn} 
              options={{headerShown :  false}}
              />
              <Stack.Screen name="Signup" 
              component={SignUp}
              />
              </>
            )
          }
        </Stack.Navigator>
    </NavigationContainer>
  );
}
