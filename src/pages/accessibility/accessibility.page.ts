import { Page } from '@playwright/test';

export class AccessibilityPage {
  constructor(private page: Page) {}

  async expectGunningFoxIndex(describe: string): Promise<void> {
    const words = describe.split(/\W+/);

    function countSyllables(word: string): number {
      word = word.toLowerCase();
      if (word.length <= 3) return 1;
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');
      const syllableCount = word.match(/[aeiouy]{1,2}/g);
      return syllableCount ? syllableCount.length : 0;
    }

    // Filter words with exactly three syllables
    const threeSyllableWords = words.filter((word) => countSyllables(word) === 3);
    const sentences = describe.match(/[^.!?]*[.!?]/g) || [];

    // Initialize a variable to hold the total number of words
    let totalWords = 0;

    sentences.forEach((sentence) => {
      const words = sentence.split(/\W+/);
      totalWords += words.length;
    });

    const averageWordsPerSentence = totalWords / sentences.length;

    const gunningFoxIndex = (averageWordsPerSentence + threeSyllableWords.length) * 0.4;
    console.log('Gunning Fox Index:', gunningFoxIndex);

    if (gunningFoxIndex >= 18) {
      console.log('The index is too big');
    }
    if (gunningFoxIndex >= 12 && gunningFoxIndex < 18) {
      console.log('The index is quite high, the text is quite difficult to understand');
    }
    if (gunningFoxIndex < 12) {
      console.log('The index is low, the text is easy to read and understand.');
    }
  }
}
