// scripts/hash-password.js

import bcrypt from "bcryptjs";

console.log(
  "Owner:",
  await bcrypt.hash("IAMJUMOKETEGBE1290", 10)
);

console.log(
  "Staff:",
  await bcrypt.hash("Jumokegadiel100", 10)
);