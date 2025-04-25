import { NextResponse } from 'next/server';
import type { MetaTransaction } from 'near-safe';
import { signRequestFor } from '@bitte-ai/agent-sdk';

export async function GET() {
  try {
    // Create EVM transaction object that will pass validation but fail execution
    const transaction: MetaTransaction = {
      to: '0x0000000000000000000000000000000000000000',
      value:
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      data: '0xabcdef12', // Invalid function selector
    };
    const signRequestTransaction = signRequestFor({
      chainId: 8453, // Base
      metaTransactions: [transaction],
    });

    return NextResponse.json(
      { evmSignRequest: signRequestTransaction },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      },
    );
  } catch (error) {
    console.error('Error generating EVM transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate EVM transaction' },
      { status: 500 },
    );
  }
}
