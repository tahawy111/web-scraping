// Import puppeteer
import puppeteer, { Browser } from "puppeteer";

const urls = [
  "https://www.amazon.eg/s?k=iphone&crid=17MGTPY30SD08&sprefix=iphone%2Caps%2C180&ref=nb_sb_noss_1",
  "https://www.amazon.eg/s?k=mouse+pad&crid=3DMXC7CCTHSXK&sprefix=mouse+pad%2Caps%2C131&ref=nb_sb_noss_1",
];

(async () => {
  // Launch the browser
  const browser: Browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  for(const url of urls) {
    await page.goto(url, { waitUntil: "load" });

  let isBtnDisabled = false;

  while (!isBtnDisabled) {
    // const totalProducts: any[] = [];
    await page.waitForSelector(`.puis-card-container`);
    // const productsHandles = await page.$$(
    //   ".puis-card-container > .a-section.a-spacing-base"
    // );
    // for (const productHandle of productsHandles) {
    //   const product = {
    //     title: await page.evaluate(
    //       (document) =>
    //         document.querySelector(".a-section h2 > a > span")?.textContent,
    //       productHandle
    //     ),
    //     price: await page.evaluate(
    //       (document) =>
    //         document.querySelector(".a-price > .a-offscreen")?.textContent,
    //       productHandle
    //     ),
    //     image: await page.evaluate(
    //       (document) => document.querySelector(".s-image")?.getAttribute("src"),
    //       productHandle
    //     ),
    //   };

    //   totalProducts.push(product);
    // }

    const items = await page.evaluate(() => {
      const products = Array.from(
        document.querySelectorAll(
          ".puis-card-container > .a-section.a-spacing-base"
        )
      ).map((product) => {
        const p = {
          title: product.querySelector(".a-section h2 > a > span")?.textContent,
          price: product.querySelector(".a-price > .a-offscreen")?.textContent,
          image: product.querySelector(".s-image")?.getAttribute("src"),
        };
        return p;
      });

      return products
    });

    console.log(items);
    

    await page.waitForSelector(".s-pagination-item.s-pagination-next", {
      visible: true,
    });
    const isDisabled =
      (await page.$(
        ".s-pagination-item.s-pagination-next.s-pagination-disabled"
      )) !== null;

    isBtnDisabled = isDisabled;
    if (!isDisabled) {
      await Promise.all([
        page.click(".s-pagination-item.s-pagination-next"),
        page.waitForNavigation({ waitUntil: "networkidle2" }),
      ]);
    }
  }
  }

  // Close browser.
  await browser.close();
})();
