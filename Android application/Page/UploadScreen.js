import {SafeAreaView} from 'react-native';

import {WebView} from 'react-native-webview';

const UploadScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{uri: 'https://www.dropbox.com/login'}}
        style={{marginTop: 20}}
      />
    </SafeAreaView>
  );
};
export default UploadScreen;
