import chalk from 'chalk';
import ora from 'ora';
import {
  generateForPost,
  printResult,
  resolvePostPath,
} from './featured-images/generate.mjs';

const spinner = ora();

try {
  if (process.argv.length !== 3) {
    throw new Error(
      'Usage: npm run force-featured-image -- ./src/content/{writing|pages}/example.mdx',
    );
  }

  const filepath = resolvePostPath(process.argv[2]);
  spinner.start(`Generating featured image for ${process.argv[2]}`);
  const result = await generateForPost(filepath, { force: true });
  printResult(result, spinner);
} catch (error) {
  if (spinner.isSpinning) spinner.fail('Featured image generation failed');
  console.error(chalk.red(error.message));
  process.exitCode = 1;
}
