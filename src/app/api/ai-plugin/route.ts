import { ACCOUNT_ID, PLUGIN_URL } from '@/app/config';
import { NextResponse } from 'next/server';

export async function GET() {
  const pluginData = {
    openapi: '3.0.0',
    info: {
      title: 'Boilerplate',
      description: 'API for the boilerplate',
      version: '1.0.0',
    },
    servers: [
      {
        url: PLUGIN_URL,
      },
    ],
    'x-mb': {
      'account-id': ACCOUNT_ID,
      assistant: {
        name: 'Demo Agent',
        description:
          'Creates failing or succeeding transactions for testing purposes.',
        instructions: `
          You create failing or succeeding transactions for testing purposes.

          TRANSACTION CREATION PROCESS:
          1. When a user requests a transaction, first call either 'succeeding-transaction' or 'failing-transaction' based on user request.
          2. Wait for the response. If you don't receive a response or encounter an error, inform the user and retry once.
          3. After receiving the transaction data, carefully format parameters for the 'generate-evm-tx' tool call.

          IMPORTANT FORMAT INSTRUCTIONS:
          When calling 'generate-evm-tx', use exactly this format for your args:
          {
            "evmAddress": "0x0000000000000000000000000000000000000000",
            "method": "eth_sendTransaction",
            "chainId": 8453,
            "params": [{
              "from": "0x0000000000000000000000000000000000000000",
              "to": "0x0000000000000000000000000000000000000000",
              "value": "0x01",
              "data": "0x"
            }]
          }

          If you encounter any errors, try again one more time with the exact format shown above.
          DO NOT modify the structure of the params array - it must be an array containing transaction objects.
          Also DO NOT use the placeholder null addresses and other values in the formatting example, and use the actual values you got from the tool call result.
        `,
        tools: [{ type: 'generate-evm-tx' }, { type: 'sign-message' }],
      },
    },
    paths: {
      '/api/tools/succeeding-transaction': {
        get: {
          operationId: 'succeedingTransaction',
          summary: 'Create a succeeding EVM transaction',
          description:
            'Generate a succeeding EVM transaction payload to be used directly in the generate-evm-tx tool',
          parameters: [],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      evmSignRequest: {
                        type: 'object',
                        properties: {
                          method: {
                            type: 'string',
                            description: 'RPC method',
                          },
                          chainId: {
                            type: 'number',
                            description: 'Chain ID',
                          },
                          params: {
                            type: 'array',
                            description: 'Transaction parameters array',
                            items: {
                              type: 'object',
                              properties: {
                                to: {
                                  type: 'string',
                                  description: 'Receiver address',
                                },
                                value: {
                                  type: 'string',
                                  description: 'Transaction value',
                                },
                                data: {
                                  type: 'string',
                                  description: 'Transaction data',
                                },
                                from: {
                                  type: 'string',
                                  description: 'Sender address',
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Bad request',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        description: 'Error message',
                      },
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        description: 'Error message',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/tools/failing-transaction': {
        get: {
          operationId: 'failingTransaction',
          summary: 'Create a failing EVM transaction',
          description:
            'Generate a failing EVM transaction payload to be used directly in the generate-evm-tx tool',
          parameters: [],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      evmSignRequest: {
                        type: 'object',
                        properties: {
                          method: {
                            type: 'string',
                            description: 'RPC method',
                          },
                          chainId: {
                            type: 'number',
                            description: 'Chain ID',
                          },
                          params: {
                            type: 'array',
                            description: 'Transaction parameters array',
                            items: {
                              type: 'object',
                              properties: {
                                to: {
                                  type: 'string',
                                  description: 'Receiver address',
                                },
                                value: {
                                  type: 'string',
                                  description: 'Transaction value',
                                },
                                data: {
                                  type: 'string',
                                  description: 'Transaction data',
                                },
                                from: {
                                  type: 'string',
                                  description: 'Sender address',
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Bad request',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        description: 'Error message',
                      },
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        description: 'Error message',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return NextResponse.json(pluginData);
}
