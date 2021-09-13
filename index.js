const puppeteer = require('puppeteer');
const fs = require('fs');

const getInfos = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://storage.googleapis.com/infosimples-output/commercia/case/product.html');

   const list = await page.evaluate(() => {
     const title = document.querySelector('#product_title').textContent;

     const brand = document.querySelector('.brand').textContent;

     const nodeList = document.querySelectorAll('.current-category a');
     const itemList = [...nodeList];
     const categories = [];
     itemList.map(item => categories.push(item.innerText));

     const description = document.querySelector('.product-details p').textContent.replace(/\s+/g, ' ').trim();
     
     let skus = [];
     const skusName = document.querySelectorAll('.sku-name');
     const arrSkus = [...skusName];
     arrSkus.map((item) => skus.push({name: item.innerText}));

     const reviewsAverageScore = document.querySelector('#comments > h4').textContent;

     const url = document.querySelector('.copyright a').getAttribute('href');

     return resp = {
      title,
      brand,
      categories,
      description,
      skus,
      reviewsAverageScore,
      url
     }
   });


   const jsonResponse = JSON.stringify(list, null, 3);

   fs.writeFile('produto.json', jsonResponse, function (err) {
      if (err) {
         console.log(err);
      } else {
         console.log('Arquivo salvo com sucesso!');
      }
   });


  await browser.close();
};

getInfos();
