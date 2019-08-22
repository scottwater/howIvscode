import * as vscode from "vscode";

const keyCaptureCommand = async () => {
  const currentKey = await userKey();
  const newKey = await vscode.window.showInputBox({
    placeHolder: "Please let your identification key.",
    value: currentKey
  });

  if (newKey) {
    saveKeyChange(newKey);
  }
};

const userKey = async (): Promise<string | undefined> => {
  return await vscode.workspace
    .getConfiguration()
    .get("howIVSCode.userIdentificationKey");
};

const saveKeyChange = async (key: string) => {
  await vscode.workspace
    .getConfiguration()
    .update(
      "howIVSCode.userIdentificationKey",
      key,
      vscode.ConfigurationTarget.Global
    );
};

export default keyCaptureCommand;
export { userKey };
