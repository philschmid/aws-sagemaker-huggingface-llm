import * as sagemaker from '@aws-cdk/aws-sagemaker-alpha';
import * as cdk from 'aws-cdk-lib';
import { CfnEndpointConfig } from 'aws-cdk-lib/aws-sagemaker';
import { Construct } from 'constructs';

export interface HuggingFaceLlmProps {
  readonly instanceType: string;
  readonly environmentVariables: { [key: string]: string };
  readonly name?: string;
  readonly s3ModelPath?: string;
  readonly tgiVersion?: string;
  readonly pytrochVersion?: string;
  readonly startUpHealthCheckTimeoutInSeconds?: number;
}


export class HuggingFaceLlm extends Construct {
  readonly endpoint: sagemaker.Endpoint;
  constructor(scope: Construct, id: string, props: HuggingFaceLlmProps) {
    super(scope, id);

    // Check if we deploy from S3 or from the Hugging Face Hub
    const isHuggingFaceHubModel = props.environmentVariables.HF_MODEL_ID !== undefined;
    if (isHuggingFaceHubModel && props.s3ModelPath !== undefined) {
      throw new Error('Cannot specify both HuggingFaceModelId and s3ModelPath');
    } else if (!isHuggingFaceHubModel && props.s3ModelPath === undefined) {
      throw new Error('Must specify either HuggingFaceModelId or s3ModelPath');
    }

    // create names
    const name = props.name ?? 'HuggingFaceLlm';
    const uniqueId = String(
      Date.now().toString(32) +
      Math.random().toString(16),
    ).replace(/\./g, '');
    const modelName = `${name}-model-${uniqueId}`;
    const endpointConfigName = `${name}-config-${uniqueId}`;
    const endpointName = `${name}-endpoint-${uniqueId}`;

    // get Hugging Face LLM container image
    const tgiVersion = props.tgiVersion ?? '0.9.3';
    const pytrochVersion = props.pytrochVersion ?? '2.0.1';
    const repositoryName = 'huggingface-pytorch-tgi-inference';
    const tag = `${pytrochVersion}-tgi${tgiVersion}-gpu-py39-cu118-ubuntu20.04`;
    const containerImage = sagemaker.ContainerImage.fromDlc(repositoryName, tag);


    // create SageMakerModel
    const containerDefintion: sagemaker.ContainerDefinition = {
      image: containerImage,
      environment: props.environmentVariables,
    };
    if (props.s3ModelPath !== undefined) {
      const modelData = sagemaker.ModelData.fromAsset(props.s3ModelPath);
      // @ts-ignore
      containerDefintion.modelData = modelData;
    }

    const sageMakerModel = new sagemaker.Model(this, 'HuggingFaceLlmModel', {
      modelName: modelName,
      containers: [containerDefintion],
    });


    // create SageMaker endpoint configuration
    const startUpHealthCheckTimeoutInSeconds = props.startUpHealthCheckTimeoutInSeconds ?? 600;

    const cfnEndpointConfig = new CfnEndpointConfig(this, 'EndpointConfig', {
      endpointConfigName: endpointConfigName,
      productionVariants:
        [
          {
            modelName: sageMakerModel.modelName,
            variantName: 'primary',
            initialVariantWeight: 1.0,
            initialInstanceCount: 1,
            instanceType: props.instanceType,
            containerStartupHealthCheckTimeoutInSeconds: startUpHealthCheckTimeoutInSeconds,
          },
        ],
    });
    const bridgeEndpointConfig = sagemaker.EndpointConfig.fromEndpointConfigName(this, 'BridgeEndpointConfig', endpointConfigName);
    bridgeEndpointConfig.node.addDependency(cfnEndpointConfig);
    // delpoy SageMaker endpoint
    this.endpoint = new sagemaker.Endpoint(this, 'HuggingFaceLlmEndpoint', { endpointName, endpointConfig: bridgeEndpointConfig });
    this.endpoint.node.addDependency(cfnEndpointConfig);
    this.endpoint.node.addDependency(bridgeEndpointConfig);

    new cdk.CfnOutput(this, 'EndpointName', { value: this.endpoint.endpointName });
  }
}