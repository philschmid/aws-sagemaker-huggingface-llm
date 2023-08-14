const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'philschmid',
  authorAddress: 'schmidphilipp1995@gmail.com',
  cdkVersion: '2.91.0',
  defaultReleaseBranch: 'main',
  name: 'aws-sagemaker-huggingface-llm',
  repositoryUrl: 'https://github.com/philschmid/aws-sagemaker-huggingface-llm.git',
  license: 'Apache-2.0',
  keywords: ['cdk', 'awscdk', 'aws-cdk', 'huggingface', 'llm', 'sagemaker'],
  peerDeps: ['@aws-cdk/aws-sagemaker-alpha'], /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
  publishToPypi: {
    distName: 'aws-sagemaker-huggingface-llm',
    module: 'aws_sagemaker_huggingface_llm',
  },
});
project.synth();