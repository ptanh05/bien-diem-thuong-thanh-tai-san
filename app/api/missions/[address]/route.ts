import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
  try {
    const { address } = params
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    // TODO: Query mission smart contracts
    const mockMissions = [
      {
        id: "mission-1",
        title: "Mua 5 ly cà phê trong tuần",
        description: "Mua 5 ly cà phê bất kỳ tại Starbucks trong vòng 7 ngày để nhận thưởng",
        brand: "Starbucks",
        reward: {
          points: "500",
          nft: {
            name: "Coffee Master",
            rarity: "Common",
          },
        },
        progress: {
          current: 2,
          total: 5,
        },
        deadline: Date.now() + 5 * 24 * 60 * 60 * 1000, // 5 days
        status: "ongoing",
        requirements: ["Mua tối thiểu 5 ly cà phê", "Trong vòng 7 ngày", "Tại bất kỳ cửa hàng Starbucks nào"],
        contractAddress: "0x4567890123456789012345678901234567890123",
      },
      {
        id: "mission-2",
        title: "Đặt 10 chuyến xe Grab",
        description: "Hoàn thành 10 chuyến đi với Grab trong tháng này",
        brand: "Grab",
        reward: {
          points: "1000",
          nft: {
            name: "Frequent Rider",
            rarity: "Rare",
          },
        },
        progress: {
          current: 7,
          total: 10,
        },
        deadline: Date.now() + 15 * 24 * 60 * 60 * 1000, // 15 days
        status: "ongoing",
        requirements: ["Hoàn thành 10 chuyến đi", "Sử dụng dịch vụ GrabCar hoặc GrabBike", "Trong vòng 30 ngày"],
        contractAddress: "0x5678901234567890123456789012345678901234",
      },
      {
        id: "mission-3",
        title: "Xem 3 bộ phim tại rạp",
        description: "Xem 3 bộ phim bất kỳ tại CGV trong tháng để nhận NFT đặc biệt",
        brand: "CGV Cinemas",
        reward: {
          points: "750",
          nft: {
            name: "Movie Buff",
            rarity: "Epic",
          },
        },
        progress: {
          current: 3,
          total: 3,
        },
        status: "completed",
        requirements: ["Xem 3 bộ phim bất kỳ", "Tại rạp CGV", "Trong vòng 30 ngày"],
        contractAddress: "0x6789012345678901234567890123456789012345",
      },
      {
        id: "mission-4",
        title: "Mua sắm Black Friday",
        description: "Nhiệm vụ đặc biệt dành cho sự kiện Black Friday sắp tới",
        brand: "Shopee",
        reward: {
          points: "2000",
          nft: {
            name: "Black Friday Hunter",
            rarity: "Legendary",
          },
        },
        progress: {
          current: 0,
          total: 1,
        },
        deadline: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
        status: "upcoming",
        requirements: [
          "Mua sắm trong ngày Black Friday",
          "Đơn hàng tối thiểu 500,000 VND",
          "Sử dụng mã giảm giá từ Gom Gom",
        ],
        contractAddress: "0x7890123456789012345678901234567890123456",
      },
    ]

    let filteredMissions = mockMissions
    if (status && status !== "all") {
      filteredMissions = mockMissions.filter((m) => m.status === status)
    }

    return NextResponse.json(filteredMissions)
  } catch (error) {
    console.error("Error fetching missions:", error)
    return NextResponse.json({ error: "Failed to fetch missions" }, { status: 500 })
  }
}
