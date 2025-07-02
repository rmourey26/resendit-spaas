module.exports = (source) => {
  // Replace imports from '@mysten/sui.js/utils' with '@mysten/sui/utils'
  return source
    .replace(/from ['"]@mysten\/sui\.js\/utils['"]/g, "from '@mysten/sui/utils'")
    .replace(/fromB64/g, "fromBase64")
    .replace(/toB64/g, "toBase64")
}
