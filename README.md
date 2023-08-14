# Hugging Face LLM CDK Construct Library

The Hugging Face LLM CDK Construct Library provides constructs to easily deploy a Hugging Face LLM model to Amazon SageMaker.

## Getting Started

1. install the library

```bash
npm install aws-sagemaker-huggingface-llm
```

2. Add construct

```typescript
import { HuggingFaceLlm, HuggingFaceLlmProps } from 'aws-sagemaker-huggingface-llm';

const props: HuggingFaceLlmProps = {
  name: 'test',
  instanceType: 'ml.g5.2xlarge',
  environmentVariables: {
    HF_MODEL_ID: 'NousResearch/Llama-2-7b-chat-hf',
    SM_NUM_GPUS: '1',
    MAX_INPUT_LENGTH: '2048',
    MAX_TOTAL_TOKENS: '4096',
  },
};

new HuggingFaceLlm(stack, 'LLM-Sample-Lib', props);
```

## Local test

```bash
npm run build
```
then test with

```bash
cdk synth --app='npx ts-node --prefer-ts-exts src/integ.default.ts ' --profile hf-sm > test.yaml
```

deploy

```bash
cdk deploy --app='npx ts-node --prefer-ts-exts src/integ.default.ts ' --profile hf-sm > test.yaml
```


## Acknowledgements

Big thank you to [hayao-k](https://dev.to/hayao_k) for his [blog post](https://dev.to/aws-builders/a-beginner-s-guide-to-create-aws-cdk-construct-library-with-projen-5eh4)


