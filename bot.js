const puppeteer = require('puppeteer');
var browser;



(async () => {
    // Initialize New Browser
    browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage();
    await page.goto('https://igracias.telkomuniversity.ac.id/#', {
        waitUntil: ['networkidle2', 'domcontentloaded']
    });

    // Insert username
    const username = await page.$('#textUsername')
    await username.type("YOUR IGRACIAS USERNAME")

    // password
    const pass = await page.$('#textPassword')
    await pass.type('YOUR IGRACIAS PASSWORD')

    // Login Button Click
    await pass.press('Enter')
    page.on('dialog', async dialog => {
        console.log('here');
        await dialog.accept();
    });
    await page.waitForNavigation()
    await page.click('a[href="index.php?pageid=2001"]')

    // buka page quisioner
    await page.waitFor(5000)
    await page.click('a[href="?pageid=2001&QID=3067"]')

    //quisioner 1
    for (i = 0; i < 5; i++) {
        await page.waitFor(5000)
        var data = await page.evaluate(() => {
            $('td ul').each(function (i, elem) {
                $(elem).find('li:nth-child(1) input').attr('checked', 'checked')
            })
            $('td textarea').each(function (i, elem) {
                $(elem).val('sangat bagus')
            })
            return;
        })
        await page.click('input[name="button"]')
    }
    // kembali ke beranda
    await page.waitFor(5000)
    await page.click('a[href="index.php?pageid=1661"]')
})();