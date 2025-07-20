import { PinataSDK } from "pinata";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";

// Load environment variables from .env file
dotenv.config();

async function main() {
  // Initialize Pinata SDK
  const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT_TOKEN,
  });

  // Read the file content
  const fileName = "animals.txt";
  const filePath = join(__dirname, `../files/txt/${fileName}`);
  const fileContent = readFileSync(filePath);
  
  // Create a proper File object with the content
  const file = new File([fileContent], fileName, { type: "text/plain" });

  // Upload the file to Pinata and vectorize it to later use for similarity search
  const response = await pinata.upload.public
    .file(file)
    .group(process.env.PINATA_GROUP_ID!)
    .vectorize();

  console.log(response);
}

main();