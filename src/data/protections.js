export const protections = [
  {
    id: "basic",
    name: "Basic Protection",
    pricePerDay: 0,
    isIncluded: true,
    features: [
      { text: "Third Party Insurance", included: true },
      { text: "Tyre & Windshield Protection", included: false },
      { text: "Interior Protection", included: false },
    ]
  },
  {
    id: "standard",
    name: "Standard Protection",
    pricePerDay: 838.95,
    isIncluded: false,
    features: [
      { text: "Full Insurance", included: true },
      { text: "Tyre & Wheel Protection", included: true },
      { text: "Minor Scratches & Dents Protection", included: false },
      { text: "Breakdown Protection", included: false }
    ]
  },
  {
    id: "premium",
    name: "Premium Protection",
    pricePerDay: 1573.95,
    isIncluded: false,
    features: [
      { text: "Full Insurance", included: true },
      { text: "Tyre & Wheel Protection", included: true },
      { text: "Minor Scratches & Dents Protection", included: true },
      { text: "Breakdown Protection", included: false }
    ]
  },
  {
    id: "elite",
    name: "Elite Protection",
    pricePerDay: 2098.95,
    isIncluded: false,
    features: [
      { text: "Full Insurance", included: true },
      { text: "Tyre & Wheel Protection", included: true },
      { text: "Minor Scratches & Dents Protection", included: true },
      { text: "Breakdown Protection", included: true }
    ]
  }
];
