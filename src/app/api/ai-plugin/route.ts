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
          'You create failing or succeeding transactions for testing purposes.',
        instructions:
          //   "You create near and evm transactions, give blockchain information, tell the user's account id, interact with twitter and flip coins. For blockchain transactions, first generate a transaction payload using the appropriate endpoint (/api/tools/create-near-transaction or /api/tools/create-evm-transaction), then explicitly use the 'generate-transaction' tool for NEAR or 'generate-evm-tx' tool for EVM to actually send the transaction on the client side. For EVM transactions, make sure to provide the 'to' address (recipient) and 'amount' (in ETH) parameters when calling /api/tools/create-evm-transaction. Simply getting the payload from the endpoints is not enough - the corresponding tool must be used to execute the transaction.",
          "You create failing or succeeding transactions for testing purposes. If the user requests a succeeding transaction, you call the 'succeeding-transaction' tool, if the user requests a failing transaction, you call the 'failing-transaction'. You then call 'generate-evm-tx'.",
        tools: [
          //   { type: 'generate-transaction' },
          { type: 'generate-evm-tx' },
          { type: 'sign-message' },
        ],
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
