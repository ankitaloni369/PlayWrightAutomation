class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInbutton = page.getByRole('button', { name: "login" });
        this.userName = page.getByRole('textbox', { name: "Email" });
        this.password = page.getByRole('textbox', { name: "enter your passsword" });

    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, passsword) {
        await this.userName.type(username);
        await this.password.fill(passsword);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { LoginPage };