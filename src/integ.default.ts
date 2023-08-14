import * as cdk from 'aws-cdk-lib';
import { HuggingFaceLlm, HuggingFaceLlmProps } from './index';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'TestLLM', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});

const props: HuggingFaceLlmProps = {
  name: 'test',
  instanceType: 'ml.g5.2xlarge',
  environmentVariables: {
    HF_MODEL_ID: 'NousResearch/Llama-2-7b-chat-hf',
    SM_NUM_GPUS: '1',
    MAX_INPUT_LENGTH: '2048',
    MAX_TOTAL_TOKENS: '4096',
    MAX_BATCH_TOTAL_TOKENS: '8192',
  },
};

new HuggingFaceLlm(stack, 'LLM-Sample-Lib', props);