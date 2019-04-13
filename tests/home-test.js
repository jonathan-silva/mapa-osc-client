require('chromedriver');
var webdriver = require('selenium-webdriver');
const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
urlBase = 'http://localhost:8080/index.html';

// let o = new chrome.Options();
// o.addArguments('disable-infobars');
// o.setUserPreferences({ credential_enable_service: false });

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();
driver.manage().window().maximize();

function main(name, tests) {
  describe(name, function () {
    tests();
  });
}

main('MapaOsc', async () => {
  it("Pegando o título da página", async () => {
    driver.get(urlBase);
  });
});

main('Starting ... ', function () {
  it("Pegando o título da página", async () => {
    await driver.wait(webdriver.until.titleIs('Portal OSCs'), 30 * 1000);
  });
});

main('Pesquisa Municipio', function () {
  it('Pesquisa Rio de Janeiro', async () => {
    await driver.get(urlBase);
    await driver.sleep(2000);
    await driver.findElement(webdriver.By.id('localidade')).click();
    await driver.findElement(webdriver.By.id('localidade')).sendKeys('Rio de Janeiro - RJ');
    await driver.sleep(3000);
    await driver.findElement(webdriver.By.id('localidade')).sendKeys(webdriver.Key.ARROW_DOWN);
    await driver.findElement(webdriver.By.id('localidade')).sendKeys(webdriver.Key.ENTER);
    await driver.sleep(3000);
    await driver.findElement(webdriver.By.xpath("//a[@id='btn-localidade-modal']")).click();
  });

  // it('Pesquisa Goiás', async () => {
  //   await driver.get(urlBase);
  //   await driver.sleep(2000);
  //   await driver.findElement(webdriver.By.id('localidade')).click();
  //   await driver.findElement(webdriver.By.id('localidade')).sendKeys('Goiás - GO');
  //   await driver.sleep(3000);
  //   await driver.findElement(webdriver.By.id('localidade')).sendKeys(webdriver.Key.ARROW_DOWN);
  //   await driver.findElement(webdriver.By.id('localidade')).sendKeys(webdriver.Key.ENTER);
  //   await driver.sleep(3000);
  //   await driver.findElement(webdriver.By.xpath("//a[@id='btn-localidade-modal']")).click();
  // });
  after(async () => driver.quit());
});
