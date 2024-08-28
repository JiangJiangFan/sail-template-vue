/// <reference types="vite/client" />

import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string;
    isHide?: boolean;
    icon?: string;
  }
  interface _RouteRecordBase {
    isHide?: boolean;
  }
}
