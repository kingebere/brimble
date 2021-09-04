import { Request, Response } from "express";
import { responseData } from "../helpers";

export class DeploymentController {
  public async getRepos(req: Request, res: Response) {
    const { q, limit = 10 } = req.query as any;

    const me = await req.body.ghclient.me();
    try {
      let data = await me.reposAsync({ page: 1, per_page: limit });
      if (q) {
        data = data[0]?.filter((repo: any) => {
          return q
            .toLowerCase()
            .split(" ")
            .every((v: string) => repo.name.toLowerCase().includes(v));
        });
      }

      if (data.length) {
        return res.json(responseData("OK", false, 200, data));
      }

      return res
        .status(404)
        .json(
          responseData(
            `Repository with this name "${q}" not found`,
            true,
            404,
            data
          )
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          responseData(
            `Couldn't make connection to GitHub at the moment.`,
            true,
            500
          )
        );
    }
  }

  public async selectRepo(req: Request, res: Response) {
    const repo = await req.body.ghclient.repo(req.body.repo);
    const data = await repo.contentsAsync("package.json", "main").catch(() => {
      return res.json(responseData("Something went wrong", true, 500, {}));
    });
    let content = data[0].content;
    const buff = Buffer.from(content, "base64");
    content = buff.toString("ascii");
    content = JSON.parse(content);
    return res.json(responseData("OK", false, 200, content));
  }
}