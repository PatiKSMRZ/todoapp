import React from 'react';
import AuthStackNavigator from './AuthStackNavigator';
import AppTabsNavigator from './AppTabsNavigator';

export default function RootNavigator() {
  // TODO: później podmienisz na Firebase auth state
  const [isSignedIn] = React.useState(true);

  return isSignedIn ? <AppTabsNavigator /> : <AuthStackNavigator />;
}