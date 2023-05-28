import test from '../src/core/testHandler';

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
        await profilePage.fillBirthdate('1990', '10', '25');
    });

});

test('@Regression Change personal text', async ({ profilePage }) => {
    await test.step('Fill the user personal text', async () => {
        await profilePage.PERSONAL_TEXT.fill('This is a personal text test');
    });

});

test('@Regression Change signature', async ({ profilePage }) => {
    await test.step('Fill the user signature', async () => {
        await profilePage.SIGNATURE.fill('This is a signature test');
    });
});

test('@Regression Change location', async ({ profilePage }) => {
    await test.step('Fill the user location', async () => {
        await profilePage.LOCATION.fill('Argentina');
    });
});

test.afterEach(async ({ profilePage }) => {

    await test.step('Click the save button', async () => {
        await profilePage.clikSaveProfileChanges();
    });

    await test.step('Verify the changed successfully message', async () => {
        await profilePage.verifySuccessMessage();
    });

    await test.step('Clean the profile data', async () => {
        await profilePage.cleanProfile();
    });

    await test.step('Close the browser', async () => {
        await profilePage.context.close();
    });
});

