import {
    Layers3,
    LayoutDashboard,
    CirclePercent,
    Package,
    ShoppingCart,
    ShoppingBasket,
    MapPin,
    Users,
    Ribbon,
    TicketSlash,
    Feather,
    Popcorn,
    CalendarClock,
    ClipboardList,
    Store,
    UserCog,
    Radio,
    HandCoins,
    Flame,
    UserRoundCog,
    LucideIcon,
    UserRoundCheck
  } from "lucide-react";
  
  type DashboardSidebar = {
    label: string;
    href: string;
    icon: LucideIcon
  }

  export const DASHBOARD_SIDEBAR: readonly DashboardSidebar[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Brand",
      href: "/dashboard/brand",
      icon: Ribbon,
    },
    {
      label: "Category",
      href: "/dashboard/category",
      icon: Layers3,
    },
    {
      label: "Products",
      href: "/dashboard/product",
      icon: Package,
    },
    {
      label: "Orders",
      href: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      label: "Customers",
      href: "/dashboard/customers",
      icon: Users,
    },
    {
      label: "Subscriers",
      href: "/dashboard/subscribers",
      icon: UserRoundCheck,
    },
    {
      label: "Coupon",
      href: "/dashboard/coupon",
      icon: CirclePercent,
    },
  ] as const;
  
  
  export const DASHBOARD_SELLER_SIDEBAR = [
    {
      label: "Seller Requests",
      href: "/dashboard/sellers/request",
      icon: Radio,
    },
    {
      label: "Sellers",
      href: "/dashboard/sellers",
      icon: Users,
    },
    {
      label: "Orders",
      href: "/dashboard/sellers/orders",
      icon: ShoppingCart,
    },
    {
      label: "Withdraw",
      href: "/dashboard/sellers/withdraw",
      icon: HandCoins,
    },
  ] as const;
  
  export const SELLER_DASHBOARD_SIDEBAR = [
      {
          label: "Dashboard",
          href: "/seller",
          icon: LayoutDashboard
      },
      {
          label: "Store",
          href: "/seller/store",
          icon: Store
      },
      {
          label: "Place Order",
          href: "/seller/order/create",
          icon: ShoppingCart
      },
      {
          label: "Orders",
          href: "/seller/order/list",
          icon: ClipboardList
      },
      {
          label: "Withdraw",
          href: "/seller/withdraw",
          icon: HandCoins
      },
      {
          label: "Profile",
          href: "/seller/profile",
          icon: UserCog
      },
  ] as const;
  
  
  export const NAVBAR_DATA = [
      {
          label: "Deal",
          path: "/deal",
          Icon: Flame
      },
      {
          label: "Home",
          path: "/"
      },
      {
          label: "Shop",
          path: "/shop"
      },
      {
          label: "About",
          path: "/about"
      },
      {
          label: "Contact",
          path: "/contact"
      },
  ]
  
  
  export const USER_NAVBAR = [
      {
          label: "Dashboard",
          href: "/account",
          icon: LayoutDashboard
      },
      {
          label: "Orders",
          href: "/account/orders",
          icon: ShoppingCart
      },
      {
          label: "Address",
          href: "/account/address",
          icon: MapPin
      },
      {
          label: "Profile",
          href: "/account/profile",
          icon: UserCog
      },
] as const;
  

export const CLIENT_SIDEBAR = [
  {
    label: "Banner",
    href: "/dashboard/banner",
    icon: TicketSlash,
  },
  {
    label: "F. Products",
    href: "/dashboard/feature-products",
    icon: Feather,
  },
  {
    label: "P. Products",
    href: "/dashboard/popular-products",
    icon: Popcorn,
  },
  {
    label: "Best Deal",
    href: "/dashboard/best-deal",
    icon: CirclePercent,
  },
] as const;