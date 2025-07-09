"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Wallet, CheckCircle, Copy, LogOut, ChevronDown, ExternalLink, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [copied, setCopied] = useState(false)
  const [availableWallets, setAvailableWallets] = useState<any[]>([])
  const [unavailableWallets, setUnavailableWallets] = useState<any[]>([])

  useEffect(() => {
    const checkWalletAvailability = () => {
      const available: any[] = []
      const unavailable: any[] = []

      connectors.forEach((connector) => {
        // Check if wallet is installed based on connector type and window objects
        let isInstalled = false

        switch (connector.name.toLowerCase()) {
          case "metamask":
            isInstalled = typeof window !== "undefined" && (window as any).ethereum?.isMetaMask === true
            break
          case "coinbase wallet":
            isInstalled =
              typeof window !== "undefined" &&
              ((window as any).ethereum?.isCoinbaseWallet === true ||
                (window as any).coinbaseWalletExtension !== undefined)
            break
          case "walletconnect":
            // WalletConnect is always available as it's a protocol
            isInstalled = true
            break
          case "injected":
            // Check for any injected wallet
            isInstalled = typeof window !== "undefined" && (window as any).ethereum !== undefined
            break
          default:
            // For other connectors, check if they're ready
            isInstalled = connector.ready || false
            break
        }

        if (isInstalled) {
          available.push(connector)
        } else {
          unavailable.push(connector)
        }
      })

      setAvailableWallets(available)
      setUnavailableWallets(unavailable)
    }

    // Check immediately and also when window loads
    checkWalletAvailability()

    if (typeof window !== "undefined") {
      window.addEventListener("load", checkWalletAvailability)
      return () => window.removeEventListener("load", checkWalletAvailability)
    }
  }, [connectors])

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const getConnectorIcon = (connectorName: string) => {
    switch (connectorName.toLowerCase()) {
      case "metamask":
        return "🦊"
      case "coinbase wallet":
        return "🔵"
      case "walletconnect":
        return "🔗"
      case "injected":
        return "💼"
      default:
        return "💼"
    }
  }

  const getInstallLink = (connectorName: string) => {
    switch (connectorName.toLowerCase()) {
      case "metamask":
        return "https://metamask.io/download/"
      case "coinbase wallet":
        return "https://www.coinbase.com/wallet"
      default:
        return "#"
    }
  }

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {formatAddress(address)}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-black/90 border-white/20">
          <DropdownMenuItem onClick={copyAddress} className="text-white hover:bg-white/10 cursor-pointer">
            {copied ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Đã sao chép!" : "Sao chép địa chỉ"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => disconnect()} className="text-red-400 hover:bg-red-500/10 cursor-pointer">
            <LogOut className="w-4 h-4 mr-2" />
            Ngắt kết nối
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={isPending}
          className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
          variant="outline"
        >
          <Wallet className="w-4 h-4 mr-2" />
          {isPending ? "Đang kết nối..." : "Kết nối ví"}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-black/90 border-white/20">
        {availableWallets.length > 0 && (
          <>
            <div className="px-2 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wider">Ví có sẵn</div>
            {availableWallets.map((connector) => (
              <DropdownMenuItem
                key={connector.uid}
                onClick={() => connect({ connector })}
                disabled={isPending}
                className="text-white hover:bg-white/10 cursor-pointer"
              >
                <span className="mr-2">{getConnectorIcon(connector.name)}</span>
                <div className="flex-1">
                  <div>Kết nối {connector.name}</div>
                  <div className="text-xs text-green-400">✓ Đã cài đặt</div>
                </div>
              </DropdownMenuItem>
            ))}
          </>
        )}

        {unavailableWallets.length > 0 && (
          <>
            {availableWallets.length > 0 && <DropdownMenuSeparator className="bg-white/10" />}
            <div className="px-2 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wider">
              Ví chưa cài đặt
            </div>
            {unavailableWallets.map((connector) => (
              <DropdownMenuItem
                key={connector.uid}
                onClick={() => window.open(getInstallLink(connector.name), "_blank")}
                className="text-gray-400 hover:bg-white/5 cursor-pointer"
              >
                <span className="mr-2">{getConnectorIcon(connector.name)}</span>
                <div className="flex-1">
                  <div className="flex items-center">
                    {connector.name}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </div>
                  <div className="text-xs text-orange-400 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Cần cài đặt
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </>
        )}

        {availableWallets.length === 0 && unavailableWallets.length === 0 && (
          <div className="px-4 py-3 text-center text-gray-400">
            <AlertCircle className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm">Không tìm thấy ví nào</div>
            <div className="text-xs">Vui lòng cài đặt ví Web3</div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
