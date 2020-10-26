const fs = require('fs')

const fileTypeRegex = /name(.+?).hbs/
const paths = {
    component: 'src/components/{{pascalCase name}}/{{pascalCase name}}',
    container: 'src/containers/{{pascalCase name}}/{{pascalCase name}}',
    page: 'src/pages/{{pascalCase name}}/{{pascalCase name}}',
    // reducer: 'src/reducers/{{dashCase name}}-reducer/{{dashCase name}}-reducer'
}

const getActionsFromTemplates = type => {
    const templateFiles = fs.readdirSync(`./plopTemplates/${type}/`)

    return templateFiles.map(fileName => {
        const ext = fileName.match(fileTypeRegex)[1]

        return {
            type: 'add',
            path: `${paths[type]}${ext}`,
            templateFile: `plopTemplates/${type}/${fileName}`
        }
    })
}
module.exports = (plop) => {
    plop.setGenerator('component', {
        description: 'Presentational/Dumb/Stateless component',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Please enter the component name'
        }],
        actions: () => {
            const actions = getActionsFromTemplates('component')
            actions.push({
                type: 'modify',
                path: './src/components/index.js',
                pattern: /$/,
                template: `\nexport {default as {{pascalCase name}} } from './{{pascalCase name}}/{{pascalCase name}}'`
            })
            return actions
        }
    })

    plop.setGenerator('container', {
        description: 'Smart/Stateful component',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Please enter the container name'
        }],
        actions: () => {
            const actions = getActionsFromTemplates('container')
            actions.push({
                type: 'modify',
                path: './src/containers/index.js',
                pattern: /$/,
                template: `\nexport {default as {{pascalCase name}} } from './{{pascalCase name}}/{{pascalCase name}}';`
            })
            return actions
        }
    })

    plop.setGenerator('page', {
        description: 'Page',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Please enter the page name'
        }, {
            type: 'input',
            name: 'link',
            message: 'Please enter the page link'
        }],
        actions: () => {
            const actions = getActionsFromTemplates('page')
            actions.push({
                type: 'modify',
                path: './src/pages/index.js',
                pattern: /$/,
                template: `\nexport {default as {{pascalCase name}} } from './{{pascalCase name}}/{{pascalCase name}}';`
            })
            actions.push({
                type: 'modify',
                path: './src/router/links/index.js',
                pattern: /'\n/,
                template: `',\n\t{{pascalCase name}}: '{{lowerCase link}}'\n`
            })
            return actions;
        }
    })
}