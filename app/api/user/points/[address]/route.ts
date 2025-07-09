import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
  try {
    const { address } = params

    // TODO: Query smart contracts for actual point balances
    const mockPointBalances = [
      {
        brand: "Starbucks",
        symbol: "STAR",
        balance: "1250",
        value: "125,000 VND",
        contractAddress: "0x1234567890123456789012345678901234567890",
        decimals: 18,
      },
      {
        brand: "Circle K",
        symbol: "CK",
        balance: "850",
        value: "85,000 VND",
        contractAddress: "0x2345678901234567890123456789012345678901",
        decimals: 18,
      },
      {
        brand: "Grab",
        symbol: "GRAB",
        balance: "2100",
        value: "210,000 VND",
        contractAddress: "0x3456789012345678901234567890123456789012",
        decimals: 18,
      },
    ]

    return NextResponse.json(mockPointBalances)
  } catch (error) {
    console.error("Error fetching point balances:", error)
    return NextResponse.json({ error: "Failed to fetch point balances" }, { status: 500 })
  }
}
