const fs = require('fs');
const path = require('path');
const glob = require('glob');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const translations = {};
const files = glob.sync('./src/**/*.{js,jsx,ts,tsx}', { absolute: true });

files.forEach(file => {
    const code = fs.readFileSync(file, 'utf8');
    const ast = parser.parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
    });

    let modified = false;
    let hasUseTranslationImport = false;
    let hasTDeclaration = false;

    traverse(ast, {
        ImportDeclaration(path) {
            if (path.node.source.value === 'react-i18next') {
                if (path.node.specifiers.some(spec => spec.imported && spec.imported.name === 'useTranslation')) {
                    hasUseTranslationImport = true;
                }
            }
        },
        FunctionDeclaration(path) {
            if (!hasTDeclaration && isComponentName(path.node.id.name)) {
                insertUseTranslation(path.node.body);
                hasTDeclaration = true;
                modified = true;
            }
        },
        VariableDeclaration(path) {
            const decl = path.node.declarations[0];
            if (
                t.isVariableDeclarator(decl) &&
                (t.isFunctionExpression(decl.init) || t.isArrowFunctionExpression(decl.init)) &&
                t.isIdentifier(decl.id) &&
                isComponentName(decl.id.name)
            ) {
                if (!hasTDeclaration) {
                    if (t.isBlockStatement(decl.init.body)) {
                        insertUseTranslation(decl.init.body);
                    } else {
                        // Arrow function tek satırsa block + return yap
                        decl.init.body = t.blockStatement([
                            createUseTranslationDeclaration(),
                            t.returnStatement(decl.init.body),
                        ]);
                        decl.init.expression = false;
                    }
                    hasTDeclaration = true;
                    modified = true;
                }
            }
        },
        JSXText(path) {
            const text = path.node.value.trim();
            if (text) {
                const key = text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
                translations[key] = text;

                const callExpr = t.jsxExpressionContainer(
                    t.callExpression(t.identifier('t'), [t.stringLiteral(key)])
                );

                path.replaceWith(callExpr);
                modified = true;
            }
        },
    });

    if (!hasUseTranslationImport) {
        ast.program.body.unshift(
            t.importDeclaration(
                [t.importSpecifier(t.identifier('useTranslation'), t.identifier('useTranslation'))],
                t.stringLiteral('react-i18next')
            )
        );
        modified = true;
    }

    if (modified) {
        const output = generate(ast, {}, code);
        fs.writeFileSync(file, output.code, 'utf8');
    }
});

const outputPath = path.resolve('./src/locales/en.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf8');

function insertUseTranslation(bodyNode) {
    if (t.isBlockStatement(bodyNode)) {
        bodyNode.body.unshift(createUseTranslationDeclaration());
    } else {
        console.warn('⚠️  Fonksiyonun body\'si BlockStatement deyil, atlandı.');
    }
}

function createUseTranslationDeclaration() {
    return t.variableDeclaration('const', [
        t.variableDeclarator(
            t.objectPattern([t.objectProperty(t.identifier('t'), t.identifier('t'), false, true)]),
            t.callExpression(t.identifier('useTranslation'), [])
        ),
    ]);
}

function isComponentName(name) {
    return /^[A-Z]/.test(name);
}
