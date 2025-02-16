/* This script reads the help.txt file and generates a help.json file with the configuration options. */
const fs = require('fs');
const path = require('path');

const parseConfigOptions = (text) => {
  const lines = text.split('\n');
  return lines.map(line => {
    const match = line.match(/--([\w.]+)(?:\s(\w+))?\s+(.*?)(?:\s+\(default\s+"?([^"]+)"?\))?$/);
    if (match) {
      let [, key, type, description, defaultValue] = match;
      // if the type is not specified, it is a boolean
      if (!type) {
        type = 'boolean';
        // if the default value is not specified, it is false
        if (defaultValue !== 'false') {
          defaultValue = 'true';
        }
      }
      return { key: key.split('.'), type, defaultValue: defaultValue || undefined, description };
    }
    return null;
  }).filter(option => option !== null);
};

const filePath = path.resolve(__dirname, 'help.txt');
const outputFilePath = path.resolve(__dirname, 'help.json');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading help file:', err);
    return;
  }
  const configOptions = parseConfigOptions(data);
  fs.writeFile(outputFilePath, JSON.stringify(configOptions, null, 2), (err) => {
    if (err) {
      console.error('Error writing help file:', err);
    } else {
      console.log('Help file generated successfully.');
    }
  });
});
