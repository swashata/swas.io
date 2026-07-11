import chalk from 'chalk';
import ora from 'ora';
import path from 'node:path';
import {
  findWritingFiles,
  generateForPost,
  printResult,
} from './featured-images/generate.mjs';

const spinner = ora();

try {
  spinner.start('Finding writing entries');
  const files = await findWritingFiles();
  spinner.succeed(`Found ${files.length} writing entries`);
  const counts = { generated: 0, skipped: 0, draft: 0, shortened: 0 };

  for (const filepath of files) {
    spinner.start(`Processing ${path.basename(filepath)}`);
    const result = await generateForPost(filepath);
    printResult(result, spinner);
    counts[result.status] += 1;
    if (result.title?.trimmed) counts.shortened += 1;
  }

  console.log(chalk.bold('\nFeatured images complete'));
  console.log(
    `${chalk.green(counts.generated)} generated · ${chalk.dim(counts.skipped)} existing · ${chalk.yellow(counts.draft)} drafts · ${chalk.yellow(counts.shortened)} shortened`,
  );
} catch (error) {
  if (spinner.isSpinning) spinner.fail('Featured image generation failed');
  console.error(chalk.red(error.message));
  process.exitCode = 1;
}
