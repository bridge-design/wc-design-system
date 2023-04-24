/* eslint-disable no-console */
import { green, yellow } from 'colorette';
import fs from 'fs';
import { ncp } from 'ncp';

const PREFIX = 'WC';

try {
  const args = process.argv;
  const newComponentName = args.pop();

  if (!newComponentName) {
    console.error('Please provide component name');
    process.exit(0);
  }

  console.log(`Creating component ${newComponentName}`);

  const newComponentNameCapitalized = newComponentName
    .split('-')
    .map((str) => str.substring(0, 1).toUpperCase() + str.substring(1))
    .join('');
  const newComponentNameCamelCase =
    newComponentNameCapitalized.substring(0, 1).toLowerCase() +
    newComponentNameCapitalized.substring(1);
  const className = `${PREFIX}${newComponentNameCapitalized}`;
  const elementName = `${PREFIX.toLowerCase()}-${newComponentName.toLowerCase()}`;
  const fileName = newComponentName.toLowerCase();
  const COMPONENTS_DIR = './src/components';
  const TEMPLATE_DIR = `${COMPONENTS_DIR}/.template`;

  const targetDir = `${COMPONENTS_DIR}/${newComponentName}`;

  ncp(TEMPLATE_DIR, targetDir, (err) => {
    if (err) {
      throw new Error(err);
    }

    fs.readdir(targetDir, (_, files) => {
      files.forEach((file) => {
        let fileContent = fs.readFileSync(`${targetDir}/${file}`, 'utf8');
        fileContent = fileContent.replace(
          /Template/g,
          newComponentNameCapitalized
        );
        fileContent = fileContent.replace(
          /template/g,
          newComponentNameCamelCase
        );
        fileContent = fileContent
          .replace(/element-name/g, elementName)
          .replace(/ClassName/g, className)
          .replace(/fileName/g, fileName);

        const newFileName = file.replace(/template/g, fileName);
        fs.writeFileSync(
          `${targetDir}/${newFileName}`,
          fileContent,
          'utf8'
        );
        if (file.includes('template')) {
          fs.rmSync(`${targetDir}/${file}`);
        }
      });
    });
  });

  console.log('Component has been created successfully!');
  console.warn(
    yellow(
      'WARNING. Do not forget to export the component in src/index.ts. Add the following line to this file:'
    )
  );
  console.log(green(`export * from './components/${newComponentName}';`));
} catch (error) {
  console.error('>>> ERROR:', error.message);
  process.exit(0);
}
