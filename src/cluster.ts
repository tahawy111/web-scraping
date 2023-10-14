import { Cluster } from "puppeteer-cluster";

const urls = [
  "https://www.amazon.com/b/?_encoding=UTF8&node=16225009011&pd_rd_w=rZUDr&content-id=amzn1.sym.5232c45b-5929-4ff0-8eae-5f67afd5c3dc&pf_rd_p=5232c45b-5929-4ff0-8eae-5f67afd5c3dc&pf_rd_r=MRTJMBX8RVET487XSY30&pd_rd_wg=ffnuP&pd_rd_r=cfca6986-6801-44c2-b182-eefdbd33afcc&ref_=pd_gw_unk",
  "https://www.amazon.com/s?k=Jeans&rh=n%3A1040660%2Cn%3A1048188%2Cp_36%3A-5000&dc&ds=v1%3AZrh2YeJ%2Bmo6tc5p1QJD9idnCpBDTF2pKNTUbGqlhFKk&_encoding=UTF8&content-id=amzn1.sym.b0c3902d-ae70-4b80-8f54-4d0a3246745a&crid=1TZCO6ZC2HZVA&pd_rd_r=cfca6986-6801-44c2-b182-eefdbd33afcc&pd_rd_w=o6Pn4&pd_rd_wg=ffnuP&pf_rd_p=b0c3902d-ae70-4b80-8f54-4d0a3246745a&pf_rd_r=MRTJMBX8RVET487XSY30&qid=1684823801&rnid=2941120011&sprefix=jeans%2Caps%2C155&ref=pd_gw_unk",
];

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 100,
    puppeteerOptions: {
      headless: false,
      defaultViewport: null,
    },
  });

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);
  });

  for(const url of urls){
    cluster.queue(url);

  }

  // cluster.queue("http://www.wikipedia.org/");
  // many more pages

  // await cluster.idle();
  // await cluster.close();
})();
