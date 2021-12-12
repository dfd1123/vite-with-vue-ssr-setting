import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory, Router
} from 'vue-router';

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob('./pages/*.vue')

const routes = Object.keys(pages).map((path) => {
  const matchComps : RegExpMatchArray | null = path.match(/\.\/pages(.*)\.vue$/);
  const name : string = matchComps && matchComps[1] ? matchComps[1].toLowerCase() : '';
  console.log(pages, name)
  console.log('name:', name)
  return {
    path: name === '/home' ? '/' : name,
    component: pages[path] // () => import('./pages/*.vue')
  }
})

export function createRouter() : Router {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}
