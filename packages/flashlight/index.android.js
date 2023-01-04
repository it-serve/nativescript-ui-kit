import { device } from '@nativescript/core/platform';
import { Application } from '@nativescript/core';
var flashlight = require('./common');
var camera;
// Used when device has camera2 API
var appContext;
var cameraManager;
// Used when device lacks camera2 API
var parameters;

flashlight.isAvailable = function () {
  try {
    var packageManager = com.tns.NativeScriptApplication.getInstance().getPackageManager();
    return packageManager.hasSystemFeature(android.content.pm.PackageManager.FEATURE_CAMERA_FLASH);
  } catch (error) {
    console.log(error);
    return false;
  }
};

flashlight.hasCamera2API = function () {
  return device._sdkVersion > 20;
};

flashlight.on = function () {
  //this._checkAvailability();
  try {
    if (flashlight.hasCamera2API()) {
      if (!camera) {
        appContext = Application.getNativeApplication().getApplicationContext();
        cameraManager = appContext.getSystemService(android.content.Context.CAMERA_SERVICE);
        camera = cameraManager.getCameraIdList()[0];
      }
      cameraManager.setTorchMode(camera, true);
    } else {
      if (camera === undefined) {
        camera = android.hardware.Camera.open(0);
        parameters = camera.getParameters();
      }
      parameters.setFlashMode(android.hardware.Camera.Parameters.FLASH_MODE_TORCH);
      camera.setParameters(parameters);
      camera.startPreview();
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

flashlight.off = function () {
  try {
    if (flashlight.hasCamera2API()) {
      cameraManager.setTorchMode(camera, false);
    } else {
      parameters.setFlashMode(camera.Parameters.FLASH_MODE_OFF);
      camera.setParameters(parameters);
      camera.stopPreview();
      camera.release();
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { flashlight };
