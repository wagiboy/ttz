import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Faucet from '@/views/Faucet.vue'
import Contract from '@/views/Contract.vue'
import AddressBook from '@/views/AddressBook.vue'
import PolygonScan from '@/views/PolygonScan.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: 'TTZ coin',
      metaTags: [{
        name: 'description',
        content: 'Parents and students earn TutorZ coin (TTZ) when they purchase tutoring on the TutorZ.com platform. Tutors are being rewarded with TTZ when teaching students. Thereafter, use TTZ coins to get free tutoring.'
      }]
    }    
  },
  {
    path: '/faucet',
    component: Faucet,
    meta: {
      title: 'TTZ coin faucet',
      metaTags: [{
        name: 'description',
        content: 'Use this TTZ faucet to drip 10 TTZ coins into your MetaMask wallet.'
      }]
    }      
  },
  {
    path: '/contract',
    component: Contract,
    meta: {
      title: 'TTZ contract info',
      metaTags: [{
        name: 'description',
        content: 'Information about the TTZ contract and blockchain.'
      }]
    }     
  },
  {
    path: '/address-book',
    component: AddressBook,
    meta: {
      title: 'TTZ wallets',
      metaTags: [{
        name: 'description',
        content: 'Wallet addresses holding TTZ coin'
      }]
    }         
  },
  {
    path: '/polygon',
    component: PolygonScan,
    meta: {
      title: 'TTZ runs on Polygon',
      metaTags: [{
        name: 'description',
        content: "The smart contract holding the TTZ tokens runs on Polygon's Mumbai test network."
      }] 
    }   
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/* --------------------------------------------------------------------------------------
 * This is a global navigation guard updating the page title and metadata on route change
 * -------------------------------------------------------------------------------------- */
router.beforeEach((to, from, next) => {
  // The beforeEch callback runs before every route change, including on page load.
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } 
  else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});


export default router
