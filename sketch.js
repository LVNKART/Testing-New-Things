let bitcoinPrice = 0;
let prevBitcoinPrice = 0;
let bitcoinTrend = ""; // "up", "down", or ""

let upGif;
let downGif;
let priceDiv;

function preload() {
  upGif = createImg("https://s43ok7k2zh2opgw73nr7fxjjlosphohabwqvu2k63p74tvsz6d2a.arweave.net/lzblfVrJ9Oea39tj8t0pW6TzuOANoVppXtv_ydZZ8PQ?ext=gif"); // replace with your Arweave URLs
  downGif = createImg("https://46xpjpkx2ofyd53sgfhajrzgehdnythnd6hjoxfky4d5yqk5coja.arweave.net/5670vVfTi4H3cjFOBMcmIcbcTO0fjpdcqscH3EFdE5I?ext=gif");
}

function setup() {
  createCanvas(320, 427);
  upGif.hide(); // Hide the gifs initially
  downGif.hide();

  // Create a div for the price and style it
  priceDiv = createDiv();
  priceDiv.style('font-size', '20px');
  priceDiv.style('color', '#fff');
  priceDiv.style('background', '#000');
  priceDiv.style('text-align', 'center');
  priceDiv.style('width', '320px');
  priceDiv.style('margin', '0 auto');
  priceDiv.position(0, height - 50);

  fetchBitcoinPrice();
  setInterval(fetchBitcoinPrice, 3000); // Update the price every 10 seconds
}

function draw() {
  background(200, 150, 180);

  // Show the appropriate GIF
  if (bitcoinTrend === "up") {
    downGif.hide();
    upGif.show();
    upGif.position(0, 0);
  } else if (bitcoinTrend === "down") {
    upGif.hide();
    downGif.show();
    downGif.position(0, 0);
  }
}

async function fetchBitcoinPrice() {
  let url = "https://api.coinbase.com/v2/exchange-rates?currency=BTC";

  let response = await fetch(url);
  let data = await response.json();
  prevBitcoinPrice = bitcoinPrice;
  bitcoinPrice = parseFloat(data.data.rates.USD);

  // Determine the trend
  if (bitcoinPrice > prevBitcoinPrice) {
    bitcoinTrend = "up";
  } else if (bitcoinPrice < prevBitcoinPrice) {
    bitcoinTrend = "down";
  } else {
    bitcoinTrend = "";
  }

  // Update the price in the div
  priceDiv.html("Solana Price: $" + bitcoinPrice.toFixed(2));
}
