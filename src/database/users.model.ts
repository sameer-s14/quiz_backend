import { Schema, model, CallbackError } from "mongoose";
import { USER_ROLES } from "../constants";
import { IUser } from "../interfaces";
import { bcryptService } from "../services";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "FirstName is Required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "LastName is Required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: 6,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: [USER_ROLES.ADMIN, USER_ROLES.USER],
      default: USER_ROLES.USER,
    },
  },
  { timestamps: true }
);

// Encrypt password using bcrypt
userSchema.pre<IUser>("save", function (next) {
  console.log(
    "🚀 ~ file: users.model.ts:53 ~ bcryptService.hashPassword ~ res:"
  );
  if (!this.isModified("password")) return next();
  bcryptService
    .hashPassword(this.password)
    .then((res) => {
      this.password = res;
      next();
    })
    .catch((error) => {
      return next(error as CallbackError);
    });
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

// Compare password using bcrypt
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  const isMatch: boolean = await bcryptService.comparePassword(
    enteredPassword,
    this.password
  );
  return isMatch;
};

export const userModel = model<IUser & Document>("users", userSchema);
