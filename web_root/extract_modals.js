const fs = require('fs');
const path = require('path');

const mainJsPath = '/home/zerg/Desktop/ZagotovkaGUI/main.js';
let content = fs.readFileSync(mainJsPath, 'utf8');

function extractConstComponent(name) {
    const startStr = `const ${name} = ({`;
    const startIndex = content.indexOf(startStr);
    if (startIndex === -1) {
        console.log(`Could not find start of ${name}`);
        return null;
    }

    let searchIndex = startIndex + startStr.length;
    let braceCount = 1;
    let endIndex = -1;

    for (let i = searchIndex; i < content.length; i++) {
        if (content[i] === '{') braceCount++;
        else if (content[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
                // Now find the end of the statement or string
                const nextSemicolon = content.indexOf(';', i);
                endIndex = nextSemicolon !== -1 ? nextSemicolon + 1 : i + 1;
                break;
            }
        }
    }

    if (endIndex === -1) {
        console.log(`Could not find end of ${name}`);
        return null;
    }

    const componentContent = content.substring(startIndex, endIndex);

    // Remove from mainJs
    content = content.substring(0, startIndex) + content.substring(endIndex);

    // Write new file
    const newFilePath = path.join('/home/zerg/Desktop/ZagotovkaGUI/Modals', `${name}.js`);
    const imports = `import { h, useState, useEffect, html } from '../bundle.js';\nimport { MyPolzunok } from '../main.js';\nimport { ruLangswitch } from '../rulang.js';\nimport { enLangswitch } from '../enlang.js';\n\n`;
    const exportStatement = `\n\nexport { ${name} };\n`;

    fs.writeFileSync(newFilePath, imports + componentContent + exportStatement, 'utf8');
    console.log(`Extracted ${name}`);
    return true;
}

const resBtn = extractConstComponent('ModalButton');
const resSec = extractConstComponent('ModalSecurity');

if (resBtn || resSec) {
    fs.writeFileSync(mainJsPath, content, 'utf8');
    console.log('Saved main.js');
}
