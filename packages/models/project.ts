import { model, Schema } from "mongoose";
import { IProject } from "./types";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    uuid: {
      type: Number,
      required: true,
      unique: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    domains: [
      {
        ref: "Domain",
        type: Schema.Types.ObjectId,
      },
    ],
    environments: [
      {
        ref: "Env",
        type: Schema.Types.ObjectId,
      },
    ],
    team: {
      ref: "Team",
      type: Schema.Types.ObjectId,
    },
    pid: Number,
    port: Number,
    dir: String,
    buildCommand: String,
    outputDirectory: String,
    installCommand: String,
    repo: Object,
    rootDir: String,
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default model<IProject>("Project", projectSchema);
