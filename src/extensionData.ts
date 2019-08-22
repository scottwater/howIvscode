import * as vscode from "vscode";

interface IExtensionData {
  name: string;
  description: string;
  displayName: string;
  homepage: string;
  uuid: string;
  repositoryUrl?: string;
  version: string;
  publisherId: string;
  publisher: string;
  categories: string[];
}

const getExtensionData = async () => {
  return await vscode.extensions.all
    .filter(
      ext => !ext.packageJSON.isBuiltin && !ext.packageJSON.isUnderDevelopment
    )
    .map(ext => vsCodeExtensionToIExtensionData(ext));
};

const vsCodeExtensionToIExtensionData = (
  ext: vscode.Extension<any>
): IExtensionData => {
  const json = ext.packageJSON;
  return {
    publisherId: ext.id,
    publisher: json.publisher,
    name: json.name,
    displayName: json.displayName,
    description: json.description,
    uuid: json.uuid,
    version: json.version,
    repositoryUrl: json.repository && json.repository.url,
    homepage: json.homepage,
    categories: json.categories
  };
};

export default getExtensionData;
