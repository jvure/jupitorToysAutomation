
import Page from './page';

class HomePage extends Page {

   
    public async openHomePage() {
        await browser.url('https://jupiter.cloud.planittesting.com/');
    }

   
}

export default new HomePage();