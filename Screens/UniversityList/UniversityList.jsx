import { View, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import LoagingScreen from '../../components/LoagingScreen';

const UniversityList = () => {
  const LoadingIndicatorView = () => {
    return (
      <View>
        <LoagingScreen/>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://docs.google.com/gview?embedded=true&url=https://dev.shabujglobal.org/build/assets/university-list-CcYys4IS.pdf' }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={LoadingIndicatorView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  }
});

export default UniversityList;
