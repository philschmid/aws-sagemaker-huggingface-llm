# Hugging Face LLM CDK Construct Library

The Hugging Face LLM CDK Construct Library provides constructs to easily deploy a Hugging Face LLM model to Amazon SageMaker.

## Getting Started

1. install the library

```bash
npm install aws-sagemaker-huggingface-llm
```

2. Add construct

```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HuggingFaceLlm } from 'aws-sagemaker-huggingface-llm';

export class HuggingfaceCdkExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create new LLM SageMaker Endpoint
    new HuggingFaceLlm(this, 'Llama2Llm', {
      name: 'llama2-chat',
      instanceType: 'ml.g5.2xlarge',
      environmentVariables: {
        HF_MODEL_ID: 'NousResearch/Llama-2-7b-chat-hf',
        SM_NUM_GPUS: '1',
        MAX_INPUT_LENGTH: '2048',
        MAX_TOTAL_TOKENS: '4096',
        MAX_BATCH_TOTAL_TOKENS: '8192'
      }
    })
  }
}
```

## Local test

```bash
npm run build
```
then test with

```bash
cdk synth --app='npx ts-node --prefer-ts-exts src/integ.default.ts' --profile xxx
```

deploy

```bash
cdk deploy --app='npx ts-node --prefer-ts-exts src/integ.default.ts' --profile xxxx
```


## Acknowledgements

Big thank you to [hayao-k](https://dev.to/hayao_k) for his [blog post](https://dev.to/aws-builders/a-beginner-s-guide-to-create-aws-cdk-construct-library-with-projen-5eh4)



# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### HuggingFaceLlm <a name="HuggingFaceLlm" id="aws-sagemaker-huggingface-llm.HuggingFaceLlm"></a>

#### Initializers <a name="Initializers" id="aws-sagemaker-huggingface-llm.HuggingFaceLlm.Initializer"></a>

```typescript
import { HuggingFaceLlm } from 'aws-sagemaker-huggingface-llm'

new HuggingFaceLlm(scope: Construct, id: string, props: HuggingFaceLlmProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-sagemaker-huggingface-llm.HuggingFaceLlm.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#aws-sagemaker-huggingface-llm.HuggingFaceLlm.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-sagemaker-huggingface-llm.HuggingFaceLlm.Initializer.parameter.props">props</a></code> | <code><a href="#aws-sagemaker-huggingface-llm.HuggingFaceLlmProps">HuggingFaceLlmProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="aws-sagemaker-huggingface-llm.HuggingFaceLlm.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="aws-sagemaker-huggingface-llm.HuggingFaceLlm.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="aws-sagemaker-huggingface-llm.HuggingFaceLlm.Initializer.parameter.props"></a>

- *Type:* <a href="#aws-sagemaker-huggingface-llm.HuggingFaceLlmProps">HuggingFaceLlmProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-sagemaker-huggingface-llm.HuggingFaceLlm.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="aws-sagemaker-huggingface-llm.HuggingFaceLlm.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-sagemaker-huggingface-llm.HuggingFaceLlm.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="aws-sagemaker-huggingface-llm.HuggingFaceLlm.isConstruct"></a>

```typescript
import { HuggingFaceLlm } from 'aws-sagemaker-huggingface-llm'

HuggingFaceLlm.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="aws-sagemaker-huggingface-llm.HuggingFaceLlm.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-sagemaker-huggingface-llm.HuggingFaceLlm.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#aws-sagemaker-huggingface-llm.HuggingFaceLlm.property.endpoint">endpoint</a></code> | <code>@aws-cdk/aws-sagemaker-alpha.Endpoint</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="aws-sagemaker-huggingface-llm.HuggingFaceLlm.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `endpoint`<sup>Required</sup> <a name="endpoint" id="aws-sagemaker-huggingface-llm.HuggingFaceLlm.property.endpoint"></a>

```typescript
public readonly endpoint: Endpoint;
```

- *Type:* @aws-cdk/aws-sagemaker-alpha.Endpoint

---


## Structs <a name="Structs" id="Structs"></a>

### HuggingFaceLlmProps <a name="HuggingFaceLlmProps" id="aws-sagemaker-huggingface-llm.HuggingFaceLlmProps"></a>

#### Initializer <a name="Initializer" id="aws-sagemaker-huggingface-llm.HuggingFaceLlmProps.Initializer"></a>

```typescript
import { HuggingFaceLlmProps } from 'aws-sagemaker-huggingface-llm'

const huggingFaceLlmProps: HuggingFaceLlmProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-sagemaker-huggingface-llm.HuggingFaceLlmProps.property.environmentVariables">environmentVariables</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#aws-sagemaker-huggingface-llm.HuggingFaceLlmProps.property.instanceType">instanceType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-sagemaker-huggingface-llm.HuggingFaceLlmProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-sagemaker-huggingface-llm.HuggingFaceLlmProps.property.pytrochVersion">pytrochVersion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-sagemaker-huggingface-llm.HuggingFaceLlmProps.property.s3ModelPath">s3ModelPath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-sagemaker-huggingface-llm.HuggingFaceLlmProps.property.startUpHealthCheckTimeoutInSeconds">startUpHealthCheckTimeoutInSeconds</a></code> | <code>number</code> | *No description.* |
| <code><a href="#aws-sagemaker-huggingface-llm.HuggingFaceLlmProps.property.tgiVersion">tgiVersion</a></code> | <code>string</code> | *No description.* |

---

##### `environmentVariables`<sup>Required</sup> <a name="environmentVariables" id="aws-sagemaker-huggingface-llm.HuggingFaceLlmProps.property.environmentVariables"></a>

```typescript
public readonly environmentVariables: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `instanceType`<sup>Required</sup> <a name="instanceType" id="aws-sagemaker-huggingface-llm.HuggingFaceLlmProps.property.instanceType"></a>

```typescript
public readonly instanceType: string;
```

- *Type:* string

---

##### `name`<sup>Optional</sup> <a name="name" id="aws-sagemaker-huggingface-llm.HuggingFaceLlmProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `pytrochVersion`<sup>Optional</sup> <a name="pytrochVersion" id="aws-sagemaker-huggingface-llm.HuggingFaceLlmProps.property.pytrochVersion"></a>

```typescript
public readonly pytrochVersion: string;
```

- *Type:* string

---

##### `s3ModelPath`<sup>Optional</sup> <a name="s3ModelPath" id="aws-sagemaker-huggingface-llm.HuggingFaceLlmProps.property.s3ModelPath"></a>

```typescript
public readonly s3ModelPath: string;
```

- *Type:* string

---

##### `startUpHealthCheckTimeoutInSeconds`<sup>Optional</sup> <a name="startUpHealthCheckTimeoutInSeconds" id="aws-sagemaker-huggingface-llm.HuggingFaceLlmProps.property.startUpHealthCheckTimeoutInSeconds"></a>

```typescript
public readonly startUpHealthCheckTimeoutInSeconds: number;
```

- *Type:* number

---

##### `tgiVersion`<sup>Optional</sup> <a name="tgiVersion" id="aws-sagemaker-huggingface-llm.HuggingFaceLlmProps.property.tgiVersion"></a>

```typescript
public readonly tgiVersion: string;
```

- *Type:* string

---



