import { test, expect } from '@playwright/test';
import { REGISTER_SELECTORS} from '../selectors/register_selectors';
import defaultUserData from '../fixtures/defaultUserData.json';
import {format} from 'date-fns';

test('User Registration and Login', async ({ page }) => {
 
  const email_timestamp = format(new Date(), 'yyyyMMddHHmmss')
  const email = 'testEmail' + email_timestamp + '@example.com'

  await page.goto('https://www.automationexercise.com');

  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.click('text=Signup / Login');
  await expect(page.getByText(/New User Signup!/)).toBeVisible();

  await page.fill(REGISTER_SELECTORS.SIGNUP_NAME, 'testUserName');
  await page.fill(REGISTER_SELECTORS.SIGNUP_EMAIL, email);
  await page.click(REGISTER_SELECTORS.SIGNUP_BUTTON);

  await expect(page.getByText(/Enter Account Information/)).toBeVisible();
  
  await page.check(REGISTER_SELECTORS.GENDER1);
  await page.fill(REGISTER_SELECTORS.PASSWORD, defaultUserData.password);
  await page.click(REGISTER_SELECTORS.DAYS)
  await page.selectOption(REGISTER_SELECTORS.DAYS, String(defaultUserData.birthDay));
  await page.selectOption(REGISTER_SELECTORS.MONTHS, String(defaultUserData.birthMonth));
  await page.selectOption(REGISTER_SELECTORS.YEARS, String(defaultUserData.birthYear));

  await page.fill(REGISTER_SELECTORS.FIRST_NAME, defaultUserData.firstName);
  await page.fill(REGISTER_SELECTORS.LAST_NAME, defaultUserData.lastName);
  await page.fill(REGISTER_SELECTORS.COMPANY, defaultUserData.company);
  await page.fill(REGISTER_SELECTORS.ADDRESS1, defaultUserData.address1);
  await page.fill(REGISTER_SELECTORS.ADDRESS2, defaultUserData.address2);
  await page.selectOption(REGISTER_SELECTORS.COUNTRY, defaultUserData.country);
  await page.fill(REGISTER_SELECTORS.STATE, defaultUserData.state);
  await page.fill(REGISTER_SELECTORS.CITY, defaultUserData.city);
  await page.fill(REGISTER_SELECTORS.ZIPCODE, defaultUserData.zipcode);
  await page.fill(REGISTER_SELECTORS.MOBILE_NUMBER, defaultUserData.mobileNumber);

  await page.click(REGISTER_SELECTORS.CREATE_ACCOUNT_BUTTON);

  await expect(page.getByText(/Account Created!/)).toBeVisible();
  await page.click(REGISTER_SELECTORS.CONTINUE_BUTTON);

  await expect(page.getByText(`Logged in as ${defaultUserData.name}`)).toBeVisible();  
  await page.getByText(/Delete Account/).click();

  await expect(page.getByText(/Account Deleted!/)).toBeVisible();

  await expect(page.getByText(`Logged in as ${defaultUserData.name}`)).not.toBeVisible();  
});
