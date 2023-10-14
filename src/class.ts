// Import puppeteer
import puppeteer, { Browser } from "puppeteer";

const url = "https://www.amazon.com/s?k=amazon+basics&page=7";

(async () => {
  // Launch the browser
  const browser: Browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto(url, { waitUntil: "load" });

  const isDisabled = (await page.$(".s-pagination-item.s-pagination-disabled")) !== null;

  console.log(isDisabled);
  

  // Close browser.
  await browser.close();
})();
