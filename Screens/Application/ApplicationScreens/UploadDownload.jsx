import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const UploadDownload = ({data}) => {
  const documents = data?.student?.document;
  const bottomSheetModalRef = useRef(null);
  const { height } = Dimensions.get('window');


  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const RenderItems = ({ item }) => (
    <View style={{ marginBottom: 10, padding:10 }}>
      <Text>{item?.path?.file_name}</Text>
      <Button title="View File" onPress={handlePresentModalPress} />
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1, height, padding:10 }}>{/* This makes the whole screen available */}
     <FlatList
        data={documents}
        renderItem={RenderItems}
        keyExtractor={(item) => item.id.toString()}
      />

    <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        />
      <BottomSheetModalProvider>
        
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
          snapPoints={['50%', '90%']} // This is fine for different sheet heights
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Center the content inside the BottomSheet
  },
});

export default UploadDownload;
