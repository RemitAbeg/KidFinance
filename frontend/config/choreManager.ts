export const choreManagerAddress = "0x00cA275f0C7ACBB949B15b1e6626DC25c68eCe82";

export const choreManagerAbi = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "AlreadyAccepted",
    inputs: [],
  },
  {
    type: "error",
    name: "AlreadyCompletedOrRejected",
    inputs: [],
  },
  {
    type: "error",
    name: "InsufficientAllowance",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidAmount",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidStatus",
    inputs: [],
  },
  {
    type: "error",
    name: "NotChild",
    inputs: [],
  },
  {
    type: "error",
    name: "NotParent",
    inputs: [],
  },
  {
    type: "error",
    name: "ReentrancyGuardReentrantCall",
    inputs: [],
  },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ZeroAddress",
    inputs: [],
  },
  {
    type: "event",
    name: "ChoreAccepted",
    anonymous: false,
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
        indexed: true,
      },
      {
        internalType: "address",
        name: "child",
        type: "address",
        indexed: true,
      },
    ],
  },
  {
    type: "event",
    name: "ChoreApproved",
    anonymous: false,
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
        indexed: true,
      },
      {
        internalType: "address",
        name: "parent",
        type: "address",
        indexed: true,
      },
      {
        internalType: "address",
        name: "child",
        type: "address",
        indexed: true,
      },
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256",
        indexed: false,
      },
    ],
  },
  {
    type: "event",
    name: "ChoreCreated",
    anonymous: false,
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
        indexed: true,
      },
      {
        internalType: "address",
        name: "parent",
        type: "address",
        indexed: true,
      },
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256",
        indexed: false,
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
        indexed: false,
      },
    ],
  },
  {
    type: "event",
    name: "ChoreRefunded",
    anonymous: false,
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
        indexed: true,
      },
      {
        internalType: "address",
        name: "parent",
        type: "address",
        indexed: true,
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
        indexed: false,
      },
    ],
  },
  {
    type: "event",
    name: "ChoreRejected",
    anonymous: false,
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
        indexed: true,
      },
      {
        internalType: "address",
        name: "parent",
        type: "address",
        indexed: true,
      },
    ],
  },
  {
    type: "event",
    name: "ChoreSubmitted",
    anonymous: false,
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
        indexed: true,
      },
      {
        internalType: "address",
        name: "child",
        type: "address",
        indexed: true,
      },
      {
        internalType: "string",
        name: "proofURI",
        type: "string",
        indexed: false,
      },
    ],
  },
  {
    type: "function",
    name: "acceptChore",
    stateMutability: "nonpayable",
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "allChoreIds",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
  },
  {
    type: "function",
    name: "approveChore",
    stateMutability: "nonpayable",
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "chores",
    stateMutability: "view",
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "parent",
        type: "address",
      },
      {
        internalType: "address",
        name: "child",
        type: "address",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "proofURI",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
    ],
  },
  {
    type: "function",
    name: "choresByChild",
    stateMutability: "view",
    inputs: [
      {
        internalType: "address",
        name: "child",
        type: "address",
      },
    ],
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
  },
  {
    type: "function",
    name: "choresByParent",
    stateMutability: "view",
    inputs: [
      {
        internalType: "address",
        name: "parent",
        type: "address",
      },
    ],
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
  },
  {
    type: "function",
    name: "createChore",
    stateMutability: "nonpayable",
    inputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    type: "function",
    name: "getChore",
    stateMutability: "view",
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    outputs: [
      {
        internalType: "struct ChoreManager.Chore",
        name: "",
        type: "tuple",
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "parent",
            type: "address",
          },
          {
            internalType: "address",
            name: "child",
            type: "address",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "proofURI",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "reward",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "rejectChore",
    stateMutability: "nonpayable",
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "submitProof",
    stateMutability: "nonpayable",
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "proofURI",
        type: "string",
      },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "totalChores",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
  },
] as const;

export type ChoreManagerAbi = typeof choreManagerAbi;
