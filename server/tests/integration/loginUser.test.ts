import mongoose from "mongoose";
import {
  User,
  IUser,
  registerUser,
  loginUser,
} from "../../src/models/userModel";
import { IPassword, Password } from "../../src/models/passwordsModel";

beforeAll(async () => {
  const dbName = `TrainTicketsTests_loginUser`;
  await mongoose.connect(`mongodb://localhost:27017/${dbName}`);
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("loginUser", () => {
  it("logins a user", async () => {
    const user = new User({
      name: "user1",
      email: "user@user.us",
    });
    const password = "password";

    await registerUser(user, password);
    const dbUser: IUser | null = await User.findOne({ name: "user1" });
    const dbPassword: IPassword | null = await Password.findOne({
      userId: dbUser?._id,
    });
    expect(dbUser).not.toBeNull();
    expect(dbPassword).not.toBeNull();

    const success: IUser | null = await loginUser(user.email, password);
    expect(success).not.toBeNull();
  });
});
