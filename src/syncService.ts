import * as https from "https";
import * as vscode from "vscode";
import { userKey } from "./userKey";

//Hat tip: https://hashnode.com/post/what-is-the-best-way-to-calculate-the-size-of-a-json-object-in-nodejs-cinklya0f00670d53c0puzb2u
const bytes = (s: string) => {
  return ~-encodeURI(s).split(/%..|./).length;
};
const jsonSize = (s: string) => {
  return bytes(s);
};

const apiUrl = () => {
  const url: string | undefined = vscode.workspace
    .getConfiguration()
    .get("howIVSCode.apiUrl");
  return url || "howivscode.com";
};

const syncData = async (data: any) => {
  const key = await userKey();
  const url = apiUrl();
  if (!key || !url) {
    console.log("HEY YOU NEED A KEY! OR URL");
  } else {
    post(data, key, url);
  }
};

const post = async (data: any, key: string, url: string) => {
  const jsonData = JSON.stringify(data);
  const options = {
    hostname: url,
    port: 443,
    path: "/sync",
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Content-Length": jsonSize(jsonData),
      Authorization: key
    }
  };

  const req = https.request(options, res => {
    let responseData = "";

    res.on("data", d => {
      responseData += d;
    });

    res.on("end", () => {
      const obj = JSON.parse(responseData);
      if (!obj.success) {
        vscode.window.showWarningMessage(
          "HowIVSCode Sync Message had an unexpected result"
        );
      }
    });
  });

  req.on("error", error => {
    vscode.window.showErrorMessage(
      `Failed to Sync with HowIVScode: ${error.message}`
    );
  });

  req.write(jsonData);
  req.end();
};

export default syncData;
