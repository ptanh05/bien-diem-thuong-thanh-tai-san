"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Star,
  Wallet,
  Zap,
  Shield,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFlashPointToken } from "@/hooks/useFlashPointToken";
import { JsonRpcProvider, Contract } from "ethers";
import abi from "@/lib/contracts/FlashPointToken.json" assert { type: "json" };

export default function Page() {
  const token = useFlashPointToken();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted || !token) return;
    const fetch = async () => {
      const supply = await token.totalSupply();
      console.log("Total Supply:", supply.toString());
    };
    fetch();
  }, [token, mounted]);

  if (!mounted) return null;
  return <div>Check console for total supply</div>;
}
