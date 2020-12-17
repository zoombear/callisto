import {
  encrypt,
  decrypt
} from './encrypt'

describe('something', () => {
  it('should something', () => {
    expect(decrypt({
      "iv": "bf8bf9e7b116a6fe3f065994da0b3d0c",
      "encryptedData": "731f8ef58f62703fc9"
    })).toBe("hi@hi.com")
  })

  it('should something', () => {
    const string_encrypt = encrypt("testtesttest")
    expect(decrypt(string_encrypt)).toBe("testtesttest")
  })
})