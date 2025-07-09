import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
  try {
    const { address } = params

    // TODO: Query NFT contracts
    const mockNFTs = [
      {
        id: "nft-1",
        name: "Golden Member",
        brand: "Starbucks",
        rarity: "Legendary",
        tokenId: "1",
        contractAddress: "0x6789012345678901234567890123456789012345",
      },
      {
        id: "nft-2",
        name: "VIP Pass",
        brand: "CGV Cinemas",
        rarity: "Rare",
        tokenId: "42",
        contractAddress: "0x7890123456789012345678901234567890123456",
      },
      {
        id: "nft-3",
        name: "Loyalty Badge",
        brand: "Grab",
        rarity: "Common",
        tokenId: "156",
        contractAddress: "0x8901234567890123456789012345678901234567",
      },
    ]

    return NextResponse.json(mockNFTs)
  } catch (error) {
    console.error("Error fetching NFTs:", error)
    return NextResponse.json({ error: "Failed to fetch NFTs" }, { status: 500 })
  }
}
