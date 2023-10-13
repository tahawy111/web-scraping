// Import puppeteer
import puppeteer, { Browser } from "puppeteer";

const url =
  "https://www.amazon.com/s?k=amazon+basics&page=7";

(async () => {
  // Launch the browser
  const browser: Browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto(url);

  const productsHandles = await page.$$(
    ".puis-card-container > .a-section.a-spacing-base"
  );
  let totalProducts: any[] = [];
  for (const productHandle of productsHandles) {
    const product = {
      title: await page.evaluate(
        (document) =>
          document.querySelector(".a-section h2 > a > span")?.textContent,
        productHandle
      ),
      price: await page.evaluate(
        (document) =>
          document.querySelector(".a-price > .a-offscreen")?.textContent,
        productHandle
      ),
      image: await page.evaluate(
        (document) =>
          document.querySelector(".s-image")?.getAttribute("src"),
        productHandle
      ),
    };

    totalProducts.push(product)
  }
  console.log(totalProducts);
  console.log(totalProducts.length);

  // Close browser.
  await browser.close();
})();
