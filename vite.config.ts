import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// import SvgLoader from 'vite-svg-loader'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { resolve } from 'path';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  // const env = loadEnv(mode as string, process.cwd(), '');
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    // SvgLoader({ defaultImport: 'url' }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]'
    }),
    viteMockServe({
      // 模拟数据目录
      mockPath: './mock',
      // prodEnabled: true
      enable: false
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    host: false,
    port: 9527
    // cors: true
    // proxy: {
    //   '/apis': {
    //     target: env.VITE_APP_HOST,
    //     changeOrigin: true,
    //     ws: true,
    //     rewrite: (path) => {
    //       return path.replace(/^\/apis/, '');
    //     },
    //     secure: true
    //   }
    // }
  }
});
