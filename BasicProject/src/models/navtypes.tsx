export type RootStackParamList = {
    Home: { refresh: boolean }; // Home screen with a refresh parameter
    Login:undefined;
    Signup:undefined;   
    };
    // types.ts
export type RootStackParamLists = {
    Home: undefined;
    Search: undefined;
    AddPost: undefined;
    Profile: undefined;
    Add: { screen: string };  // Adjust to accept screen parameter

  };
  