const fs = require('fs');
const path = require('path');

const outputDir = path.join(process.cwd(), '.next', 'static');
const htmlFiles = [];

function findHtmlFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findHtmlFiles(filePath);
    } else if (file.endsWith('.html')) {
      htmlFiles.push(filePath);
    }
  });
}

if (fs.existsSync(outputDir)) {
  findHtmlFiles(outputDir);
  
  htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    if (!content.includes('dashboard-console-capture.js')) {
      content = content.replace(
        '</head>',
        '  <script src="/dashboard-console-capture.js"></script>\n</head>'
      );
      fs.writeFileSync(file, content);
      console.log(`Injected console capture into: ${file}`);
    }
  });
}