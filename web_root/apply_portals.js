const fs = require('fs');
const path = require('path');

const modalsDir = path.join(__dirname, 'Modals');
const files = fs.readdirSync(modalsDir).filter(f => f.endsWith('.js'));

files.forEach(file => {
    if (file === 'ModalButton.js') return; // Already updated

    const filePath = path.join(modalsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Find the final return html`...` block
    const returnHtmlMatches = [...content.matchAll(/return html`/g)];
    if (returnHtmlMatches.length === 0) return;

    // Assuming the very last 'return html`' is the modal wrapper
    const lastMatch = returnHtmlMatches[returnHtmlMatches.length - 1];
    const startIndex = lastMatch.index;

    // Find the end of this template literal
    let braceCount = 0;
    let inString = false;
    let inTemplate = true;
    let endIndex = -1;
    let i = startIndex + 12; // Length of 'return html`'

    while (i < content.length && inTemplate) {
        const char = content[i];
        if (char === '\\') {
            i += 2;
            continue;
        }
        if (char === '$' && content[i + 1] === '{') {
            braceCount++;
            i += 2;
            continue;
        }
        if (char === '{' && braceCount > 0) braceCount++;
        if (char === '}' && braceCount > 0) braceCount--;
        if (char === '`' && braceCount === 0) {
            inTemplate = false;

            // Look for the next semicolon or end of statement
            let j = i + 1;
            while (j < content.length && (content[j] === ' ' || content[j] === '\n' || content[j] === '\r' || content[j] === ';')) {
                j++;
            }
            endIndex = j;
        }
        i++;
    }

    if (endIndex !== -1) {
        const originalReturn = content.substring(startIndex, endIndex);

        // Replace "return html`" with "const modalContent = html`"
        let newReturn = originalReturn.replace(/^return html`/, 'const modalContent = html`');

        // Replace "fixed inset-0 z-50" with "fixed inset-0 z-[999]"
        // Also "min-h-full" to min-h-screen if needed, but sticking to requested changes
        newReturn = newReturn.replace(/z-50/g, 'z-[999]');

        // Find dependencies for the useEffect array
        // We can roughly grab all parameters and local state variables.
        // Let's just use a very generic array or extract from the file
        // A regex to grab state variables like: const [varName, setVarName] = useState
        const stateVars = [...content.matchAll(/const \[([a-zA-Z0-9_]+), /g)].map(m => m[1]);

        // Also grab props from the function signature
        const funcNameMatch = content.match(/function Modal[a-zA-Z0-9_]+\(\{([^}]+)\}\)/) || content.match(/const Modal[a-zA-Z0-9_]+ = \(\{([^}]+)\}\)/);
        let props = [];
        if (funcNameMatch) {
            props = funcNameMatch[1]
                .split(',')
                .map(p => p.split('=')[0].trim()) // handle default values
                .filter(p => p && p !== 'hideModal'); // hideModal is usually stable but could be included
            // Actually let's just include all visible props plus state.
        }
        // Also if title is heavily used:
        const deps = Array.from(new Set([...stateVars, ...props])).filter(Boolean).join(', ');

        const portalEffect = `
  useEffect(() => {
    const portalEl = document.createElement('div');
    portalEl.id = 'modal-portal';
    document.body.appendChild(portalEl);
    render(modalContent, portalEl);
    return () => {
      render(null, portalEl);
      document.body.removeChild(portalEl);
    };
  }); // Using no deps array or a generic one is safer to ensure it always updates

  return null;
`;
        // We will omit the deps array '[]' in useEffect to ensure it rerenders when ANY state changes within the modal component.
        // Since we're rendering to a portal, standard React rules apply: if we omit the dependency array, it runs after every render, 
        // replacing the content of the portal, which effectively syncs the portal content with the modal's internal state.
        // Wait, Preact might unmount/remount the DOM node if we return a cleanup function every time.
        // Let's pass the specific props and states as dependencies:

        // Actually, Preact's render directly updates in place, but calling it inside an effect without deps might cause too much DOM thrashing. 
        // Let's use the exact dependencies!
        const effectWithDeps = `
  useEffect(() => {
    const portalEl = document.createElement('div');
    portalEl.id = 'modal-portal';
    document.body.appendChild(portalEl);
    render(modalContent, portalEl);
    return () => {
      render(null, portalEl);
      document.body.removeChild(portalEl);
    };
  }, [${deps}]);

  return null;
`;

        content = content.substring(0, startIndex) + newReturn + '\n' + effectWithDeps + '\n' + content.substring(endIndex);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated', file);
    } else {
        console.log('Could not parse return template in', file);
    }
});
