const fs = require('fs');
const HTMLtoJSX = require('htmltojsx');

const converter = new HTMLtoJSX({ createClass: false });

const pages = [
  { file: 'index.html', component: 'Page', route: 'src/app/page.tsx' },
  { file: 'test.html', component: 'TestPage', route: 'src/app/test/page.tsx' },
  { file: 'results.html', component: 'ResultsPage', route: 'src/app/results/page.tsx' },
  { file: 'paywall.html', component: 'PaywallPage', route: 'src/app/paywall/page.tsx' },
  { file: 'report.html', component: 'ReportPage', route: 'src/app/report/page.tsx' },
];

pages.forEach(({ file, component, route }) => {
  const content = fs.readFileSync(`old_html/${file}`, 'utf-8');
  
  // Extract content between <nav> or <main> or inside <body> but exclude the <script> tags and <style> tags
  // Actually, extracting everything inside <body ...> ... </body>
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) {
    console.error(`Could not find body in ${file}`);
    return;
  }
  
  let bodyContent = bodyMatch[1];
  
  // Convert HTML to JSX
  let jsxContent = converter.convert(bodyContent);
  
  // Replace class= with className= (htmltojsx usually handles this but just in case)
  jsxContent = jsxContent.replace(/class=/g, 'className=');
  jsxContent = jsxContent.replace(/for=/g, 'htmlFor=');
  jsxContent = jsxContent.replace(/stroke-width=/g, 'strokeWidth=');
  jsxContent = jsxContent.replace(/stroke-linecap=/g, 'strokeLinecap=');
  jsxContent = jsxContent.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
  
  // Remove empty comments {} which htmltojsx might leave
  jsxContent = jsxContent.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  
  // Create Next.js page
  const componentTemplate = `export default function ${component}() {
  return (
    <>
      ${jsxContent}
    </>
  );
}
`;

  // Create directory if it doesn't exist
  const dir = route.substring(0, route.lastIndexOf('/'));
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(route, componentTemplate);
  console.log(`Successfully migrated ${file} to ${route}`);
});
