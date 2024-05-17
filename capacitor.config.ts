import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.yoocoach',
  appName: 'YOO COACH',
  webDir: 'www',
  server: {
    androidScheme: 'http',
  },
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 1000,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
  },
  // plugins: {
  //   SplashScreen: {
      // launchShowDuration: 3000,
      // launchAutoHide: false,
      // backgroundColor: "#ffffffff",
      // androidSplashResourceName: "splash",
      // androidScaleType: "MATRIX",
      // showSpinner: false,
      // androidSpinnerStyle: "small",
      // iosSpinnerStyle: "small",
      // splashFullScreen: true,
      // splashImmersive: true,
      // spinnerColor: "#999999",x
      // layoutName: "launch_screen",
      // useDialog: true,
      // PrivacyScreen: {
      //   enable: true,
      // }
  //   },
  // },
};

export default config;
