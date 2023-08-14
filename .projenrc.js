const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'philschmid',
  authorAddress: 'schmidphilipp1995@gmail.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'aws-sagemaker-huggingface-llm',
  repositoryUrl: 'https://github.com/schmidphilipp1995/aws-sagemaker-huggingface-llm.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();