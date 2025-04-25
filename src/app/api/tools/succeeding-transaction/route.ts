import { NextResponse } from 'next/server';
import type { MetaTransaction } from 'near-safe';
import { signRequestFor } from '@bitte-ai/agent-sdk';

export async function GET() {
  try {
    // Create EVM transaction object
    const transaction: MetaTransaction = {
      to: '0x0000000000000000000000000000000000000000',
      value: '1',
      data: '0x',
    };
    const signRequestTransaction = signRequestFor({
      chainId: 8453, // Base
      metaTransactions: [transaction],
    });

    return NextResponse.json(
      { evmSignRequest: signRequestTransaction },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error generating EVM transaction:', error);
    return NextResponse.json(
      { error: 'Failed to generate EVM transaction' },
      { status: 500 },
    );
  }
}
