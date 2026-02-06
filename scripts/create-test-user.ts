/**
 * Run: npx ts-node scripts/create-test-user.ts
 * Requires MONGODB_URI in .env
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  addressLine1: { type: String },
  city: { type: String },
  country: { type: String },
  image: { type: String },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

async function main() {
  const uri = process.env.MONGODB_URI || process.env.MONGODB_CONNECTION_STRING;
  if (!uri) {
    console.error("Set MONGODB_URI or MONGODB_CONNECTION_STRING in .env");
    process.exit(1);
  }
  await mongoose.connect(uri);
  const existing = await User.findOne({ email: "test@user.com" });
  if (existing) {
    console.log("Test user already exists:", existing.email);
    process.exit(0);
  }
  const user = new User({
    email: "test@user.com",
    password: "12345678",
    name: "Test User",
  });
  await user.save();
  console.log("Created test user: test@user.com / 12345678");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
