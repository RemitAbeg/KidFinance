# 🌟 KidFi

**Empowering responsibility through Web3.**  
KidFi is a decentralized platform where parents create chores, children complete them, and both sides build trust, responsibility, and financial literacy — all powered by smart contracts.

---

## 🚀 Overview

KidFi reimagines how children earn and learn about money.

Instead of passive allowances, **children actively perform chores** and submit proof (like photos or videos).  
**Parents fund and approve rewards** using stablecoins or ERC20 tokens — and everything happens transparently on-chain.

It’s responsibility meets DeFi.  
Smart contracts handle escrow, payouts, and accountability — while the UI makes it all family-friendly.

---

## 💡 Core Features (MVP)

| Role | Capabilities |
|------|---------------|
| 👨‍👩‍👧 Parents | Create and fund chores using ERC20 tokens (e.g., USDC). |
| 🧒 Children | Accept chores, perform tasks, and submit proof (via IPFS). |
| ✅ Smart Contract | Holds funds in escrow until approval, then pays out automatically. |
| 🌐 Frontend | Simple Next.js app with wallet connect and role-based dashboards. |
| 🏆 Future (Post-MVP) | Community leaderboard, local collaborations, and “Star of the Week” rewards. |

---

## 🧠 Smart Contract: `ChoreManager.sol`

Located in `src/ChoreManager.sol`

### Key Functions
- `createChore(title, description, reward, token)` — Parent creates and funds a chore.
- `acceptChore(id)` — Child accepts a task.
- `submitProof(id, proofURI)` — Child submits proof (stored on IPFS or Web3.Storage).
- `approveChore(id)` — Parent approves and releases reward.
- `rejectChore(id)` — Parent rejects and funds are refunded.

### Tech Stack
- Solidity `^0.8.20`
- OpenZeppelin (SafeERC20, ReentrancyGuard, Counters)
- Foundry or Hardhat for local testing and deployment
- ERC20 tokens for rewards

---

## 🧩 Architecture Overview

```text
Parent UI  →  ChoreManager.sol  →  ERC20 Token
   ↑                ↓
Child UI  ←  Proof Upload (IPFS/Web3.Storage)
