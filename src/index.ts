import { InvokeCommand, LambdaClient, LogType } from '@aws-sdk/client-lambda'
import { createClientForDefaultRegion } from './libs/sdkClient'
import { logger } from './utils/logger/buildLogger'
import { hydrateEnv } from './utils/secrets/hydrateEnv'

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err)
  process.exit(1)
})

export const handler = async () => {
  logger.info('test logger2')
  console.log('handler fired')
  await hydrateEnv()
  const client = createClientForDefaultRegion(LambdaClient)
  const command = new InvokeCommand({
    FunctionName: process.env.GET_WORDPRESS_PRODUCTS_FUNCTION_NAME,
    // Payload: JSON.stringify(payload),
    LogType: LogType.Tail,
  })

  const { Payload, LogResult } = await client.send(command)
  const result = Buffer.from(Payload).toString()
  const logs = Buffer.from(LogResult, 'base64').toString()
  const data2 = JSON.parse(result)
  const data3 = JSON.parse(data2.body)
  console.log('data2', data3.data[0])
}

handler()
