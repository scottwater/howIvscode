import * as vscode from "vscode";
import syncData from "./syncService";
import getExtensionData from "./extensionData";
import themeData from "./themeData";

const sendData = async () => {
  if (vscode.window.state.focused) {
    const data = await getData();
    syncData(data);
  }
};

const captureChanges = () => {
  vscode.extensions.onDidChange(sendData);
  vscode.workspace.onDidChangeConfiguration(event => {
    if (
      event.affectsConfiguration("howIVSCode") ||
      event.affectsConfiguration("workbench.colorTheme") ||
      event.affectsConfiguration("workbench.iconTheme") ||
      event.affectsConfiguration("editor.fontFamily")
    ) {
      sendData();
    }
  });
};

const getData = async () => {
  return {
    vsCodeVersion: vscode.version,
    theme: await themeData(),
    extensions: await getExtensionData()
  };
};

export { sendData, captureChanges };
