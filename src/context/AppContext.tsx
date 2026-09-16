import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  ProductListing, 
  BulkRequirement, 
  Order, 
  HubBatch, 
  Dispute, 
  AppNotification,
  CropGrade
} from '../types';
import { 
  MOCK_PRODUCTS, 
  MOCK_HUBS, 
  MOCK_BULK_REQUIREMENTS, 
  MOCK_ORDERS, 
  MOCK_HUB_BATCHES, 
  MOCK_DISPUTES, 
  MOCK_NOTIFICATIONS 
} from '../data/mockData';

interface CartItem {
  product: ProductListing;
  quantityKg: number;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  products: ProductListing[];
  addProduct: (product: Omit<ProductListing, 'id'>) => string;
  bulkRequirements: BulkRequirement[];
  addBulkRequirement: (req: Omit<BulkRequirement, 'id' | 'createdAt' | 'status' | 'matchedSupplies'>) => string;
  matchSupplyForRequirement: (reqId: string) => void;
  orders: Order[];
  createOrderFromCart: (buyerInfo: { name: string; phone: string; address: string }) => string;
  updateOrderStatus: (orderId: string, nextStatus: Order['status']) => void;
  hubBatches: HubBatch[];
  updateBatchStatus: (batchId: string, status: HubBatch['status'], grade?: CropGrade, qualityScore?: number) => void;
  disputes: Dispute[];
  updateDisputeStatus: (disputeId: string, status: Dispute['status'], notes?: string) => void;
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (title: string, message: string, category: AppNotification['category'], linkTo?: string) => void;
  cart: CartItem[];
  addToCart: (product: ProductListing, quantityKg: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isVoiceAssistantOpen: boolean;
  setIsVoiceAssistantOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('visitor');
  const [products, setProducts] = useState<ProductListing[]>(() => {
    const saved = localStorage.getItem('sfn_products');
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });

  const [bulkRequirements, setBulkRequirements] = useState<BulkRequirement[]>(() => {
    const saved = localStorage.getItem('sfn_bulk_reqs');
    return saved ? JSON.parse(saved) : MOCK_BULK_REQUIREMENTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('sfn_orders');
    return saved ? JSON.parse(saved) : MOCK_ORDERS;
  });

  const [hubBatches, setHubBatches] = useState<HubBatch[]>(() => {
    const saved = localStorage.getItem('sfn_batches');
    return saved ? JSON.parse(saved) : MOCK_HUB_BATCHES;
  });

  const [disputes, setDisputes] = useState<Dispute[]>(() => {
    const saved = localStorage.getItem('sfn_disputes');
    return saved ? JSON.parse(saved) : MOCK_DISPUTES;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('sfn_notifications');
    return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Persistence
  useEffect(() => {
    localStorage.setItem('sfn_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sfn_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('sfn_bulk_reqs', JSON.stringify(bulkRequirements));
  }, [bulkRequirements]);

  useEffect(() => {
    localStorage.setItem('sfn_batches', JSON.stringify(hubBatches));
  }, [hubBatches]);

  useEffect(() => {
    localStorage.setItem('sfn_disputes', JSON.stringify(disputes));
  }, [disputes]);

  useEffect(() => {
    localStorage.setItem('sfn_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (title: string, message: string, category: AppNotification['category'], linkTo?: string) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      read: false,
      category,
      linkTo,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addProduct = (newProdData: Omit<ProductListing, 'id'>) => {
    const newId = `prod-${Date.now()}`;
    const product: ProductListing = {
      ...newProdData,
      id: newId,
    };
    setProducts(prev => [product, ...prev]);
    
    // Also create incoming batch in local hub
    const newBatch: HubBatch = {
      id: `BATCH-${Math.floor(100 + Math.random() * 900)}`,
      farmerName: newProdData.farmerName,
      cropName: newProdData.cropName,
      quantityKg: newProdData.quantityKg,
      weighedWeightKg: newProdData.quantityKg,
      grade: newProdData.grade,
      qualityScore: newProdData.qualityScore,
      status: 'Received',
      collectedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      moisturePercentage: 88,
    };
    setHubBatches(prev => [newBatch, ...prev]);

    addNotification(
      'New Produce Listed',
      `Your listing for ${newProdData.quantityKg} kg ${newProdData.cropName} is now active and routing to ${newProdData.hubName}.`,
      'ai',
      '/farmer'
    );

    return newId;
  };

  const addBulkRequirement = (reqData: Omit<BulkRequirement, 'id' | 'createdAt' | 'status' | 'matchedSupplies'>) => {
    const newId = `req-${Date.now()}`;
    
    // Auto-calculate realistic supply matching
    const matchingSupplies = [
      { supplierName: 'Farmer Ravi Kumar', type: 'Farmer' as const, quantityKg: Math.round(reqData.requiredQuantityKg * 0.2), location: 'Kadiyam (8km)', pricePerKg: reqData.maxPricePerKg * 0.95, grade: reqData.requiredGrade },
      { supplierName: 'Farmer Suresh Varma', type: 'Farmer' as const, quantityKg: Math.round(reqData.requiredQuantityKg * 0.25), location: 'Torredu (14km)', pricePerKg: reqData.maxPricePerKg * 0.95, grade: reqData.requiredGrade },
      { supplierName: 'Farmer Lakshmi Devi', type: 'Farmer' as const, quantityKg: Math.round(reqData.requiredQuantityKg * 0.25), location: 'Nunna (11km)', pricePerKg: reqData.maxPricePerKg * 0.94, grade: reqData.requiredGrade },
      { supplierName: 'Godavari Valley FPO Cluster', type: 'FPO' as const, quantityKg: Math.round(reqData.requiredQuantityKg * 0.3), location: 'Rajahmundry Hub Lot #4', pricePerKg: reqData.maxPricePerKg * 0.92, grade: reqData.requiredGrade },
    ];

    const newReq: BulkRequirement = {
      ...reqData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Matched',
      matchedSupplies: matchingSupplies,
    };

    setBulkRequirements(prev => [newReq, ...prev]);

    addNotification(
      'Bulk Requirement Matched 100%',
      `AI matched ${reqData.requiredQuantityKg} kg of ${reqData.cropName} across 4 local suppliers at Rajahmundry Farm Hub.`,
      'order',
      '/buyer'
    );

    return newId;
  };

  const matchSupplyForRequirement = (reqId: string) => {
    setBulkRequirements(prev => prev.map(req => {
      if (req.id === reqId) {
        return {
          ...req,
          status: 'Aggregating',
        };
      }
      return req;
    }));
  };

  const addToCart = (product: ProductListing, quantityKg: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantityKg: item.quantityKg + quantityKg }
            : item
        );
      }
      return [...prev, { product, quantityKg }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrderFromCart = (buyerInfo: { name: string; phone: string; address: string }) => {
    if (cart.length === 0) return '';
    const firstItem = cart[0];
    const totalAmount = cart.reduce((sum, item) => sum + (item.product.pricePerKg * item.quantityKg), 0);
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantityKg, 0);

    const newOrderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: newOrderId,
      productName: cart.length === 1 ? firstItem.product.cropName : `${firstItem.product.cropName} & ${cart.length - 1} other produce`,
      category: firstItem.product.category,
      quantityKg: totalQuantity,
      pricePerKg: Math.round(totalAmount / totalQuantity),
      totalAmount,
      buyerName: buyerInfo.name,
      buyerPhone: buyerInfo.phone,
      deliveryAddress: buyerInfo.address,
      hubName: firstItem.product.hubName,
      status: 'Order Created',
      createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      estimatedDelivery: 'Tomorrow, 02:00 PM IST',
      vehicleNumber: 'AP 05 TA 8812 (Insulated 14ft)',
      driverName: 'K. Satish Kumar',
      driverPhone: '+91 98480 33445',
      tempControlled: true,
      currentTempC: 14.0,
      timeline: [
        { step: 'Order Created', timestamp: 'Just now', completed: true, description: 'Order confirmed and funds locked in Smart Escrow.' },
        { step: 'Produce Aggregated', timestamp: 'Scheduled: Today 2:00 PM', completed: false, description: 'Aggregating from farmer crates at hub.' },
        { step: 'Quality Verified', timestamp: 'Scheduled: Today 4:00 PM', completed: false, description: 'AI Optical Grading & batch QC pass.' },
        { step: 'Packed', timestamp: 'Scheduled: Today 6:00 PM', completed: false, description: 'Packing in ventilated reusable crates.' },
        { step: 'Dispatched', timestamp: 'Scheduled: Tomorrow 6:00 AM', completed: false, description: 'Vehicle transit initiation.' },
        { step: 'Out for Delivery', timestamp: 'Scheduled: Tomorrow 11:00 AM', completed: false, description: 'Last mile delivery route.' },
        { step: 'Delivered', timestamp: 'Scheduled: Tomorrow 2:00 PM', completed: false, description: 'Digital sign-off & immediate payment release.' },
      ],
      escrow: {
        status: 'Held Securely',
        totalAmount,
        farmerPayout: Math.round(totalAmount * 0.86),
        hubFee: Math.round(totalAmount * 0.08),
        logisticsFee: Math.round(totalAmount * 0.04),
        platformFee: Math.round(totalAmount * 0.02),
      },
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setIsCartOpen(false);

    addNotification(
      'Order Placed Successfully',
      `Order ${newOrderId} created. ₹${totalAmount.toLocaleString('en-IN')} held in Smart Escrow.`,
      'order',
      `/buyer`
    );

    return newOrderId;
  };

  const updateOrderStatus = (orderId: string, nextStatus: Order['status']) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const isDelivered = nextStatus === 'Delivered';
        const updatedTimeline = order.timeline.map(t => {
          if (t.step === nextStatus) return { ...t, completed: true, timestamp: 'Updated just now' };
          return t;
        });

        const defaultEscrow = {
          totalAmount: order.totalAmount ?? 0,
          farmerPayout: Math.round((order.totalAmount ?? 0) * 0.86),
          hubFee: Math.round((order.totalAmount ?? 0) * 0.08),
          logisticsFee: Math.round((order.totalAmount ?? 0) * 0.04),
          platformFee: Math.round((order.totalAmount ?? 0) * 0.02),
          status: 'Held Securely' as const,
        };

        const currentEscrow = order.escrow || defaultEscrow;

        const updatedEscrow = isDelivered 
          ? {
              ...currentEscrow,
              status: 'Payment Released' as const,
              releasedAt: 'Just now via Instant UPI / IMPS',
            }
          : currentEscrow;

        if (isDelivered) {
          const payout = updatedEscrow.farmerPayout ?? Math.round((order.totalAmount ?? 0) * 0.86);
          addNotification(
            'Escrow Payment Released!',
            `₹${payout.toLocaleString('en-IN')} released to farmer for Order ${order.id}. Delivery confirmed.`,
            'payment',
            '/payments'
          );
        }

        return {
          ...order,
          status: nextStatus,
          timeline: updatedTimeline,
          escrow: updatedEscrow,
        };
      }
      return order;
    }));
  };

  const updateBatchStatus = (batchId: string, status: HubBatch['status'], grade?: CropGrade, qualityScore?: number) => {
    setHubBatches(prev => prev.map(batch => {
      if (batch.id === batchId) {
        return {
          ...batch,
          status,
          grade: grade || batch.grade,
          qualityScore: qualityScore !== undefined ? qualityScore : batch.qualityScore,
        };
      }
      return batch;
    }));
  };

  const updateDisputeStatus = (disputeId: string, status: Dispute['status'], notes?: string) => {
    setDisputes(prev => prev.map(d => {
      if (d.id === disputeId) {
        return {
          ...d,
          status,
          resolutionNotes: notes || d.resolutionNotes,
        };
      }
      return d;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        products,
        addProduct,
        bulkRequirements,
        addBulkRequirement,
        matchSupplyForRequirement,
        orders,
        createOrderFromCart,
        updateOrderStatus,
        hubBatches,
        updateBatchStatus,
        disputes,
        updateDisputeStatus,
        notifications,
        markNotificationRead,
        clearAllNotifications,
        addNotification,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isVoiceAssistantOpen,
        setIsVoiceAssistantOpen,
        isCartOpen,
        setIsCartOpen,
        selectedLanguage,
        setSelectedLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
