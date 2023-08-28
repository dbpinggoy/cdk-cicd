import * as cdk from 'aws-cdk-lib';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';


export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const source = CodePipelineSource.gitHub('dbpinggoy/cdk-cicd', 'main'); 

    new CodePipeline(this, 'Pipeline', {
      pipelineName: 'CicdPipeline',
      synth: new ShellStep('Synth', {
        input: source,
        installCommands: ['npm i -g npm@latest'],
        commands: ['npm ci', 'npx cdk synth']
      })
    });
  }
}
