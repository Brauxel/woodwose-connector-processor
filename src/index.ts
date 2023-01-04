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
  // const command = new InvokeCommand({
  //   FunctionName: process.env.GET_WORDPRESS_PRODUCTS_FUNCTION_NAME,
  //   // Payload: JSON.stringify(payload),
  //   LogType: LogType.Tail,
  // })

  // const { Payload, LogResult } = await client.send(command)
  // const result = Buffer.from(Payload).toString()
  // const logs = Buffer.from(LogResult, 'base64').toString()
  // const data2 = JSON.parse(result)
  // const data3 = JSON.parse(data2.body)
  // console.log('data2', data3.data[0])

  const payload2 = [
    {
      id: '50000',
      sku: 'OCWTSWH03--XXL',
      permalink:
        'https://woodwose.in/product/100-womens-organic-cotton-t-shirt/?attribute_pa_colors-womens-organic=womens-oc-white&attribute_pa_size=xxl',
      price: 69,
      quantity: 35,
      size: 'XXL',
    },
    {
      id: '60000',
      sku: 'OCWTSWH03--XL',
      permalink:
        'https://woodwose.in/product/100-womens-organic-cotton-t-shirt/?attribute_pa_colors-womens-organic=womens-oc-white&attribute_pa_size=xl',
      price: 3069,
      quantity: 40,
      size: 'XL',
    },
  ]

  const pp = {
    body: JSON.stringify(payload2),
    requestContext: {
      http: {
        method: 'POST',
      },
    },
  }

  const command2 = new InvokeCommand({
    FunctionName: process.env.WRITE_WORDPRESS_PRODUCT_VARIATION_FUNCTION_NAME,
    Payload: Buffer.from(JSON.stringify(pp), 'utf8'),
    InvocationType: 'RequestResponse',
    LogType: LogType.Tail,
  })

  console.log('hello2')

  const { Payload, LogResult } = await client.send(command2)
  const result = Buffer.from(Payload).toString()
  const logs = Buffer.from(LogResult, 'base64').toString()

  console.log('hello44', result)

  // const { Payload, LogResult } = await client.send(command2)
  // console.log('hello2', Payload)
  // const result = Buffer.from(Payload).toString()
  // const logs = Buffer.from(LogResult, 'base64').toString()
  // const data2 = JSON.parse(result)
  // const data3 = JSON.parse(data2.body)
  // console.log('data2', data3.data[0])
}

handler()
