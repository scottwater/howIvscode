import * as vscode from "vscode";
import keyCaptureCommand from "./userKey";
import { sendData, captureChanges } from "./dataChanges";

export function activate(context: vscode.ExtensionContext) {
  captureChanges();

  const setupCommand = vscode.commands.registerCommand(
    "extension.setupHowIVSCode",
    keyCaptureCommand
  );

  const syncExtensions = vscode.commands.registerCommand(
    "extension.syncDataToHowIVSCode",
    () => {
      sendData();
      vscode.window.showInformationMessage("Your data was send to HowIVSCode");
    }
  );

  context.subscriptions.push(setupCommand);
  context.subscriptions.push(syncExtensions);
}

// this method is called when your extension is deactivated
export function deactivate() {}
