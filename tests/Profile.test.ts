import test from '../src/core/testHandler';
import logger from '../src/core/logger';  // Import logger

// We can use steps like this to reproduce Cucumber formatting
test.beforeEach(async ({ loginPage, profilePage }) => {
    await test.step(`Navigate to the forum and login with valid credentials`, async () => {
        await loginPage.navigateToUrlAndLogin();
    });

    await test.step(`Open the profile menu`, async () => {
        await profilePage.clickProfileDropdownMenu();
    });

    await test.step('Click the profile details button', async () => {
        await profilePage.clickProfileDetailsButton();
    });
});

test('@Regression Change birthdate', async ({ profilePage }) => {
    await test.step('Fill the user birthdate', async () => {
        let birthdate = { year: '1990', month: '10', day: '25' };
        await profilePage.fillBirthdate(birthdate.year, birthdate.month, birthdate.day);
        // Log
        logger.info(`User birthdate filled with: Year - ${birthdate.year}, Month - ${birthdate.month}, Day - ${birthdate.day}`);
    });
});

test('@Regression Change personal text', async ({ profilePage }) => {
    await test.step('Fill the user personal text', async () => {
        let personalText = 'This is a personal text test';
        await profilePage.PERSONAL_TEXT.fill(personalText);
        // Log
        logger.info(`User personal text filled with: ${personalText}`);
    });

});

test('@Regression Change signature', async ({ profilePage }) => {
    await test.step('Fill the user signature', async () => {
        let signature = 'This is a signature test';
        await profilePage.SIGNATURE.fill(signature);
        // Log
        logger.info(`User signature filled with: ${signature}`);
    });
});

test('@Regression Change location', async ({ profilePage }) => {
    await test.step('Fill the user location', async () => {
        let location = 'Argentina';
        await profilePage.LOCATION.fill(location);
        // Log
        logger.info(`User location filled with: ${location}`);
    });
});

test.afterEach(async ({ profilePage }) => {

    await test.step('Click the save button', async () => {
        await profilePage.clickSaveProfileChanges();
    });

    await test.step('Verify the changed successfully message', async () => {
        await profilePage.verifySuccessMessage();
    });

    await test.step('Clean the profile data', async () => {
        await profilePage.cleanProfile();
    });

    await test.step('Close the browser', async () => {
        await profilePage.closeContext();
    });
});
