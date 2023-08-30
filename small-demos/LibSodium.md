# LibSodium

LibSodium is a cryptographic library, which we can access through Javascript wrappers via the
`npm` package `libsodium-wrappers`.

```
let sodium = require('libsodium-wrappers')
let h = sodium.crypto_generichash(64, sodium.from_string('test'))
sodium.to_base64(h)
'pxB51ChT3qJuRTAEM4ZwpTgUt4E3_77QdgOkHXakg6qbwztYL3fTCmXm8pqJbAQR84MS4dZuC_Fjhshqib6lcg'
```
