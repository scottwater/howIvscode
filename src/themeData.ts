import * as vscode from "vscode";

interface IThemeData {
  theme: string | undefined;
  icon: string | undefined;
  fonts: string | undefined;
}

const themeData = async (): Promise<IThemeData> => {
  const config = vscode.workspace.getConfiguration();
  return {
    theme: config.get("workbench.colorTheme"),
    icon: config.get("workbench.iconTheme"),
    fonts: config.get("editor.fontFamily")
  };
};

export default themeData;
