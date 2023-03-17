import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

// encrypt the message
// input encoding
// output encoding
export const encryptData = (message) => {

    const hashDigest = sha256(message);
    const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, "bugtech"));
        console.log(hmacDigest)
    return hmacDigest;
    
}
