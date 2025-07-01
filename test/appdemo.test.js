import { expect } from 'chai';

describe('Appium DEMO App', () => {

  afterEach(async () => {
    await browser.execute('mobile: terminateApp', { appId: 'io.appium.android.apis' });

    await browser.pause(1000);

    await browser.execute('mobile: activateApp', { appId: 'io.appium.android.apis' });
  });

  it('Klik elemen', async () => {
    const elemenKlik = await $(`//android.widget.TextView[@content-desc="Accessibility"]`);
    await elemenKlik.click();
  });
  
  it('Input ke elemen', async () => {
    // menu: App > Alert Dialogs > Text Entry dialog
    const appMenu = await $(`//android.widget.TextView[@content-desc="App"]`)
    const alertdialogMenu = await $(`//android.widget.TextView[@content-desc="Alert Dialogs"]`)
    const textentryMenu = await $(`//android.widget.Button[@content-desc="Text Entry dialog"]`)
    await appMenu.click();
    await alertdialogMenu.click();
    await textentryMenu.click();
    
    // mulai input elemen
    const nameField = await $(`//android.widget.EditText[@resource-id="io.appium.android.apis:id/username_edit"]`)
    const passField = await $(`//android.widget.EditText[@resource-id="io.appium.android.apis:id/password_edit"]`)
    await nameField.setValue('administrator');
    await passField.setValue('password123');
  });
  
  it('Memastikan App bisa terbuka dan elemen tersedia', async () => {
    const accessibilityMenu = await $(`//android.widget.TextView[@content-desc="Accessibility"]`);

    await accessibilityMenu.waitForDisplayed({ timeout: 10000 });
    const isVisible = await accessibilityMenu.isDisplayed();
    expect(isVisible).to.be.true;
  });

  it('Scroll elemen hard-coded', async () => {
    // menu: Views > Gallery > 1. Photos
    const viewsMenu = await $(`//android.widget.TextView[@content-desc="Views"]`);
    const galleryMenu = await $(`//android.widget.TextView[@content-desc="Gallery"]`);
    const photosMenu = await $(`//android.widget.TextView[@content-desc="1. Photos"]`);
    await viewsMenu.click();
    await galleryMenu.click();
    await photosMenu.click();

    // cek elemen Gallery terlihat
    const galleryWidget = await $(`//android.widget.Gallery[@resource-id="io.appium.android.apis:id/gallery"]`);
    await galleryWidget.waitForDisplayed({ timeout: 10000 });
    const isGalleryVisible = await galleryWidget.isDisplayed();
    expect(isGalleryVisible).to.be.true;

    const location = await galleryWidget.getLocation();
    const size = await galleryWidget.getSize();
    const y = location.y + size.height / 2;
    const startX = location.x + size.width - 10;
    const endX = location.x + 10;

    await browser.performActions([{
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: startX, y },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 100 },
        { type: 'pointerMove', duration: 300, x: endX, y },
        { type: 'pointerUp', button: 0 }
      ]
    }]);
    
    await browser.releaseActions();

  });


});
