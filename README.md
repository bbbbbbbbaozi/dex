# Web3 个人资产看板 & 聚合交易面板

![Tech Stack: Next.js + Wagmi + Foundry](https://img.shields.io/badge/Tech_Stack-Next.js_|_Wagmi_|_Foundry-blue)
![Architecture: Monorepo](https://img.shields.io/badge/Architecture-pnpm_Monorepo-orange)
![License: MIT](https://img.shields.io/badge/License-MIT-green)

> 一个具备生产环境标准、高度关注UI/UX与RPC性能优化的多链Web3资产看板与去中心化DEX应用。

## 架构设计与技术栈

项目采用Monorepo架构，结合`pnpm workspaces`, 实现了前后端与智能合约代码的统一管理，彻底打通了从Solidity到TypeScript的**端到端类型安全**

### 前端应用（`app/web`）

- **开发框架：** Next.js
- **Web3通信：** wagmi + viem + RainbowKit
- **状态与缓存：** @tanstack/react-query + Zustand
- **样式与UI：** TailwindCSS + shadcn/ui
- **类型系统：** 全局严格TypeScript, 借助`abitype`实现智能合约ABI到前端入参/返回值的自动推导

### 智能合约 (`packages/contracts`)

- **开发框架：** Foundry
- **合约语言：** Solidity

### 工程目录结构

```text
dex/
├── apps/
│   └── web/                 # Next.js 前端主应用
│       └── src/hooks/       # 封装复杂 Web3 交互逻辑的 Custom Hooks
├── packages/
│   └── contracts/           # Foundry 智能合约工作区
│       └── out/             # 编译产物 (前端直接跨级读取最新的 ABI JSON)
├── pnpm-workspace.yaml      # Monorepo 依赖配置文件
└── package.json             # 根目录全局脚本
```

## 本地开发指南

### 环境要求

- [Node.js](https://nodejs.org/) (v20+ LTS)
- [pnpm](https://pnpm.io/) (推荐 v9+)
- [Foundry](https://getfoundry.sh/) (用于编译智能合约)
- _推荐系统环境: Linux / macOS / Windows WSL2_

### 启动步骤

1. **克隆项目并安装全局依赖**

```bash
 git clone https://github.com/yourusername/dex.git
 cd dex
 pnpm install
```

2. **编译智能合约 (为前端生成最新 ABI)**

```bash
 pnpm contracts:compile
```

3. **配置前端环境变量**

```bash
 cd apps/web
 cp .env.example .env.local
 # 请在 .env.local 中填入你的 WalletConnect Project ID 及 RPC API Key
```

4. **启动开发服务器**

```bash
 # 请回到项目根目录执行：
 cd ../..
 pnpm web
```

随后在浏览器中打开 [http://localhost:3000](http://localhost:3000) 即可预览。
