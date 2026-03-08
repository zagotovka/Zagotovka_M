const fs = require('fs');
const path = require('path');

const mainPath = 'main.js';
let code = fs.readFileSync(mainPath, 'utf8');

const tabsDir = 'Tabs';
const modalsDir = 'Modals';

if (!fs.existsSync(tabsDir)) fs.mkdirSync(tabsDir);
if (!fs.existsSync(modalsDir)) fs.mkdirSync(modalsDir);

const componentsToExtract = [
    'TabSelect', 'TabSwitch', 'TabButton', 'TabEncoder', 'TabCron', 'TabOneWire', 'TabSecurity', 'Settings',
    'ModalSwitch', 'ModalEncoder', 'ModalCron', 'ModalOneWire', 'ModalEditSensor', 'ModalSIM800L', 'ModalButton', 'ModalSecurity'
];

let extractedNames = [];
let importsToAdd = [];

for (const name of componentsToExtract) {
    let startIdx = code.indexOf(`function ${name}(`);
    if (startIdx === -1) startIdx = code.indexOf(`const ${name} =`);
    if (startIdx === -1) continue;

    console.log(`Found ${name}`);
    extractedNames.push(name);

    let parenCount = 0;
    let hasSeenParen = false;
    let i = startIdx;

    // 1. Find the end of the parameters list
    while (i < code.length) {
        if (code[i] === '(') {
            parenCount++;
            hasSeenParen = true;
        } else if (code[i] === ')') {
            parenCount--;
            if (hasSeenParen && parenCount === 0) {
                i++;
                break;
            }
        }
        i++;
    }

    // 2. Find the body open brace
    let openBraceIdx = code.indexOf('{', i);
    let braceCount = 1;
    i = openBraceIdx + 1;

    let inString = false;
    let stringChar = '';
    let inComment = false;
    let inTemplate = false;

    while (i < code.length && braceCount > 0) {
        let char = code[i];
        let nextChar = code[i + 1];

        if (!inComment && !inString && !inTemplate) {
            if (char === '/' && nextChar === '/') {
                inComment = true;
                i++;
            } else if (char === '/' && nextChar === '*') {
                inComment = 2;
                i++;
            } else if (char === '"' || char === "'") {
                inString = true;
                stringChar = char;
            } else if (char === '`') {
                inTemplate = true;
            } else if (char === '{') {
                braceCount++;
            } else if (char === '}') {
                braceCount--;
            }
        } else if (inComment === true && char === '\n') {
            inComment = false;
        } else if (inComment === 2 && char === '*' && nextChar === '/') {
            inComment = false;
            i++;
        } else if (inString && char === stringChar && code[i - 1] !== '\\') {
            inString = false;
        } else if (inTemplate && char === '`' && code[i - 1] !== '\\') {
            inTemplate = false;
        }

        i++;
    }

    if (braceCount === 0) {
        if (code.slice(startIdx, openBraceIdx).includes('const') && code[i] === ';') {
            i++;
        }

        let funcCode = code.slice(startIdx, i);
        let dir = name.startsWith('Modal') ? modalsDir : tabsDir;
        let filepath = path.join(dir, `${name}.js`);

        let fileContent = `import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';\n`;
        fileContent += `import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';\n`;
        fileContent += `import { MyPolzunok, Chart, DeveloperNote } from '../main.js';\n`;
        fileContent += `import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';\n`;
        fileContent += `import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';\n\n`;

        fileContent += funcCode + `\n\nexport { ${name} };\n`;

        fs.writeFileSync(filepath, fileContent, 'utf8');

        code = code.slice(0, startIdx) + `// -> Extracted ${name} to ${filepath}\n` + code.slice(i);
        importsToAdd.push(`import { ${name} } from './${dir}/${name}.js';\n`);
    }
}

if (!code.includes('export const MyPolzunok')) {
    code = code.replace('const MyPolzunok =', 'export const MyPolzunok =');
}
if (!code.includes('export function Chart')) {
    code = code.replace('function Chart(', 'export function Chart(');
}
if (!code.includes('export function DeveloperNote')) {
    code = code.replace('function DeveloperNote(', 'export function DeveloperNote(');
}

const importInsertionPoint = code.indexOf('const Logo =');
code = code.slice(0, importInsertionPoint) + importsToAdd.join('') + '\n' + code.slice(importInsertionPoint);

fs.writeFileSync(mainPath, code, 'utf8');
console.log('Done extracting:', extractedNames.join(', '));
