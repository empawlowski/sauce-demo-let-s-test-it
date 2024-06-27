import { authData } from '../../.env/.auth/auth.data';
import { expect, test } from '../../components/fixtures/base';
import * as report from '../../data/report/playwright.data.json';
import * as product from '../../data/tests/e2e/inventory-item.data.json';
import AxeBuilder from '@axe-core/playwright';

let user: string = authData.standard;
let password: string = authData.password;

test.skip('Main page - accessibility', { tag: [report.tags.accessibility] }, async ({ login, header, page }) => {
  // await allure.epic(report.epic.analysis);
  // await allure.feature(report.feature.tm);
  // await allure.tag(report.tag.dealer);

  // Arrange
  // Act
  await login.logIn(user, password);
  await header.expectLogo();

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  // const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  // const accessibilityScanResults = await new AxeBuilder({ page }).include('#navigation-menu-flyout').analyze();
  // const accessibilityScanResults = await new AxeBuilder({ page }).exclude('#element-with-known-issue').analyze();
  // const accessibilityScanResults = await new AxeBuilder({ page }).disableRules(['duplicate-id']).analyze();
  console.log(accessibilityScanResults);
  // Assert
  expect(accessibilityScanResults.violations).toEqual([]);
});

test.describe('Inventory', { tag: report.tags.regression }, () => {
  test.beforeEach('Login method', async ({ login, header }, testInfo) => {
    // await allure.epic(report.epic.analysis);
    // await allure.feature(report.feature.tm);
    // await allure.tag(report.tag.dealer);

    // Arrange
    console.log(`Running ${testInfo.title}`);
    // Act
    await login.logIn(user, password);
    // Assert
    await header.expectLogo();
  });

  test.afterEach('Close the page', async ({ base }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
    await base.resetApp();
    await base.logoutFromApp();
    await base.closePage();
  });

  test('Gunning fog index - article', async ({ inventory }) => {
    // await allure.owner(report.owner.mrp);
    // Arrange
    const title = product[0].title;
    // Act
    await inventory.clickOnProductTitleName(title);
    const describe = await inventory.desc.innerText();
    // const describe = "1's 2 3 4 5 6. 7, non-profit 9 10";
    console.log(describe.split(/\W+/).length); //words in sentence

    const wordsInDescribe = describe.split(/\s+/);

    function countSyllables(word) {
      word = word.toLowerCase();
      if (word.length <= 3) return 1;
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');
      const syllableCount = word.match(/[aeiouy]{1,2}/g);
      return syllableCount ? syllableCount.length : 0;
    }

    // Filter words with exactly three syllables
    const threeSyllableWords = wordsInDescribe.filter((word) => countSyllables(word) === 3);
    console.log('Three-syllable Words:', threeSyllableWords);
    console.log('Three-syllable Words Sume:', threeSyllableWords.length);

    const sentences = describe.match(/[^.!?]*[.!?]/g) || [];

    // Initialize a variable to hold the total number of words
    let totalWords = 0;

    // Iterate over each sentence
    sentences.forEach((sentence) => {
      // Split the sentence into words using a regular expression
      const words = sentence.trim().split(/\s+/);
      // Add the number of words in this sentence to the total
      totalWords += words.length;
    });

    // Calculate the average number of words per sentence
    const averageWordsPerSentence = totalWords / sentences.length;
    console.log('Average Words Per Sentence:', averageWordsPerSentence);

    // Assert
    const gunningFoxIndex = (averageWordsPerSentence + threeSyllableWords.length) * 0.4;
    console.log('Gunning Fox Index:', gunningFoxIndex);
    console.log('Gunning Fox Index:', Math.round(gunningFoxIndex));
    console.log('Gunning Fox Index:', gunningFoxIndex.toFixed(2));

    if (gunningFoxIndex >= 18) {
      console.log('Indeks zbyt duży');
    }

    if (gunningFoxIndex > 12 && gunningFoxIndex < 18) {
      console.log('Indeks dość wysoki, tekst jest dość trudny do zrozumienia');
    } else {
      // if (gunningFoxIndex < 12) {
      console.log('Indeks niski, tekst jest łatwy do zrozumienia');
    }
  });
});
