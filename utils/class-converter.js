const fs = require('fs');

const recordedScript = fs.readFileSync('./recordings/recorded-script.ts', 'utf-8');

const pattern = /await\s(page\.[^\n;]+(?:\.[^\n;]+)*)\.([a-zA-Z0-9]+)\(.*?\);/g;

const convertedScriptLines = [];
let match;
let objectCounter = 1;
while ((match = pattern.exec(recordedScript)) !== null) {
    const line = match[0];
    const objectName = match[1];
    const action = match[2];
    const variableName = `MY_OBJECT_${objectCounter}`;
    const convertedLine = `readonly ${variableName}: Locator;\n`;
    convertedScriptLines.push({ line, convertedLine, objectName, variableName });
    objectCounter++;
}

let convertedScript = `import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { BasePage } from '../src/core/commonActions';
import { Enviroment } from '../src/core/dataHandler';

let env: Enviroment = new Enviroment(process.env.ENV!);

export class myTemplate extends BasePage {\n`;

for (const { line, convertedLine, objectName, variableName } of convertedScriptLines) {
    convertedScript += `  ${convertedLine}`;
}

convertedScript += '\n';
convertedScript += '  constructor(page: Page, context: BrowserContext) {\n';
convertedScript += '    super(page, context);\n';

for (const { line, convertedLine, objectName, variableName } of convertedScriptLines) {
    convertedScript += `    this.${variableName} = ${objectName};\n`;
}

convertedScript += '  }\n';

convertedScript += '\n';
convertedScript += '  async exampleMethodA(): Promise<void> {\n';
convertedScript += '    await this.goto(env.baseURL);\n';
convertedScript += '  }\n';

convertedScript += '\n';
convertedScript += '  async exampleMethodB(): Promise<void> {\n';
convertedScript += '    await this.click(this.MY_OBJECT_1, 1000); // Wait time in ms for the next async method to start. Can re-use in other methods \n';
convertedScript += '  }\n';

convertedScript += '\n';
convertedScript += '  async exampleMethodC(): Promise<void> {\n';
convertedScript += '    await this.fill(this.MY_OBJECT_2, "This is a text");\n';
convertedScript += '  }\n';

convertedScript += '}';

fs.writeFileSync('./pageObjects/created-class.ts', convertedScript);