describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:6006/iframe.html?args=&id=example-introduction--page&viewMode=story')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})