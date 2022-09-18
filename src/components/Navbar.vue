<template>
  <nav>
		<v-app-bar max-height="64" color="white" flat>

			<!-- website logo and name -->
			<v-app-bar-nav-icon @click="toggleDrawer()" width="54" class="blue-grey--text ml-0 hidden-md-and-up"></v-app-bar-nav-icon>
			<div class="hidden-sm-and-down">
				<a href="/">
					<v-img
						alt="TTZCoin Logo"					
						src="@/assets/hat.gif"
						transition="scale-transition"
						contain
						height="50"
					/>
				</a>
			</div>	
			<a href="/">
				<v-app-bar-title class="">
					<span class="font-weight-bold">
						<span class="primary--text">TT</span>
						<span class="gold--text">Z</span></span>
					<span class="font-weight-light blue-grey--text">Coin</span>
				</v-app-bar-title>			
			</a>
			<v-spacer></v-spacer>

			<!-- navigation menu -->
			<v-card flat class="hidden-sm-and-down">
				<v-menu open-on-hover offset-y transition="slide-y-transition" >
					<template v-slot:activator="{ on }">
						<v-btn text class="text-capitalize" v-on="on">
							<v-icon class="blue-grey--text">mdi-chevron-down</v-icon>
							<span class="blue-grey--text">Dropdown</span>
						</v-btn>
					</template>
					<v-list dense>
						<v-list-item v-for="(link, i) in links" :key="i" :to="link.route" class="blue-grey--text">
							<v-list-item-icon class="mr-3">
								<v-icon>mdi-{{ link.icon }}</v-icon>
							</v-list-item-icon>						
							<v-list-item-content>
								<v-list-item-title>{{ link.title }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-menu>

				<v-btn text class="text-capitalize" v-for="link in links" :key="link.title" :to="link.route">
					<v-icon class="blue-grey--text">mdi-{{ link.icon }}</v-icon>
					<span class="blue-grey--text">{{ link.title }}</span>
				</v-btn>
			</v-card>

			<Snackbars/>

		</v-app-bar>

		<!-- navigation drawer -->
		<v-navigation-drawer app v-model="drawer">
			<v-row>
				<v-col cols="2" class="ml-15 mt-1">
					<v-img src="@/assets/hat.gif"	contain height="50" />
				</v-col>
				<v-col cols="2" class="pa-0 mt-6 blue-grey--text title">
					<span class="font-weight-bold">TTZ</span>
					<span class="font-weight-light">Coin</span>
				</v-col>
			</v-row>

			<v-list dense>
				<v-list-item v-for="(link, i) in links" :key="i" router :to="link.route" class="blue-grey--text">
					<v-list-item-icon>
						<v-icon>mdi-{{ link.icon }}</v-icon>
					</v-list-item-icon>						
					<v-list-item-content>
						<v-list-item-title>{{ link.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

	<v-divider></v-divider>
  </nav>
</template>

<script>
import Snackbars from '@/components/Snackbars.vue'
export default {
  name: 'Navbar',
  components: { Snackbars },  
  data: () => ({
		drawer: false,
		links: [
			{ title: 'Home', route: '/', icon: 'home' },
			{ title: 'Faucet', route: '/faucet', icon: 'faucet' },
			{ title: 'Contract', route: '/contract', icon: 'scale-balance' },
			{ title: 'Address Book', route: '/address-book',  icon: 'bookshelf' },
			{ title: 'Polygon', route: '/polygon',  icon: 'hexagon-slice-2' }
		]
	}),
 	methods: {
		toggleDrawer() {
			this.drawer = !this.drawer
		}
	}
}
</script>