import { flashlight } from './common';
var device = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo);

flashlight.isAvailable = function () {
  return !!device;
};
flashlight.on = function (arg) {
  try {
    this._checkAvailability();

    var intensity = AVCaptureMaxAvailableTorchLevel;
    if (arg && arg.intensity) {
      var requestedIntensity = arg.intensity;
      if (requestedIntensity > 0.0 && requestedIntensity < 1.0) {
        intensity = requestedIntensity;
      }
    }

    if (device.lockForConfiguration()) {
      device.setTorchModeOnWithLevelError(intensity);
      device.flashMode = AVCaptureFlashMode.On;
      device.unlockForConfiguration();
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

flashlight.off = function () {
  try {
    if (device.lockForConfiguration()) {
      device.torchMode = AVCaptureTorchMode.Off;
      device.flashMode = AVCaptureFlashMode.Off;
      device.unlockForConfiguration();
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { flashlight };
