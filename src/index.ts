import * as path from 'path';
import * as sagemaker from '@aws-cdk/aws-sagemaker-alpha';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { regionMapping } from './utils';


export interface HuggingFaceLlmProps {
  readonly instanceType: string;
  readonly environmentVariables: { [key: string]: string };
  readonly name?: string;
  readonly HuggingFaceModelId?: string;
  readonly s3ModelPath?: string;
  readonly tgiVersion?: string;
  readonly pytrochVersion?: string;
}


export class HuggingFaceLlm extends Construct {
  readonly endpoint: sagemaker.Endpoint;
  constructor(scope: Construct, id: string, props: HuggingFaceLlmProps) {
    super(scope, id);

    // Check if we deploy from S3 or from the Hugging Face Hub
    const isHuggingFaceHubModel = props.HuggingFaceModelId !== undefined;
    if (isHuggingFaceHubModel && props.s3ModelPath !== undefined) {
      throw new Error('Cannot specify both HuggingFaceModelId and s3ModelPath');
    } else if (!isHuggingFaceHubModel && props.s3ModelPath === undefined) {
      throw new Error('Must specify either HuggingFaceModelId or s3ModelPath');
    }

    // create names
    const name = props.name ?? 'HuggingFaceLlm';
    const unqiueName = `${name}-${cdk.Names.uniqueId(this)}`;
    const modelName = `${unqiueName}-model`;
    const endpointConfigName = `${unqiueName}-config`;
    const endpointName = `${unqiueName}-endpoint`;

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
    if (props.s3ModelPath !== undefined && !isHuggingFaceHubModel) {
      const modelData = sagemaker.ModelData.fromAsset(props.s3ModelPath);
      // @ts-ignore
      containerDefintion.modelData = modelData;
    } else {
      throw new Error('Must specify either HuggingFaceModelId or s3ModelPath');
    }

    const sageMakerModel = new sagemaker.Model(this, 'HuggingFaceLlmModel', {
      modelName: modelName,
      containers: [containerDefintion],
    });


    // create SageMaker endpoint configuration
    const sagemakerEndpointConfig = new sagemaker.EndpointConfig(this, 'HuggingFaceLlmEndpointConfiguration', {
      endpointConfigName: endpointConfigName,
      instanceProductionVariants: [
        {
          model: sageMakerModel,
          variantName: 'primary',
          initialInstanceCount: 1,
          instanceType: new sagemaker.InstanceType(props.instanceType),
        },
      ],
    });
    // delpoy SageMaker endpoint
    this.endpoint = new sagemaker.Endpoint(this, 'HuggingFaceLlmEndpoint', { endpointName, endpointConfig: sagemakerEndpointConfig });

    new cdk.CfnOutput(this, 'EndpointName', { value: this.endpoint.endpointName });
  }
}