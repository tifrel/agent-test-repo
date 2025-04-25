import { NextResponse } from 'next/server';
import type { MetaTransaction } from 'near-safe';
import { signRequestFor } from '@bitte-ai/agent-sdk';

export async function GET() {
  try {
    // Create EVM transaction object that will pass validation but fail execution
    const transaction: MetaTransaction = {
      to: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT contract address
      value: '1',
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
