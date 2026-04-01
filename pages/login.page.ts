// pages/login.page.ts
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private username = 'input[name="username"]';
  private password = 'input[name="password"]';
  private loginBtn = 'input[value="Log In"]';
  public errorMsg = 'p.error';
  public loginSuccessIndicator = 'h1.title';

  public static readonly ERROR_INVALID_CREDENTIALS = 'The username and password could not be verified.';
  public static readonly ERROR_EMPTY_FIELDS = 'Please enter a username and password.';
  public static readonly MSG_SUCCESS = 'Accounts Overview';

  async login(user: string, pass: string) {
    await this.page.fill(this.username, user);
    await this.page.fill(this.password, pass);
    await this.page.click(this.loginBtn);
  }
}