export type UserRole = 'visitor' | 'farmer' | 'hub_manager' | 'buyer' | 'admin';

export type CropGrade = 'Grade A' | 'Grade B' | 'Grade C' | 'Premium Organic';
export type QualityGrade = CropGrade;

export type CropCategory = 'Vegetables' | 'Fruits' | 'Grains' | 'Pulses' | 'Spices' | 'Oilseeds';

export type HubStatus = 'Received' | 'Weighing' | 'Grading' | 'Approved' | 'Aggregated' | 'Packed' | 'Dispatched';

export type OrderStatus = 
  | 'Order Created'
  | 'Produce Aggregated'
  | 'Quality Verified'
  | 'Packed'
  | 'Dispatched'
  | 'Out for Delivery'
  | 'Delivered';

export type EscrowStatus = 
  | 'Payment Received'
  | 'Held Securely'
  | 'Produce Delivered'
  | 'Delivery Confirmed'
  | 'Payment Released';

export type DisputeStatus = 'Open' | 'Under Review' | 'Resolved' | 'Rejected';

export interface FarmerProfile {
  id: string;
  name: string;
  village: string;
  district: string;
  state: string;
  phone: string;
  avatar: string;
  rating: number;
  fpoAffiliation?: string;
  totalAcres: number;
  totalSoldKg: number;
  verified: boolean;
}

export interface FarmHub {
  id: string;
  name: string;
  district: string;
  state: string;
  capacityTonnes: number;
  currentOccupancyTonnes: number;
  coldStorageAvailable: boolean;
  managerName: string;
  phone: string;
  coordinates: { lat: number; lng: number };
  coveredVillages: string[];
}

export interface ProductListing {
  id: string;
  cropName: string;
  category: CropCategory;
  variety: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  hubId: string;
  hubName: string;
  distanceKm: number;
  quantityKg: number;
  minOrderKg: number;
  pricePerKg: number;
  grade: CropGrade;
  qualityScore: number; // 0 - 100
  harvestDate: string;
  expiryDays: number;
  imageUrl: string;
  verified: boolean;
  organic: boolean;
  description: string;
  aiGradingReport: {
    cropDetected: string;
    grade: CropGrade;
    qualityScore: number;
    defectLevel: 'Low' | 'Moderate' | 'High';
    confidence: number;
    estimatedMarketPrice: string;
    moistureContent?: string;
    firmnessIndex?: string;
    analyzedAt: string;
  };
  traceability: {
    constituentFarmersCount: number;
    farmPlots: string[];
    soilHealthScore: string;
    inspectionDate: string;
    inspectorName: string;
    dispatchReady: boolean;
  };
}

export interface BulkRequirement {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerType: 'Supermarket' | 'Restaurant' | 'Hotel' | 'Food Processor' | 'Retail Chain';
  cropName: string;
  variety?: string;
  requiredQuantityKg: number;
  maxPricePerKg: number;
  deliveryLocation: string;
  requiredByDate: string;
  requiredGrade: CropGrade;
  status: 'Open' | 'Matched' | 'Aggregating' | 'Fulfilled';
  createdAt: string;
  matchedSupplies: {
    supplierName: string;
    type: 'Farmer' | 'FPO';
    quantityKg: number;
    location: string;
    pricePerKg: number;
    grade: CropGrade;
  }[];
}

export interface Order {
  id: string;
  productName: string;
  category: CropCategory;
  quantityKg: number;
  pricePerKg: number;
  totalAmount: number;
  buyerName: string;
  buyerPhone: string;
  deliveryAddress: string;
  hubName: string;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  vehicleNumber?: string;
  driverName?: string;
  driverPhone?: string;
  tempControlled: boolean;
  currentTempC?: number;
  timeline: {
    step: OrderStatus;
    timestamp: string;
    completed: boolean;
    description: string;
  }[];
  escrow: {
    status: EscrowStatus;
    totalAmount: number;
    farmerPayout: number;
    hubFee: number;
    logisticsFee: number;
    platformFee: number;
    releasedAt?: string;
  };
}

export interface HubBatch {
  id: string;
  farmerName: string;
  cropName: string;
  quantityKg: number;
  weighedWeightKg: number;
  grade: CropGrade;
  qualityScore: number;
  status: HubStatus;
  collectedAt: string;
  moisturePercentage: number;
}

export interface Dispute {
  id: string;
  orderId: string;
  buyerName: string;
  farmerName: string;
  cropName: string;
  quantityKg: number;
  issue: string;
  amountDisputed: number;
  reportedDate: string;
  evidenceUrl?: string;
  status: DisputeStatus;
  resolutionNotes?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'order' | 'ai' | 'hub' | 'payment' | 'system';
  linkTo?: string;
}
