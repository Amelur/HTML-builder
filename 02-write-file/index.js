const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createWriteStream('./text.txt', {
  flags: 'a',
});

console.log('Enter your text:');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Exit!');
    fileStream.end(() => process.exit());
  }
  fileStream.write(`${input}\n`);
  rl.prompt();
});

process.on('SIGINT', () => {
  console.log('\nExit!');
  fileStream.end(() => process.exit());
});

rl.prompt();
