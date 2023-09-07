const fs = require("fs");
const wallet = require("ethereumjs-wallet").default;
//npm install ethereumjs-wallet
const account = wallet.fromPrivateKey(Buffer.from(process.argv[2], "hex"));
const password = process.argv[3]; // while importing this password is needed.

account.toV3(password, { kdf: "scrypt", n: 8192 }).then((value) => {
  const address = account.getAddress().toString("hex");
  const file = `UTC--${new Date()
    .toISOString()
    .replace(/[:]/g, "-")}--${address}.json`;
  fs.writeFileSync(file, JSON.stringify(value));
});
