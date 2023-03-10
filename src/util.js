import { env } from "../env";

function dimensions() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
};

function asset(filepath) {
    var root = document.location.origin; //env.getHost()
    if(env.storageDriver() == 's3'){
        return `https://demo-mohamed-s3-bucket-2022.s3.eu-south-1.amazonaws.com/solar-system/${filepath}`;
    }else{
        return `${root}/storage/${filepath}`;
    }
}

function image(filepath) {
    return asset(`images/${filepath}`);
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }
  
    if (/android/i.test(userAgent)) {
        return "Android";
    }
  
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
  
    return "unknown";
  }

  
export {
    dimensions,
    asset,
    image,
    getMobileOperatingSystem
}