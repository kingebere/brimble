import { User } from "@brimble/models";
import Pusher from "pusher";
import pusherJs from "pusher-js";

class PusherService {
  subscribeInit() {
    return new pusherJs(process.env.PUSHER_APP_KEY || "", {
      cluster: "eu",
    });
  }

  triggerInit() {
    return new Pusher({
      appId: process.env.PUSHER_APP_ID || "",
      key: process.env.PUSHER_APP_KEY || "",
      secret: process.env.PUSHER_APP_SECRET || "",
      cluster: process.env.PUSHER_APP_CLUSTER || "eu",
    });
  }

  githubEvent() {
    const channel = this.subscribeInit().subscribe("github");
    channel.bind("installation", async (data: any) => {
      const user = await User.findOne({
        "github.git_id": data.sender.id,
      });

      if (user) {
        await User.updateOne(
          { "github.git_id": data.sender.id },
          {
            $set: { "github.installation_id": data.installation.id },
          },
        ).exec();

        this.triggerInit().trigger(
          `${user?._id}`,
          "ADD_GITHUB_REPOS",
          data.repositories,
        );
      }
    });

    channel.bind("installation_repos", async (data: any) => {
      const user = await User.findOne({
        "github.git_id": data.sender.id,
      });
      if (user) {
        await User.updateOne(
          { "github.git_id": data.sender.id },
          {
            $set: { "github.installation_id": data.installation.id },
          },
        ).exec();

        this.triggerInit().trigger(
          `${user?._id}`,
          "ADD_GITHUB_REPOS",
          data.repositories_added,
        );
      }
    });
  }
}

export default new PusherService();