const fs = require('fs');
const path = require('path');

const tabsDir = 'Tabs';
const modalsDir = 'Modals';

const tabFiles = fs.readdirSync(tabsDir).filter(f => f.endsWith('.js'));
const modalFiles = fs.readdirSync(modalsDir).filter(f => f.endsWith('.js'));

const tabNames = tabFiles.map(f => path.basename(f, '.js'));
const modalNames = modalFiles.map(f => path.basename(f, '.js'));

const allComponentNames = [...tabNames, ...modalNames];

function fixImports(dir, files) {
    for (const file of files) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let newImports = [];

        for (const name of allComponentNames) {
            if (name === path.basename(file, '.js')) continue;

            // basic check if component is used in file
            // like <${ModalSwitch}
            // or ModalSwitch(
            if (content.includes('${' + name + '}') || content.includes(name + '(') || content.includes('${' + name + ' ')) {
                // If it's not already imported
                if (!content.includes('import { ' + name + ' }')) {
                    const fromDir = tabNames.includes(name) ? '../Tabs' : '../Modals';
                    newImports.push(`import { ${name} } from '${fromDir}/${name}.js';`);
                }
            }
        }

        if (newImports.length > 0) {
            content = newImports.join('\n') + '\n' + content;
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Fixed imports in ' + file + ':', newImports);
        }
    }
}

fixImports(tabsDir, tabFiles);
fixImports(modalsDir, modalFiles);
console.log('Done checking and fixing imports.');
