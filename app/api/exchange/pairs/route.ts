import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // TODO: Query DEX contracts for available pairs
    const mockPairs = [
      {
        fromToken: "STAR",
        toToken: "USDT",
        rate: 0.1,
        liquidity: "50000",
        fee: "0.3%",
      },
      {
        fromToken: "GRAB",
        toToken: "USDT",
        rate: 0.08,
        liquidity: "75000",
        fee: "0.3%",
      },
      {
        fromToken: "CK",
        toToken: "USDC",
        rate: 0.09,
        liquidity: "30000",
        fee: "0.3%",
      },
    ]

    return NextResponse.json(mockPairs)
  } catch (error) {
    console.error("Error fetching exchange pairs:", error)
    return NextResponse.json({ error: "Failed to fetch exchange pairs" }, { status: 500 })
  }
}
