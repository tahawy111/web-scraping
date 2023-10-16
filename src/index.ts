// Import puppeteer
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: "new",args:[
    "--proxy-server=http://168.23.125.34:8080"
  ] });

  // Create a page
  const page = await browser.newPage();
  console.log("Running tests..");

  // Go to your site
  await page.goto("https://bot.sannysoft.com");
  await page.screenshot({ path: "testresult2.png", fullPage: true });
  await browser.close();
  console.log(`All done, check the screenshot. ✨`);

  // Close browser.
  await browser.close();
})();
