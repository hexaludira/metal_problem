<template>
	<div>
		<div class="row">
			<div class="col-md-12">
				<br>
				<br>
				<nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark justify-content-between d-flex">
					<a class="navbar-brand">Metal Problem</a>
				  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				    <span class="navbar-toggler-icon"></span>
				  </button>

				  <div class="collapse navbar-collapse" id="navbarSupportedContent">
				    <!-- <ul class="navbar-nav mr-auto">
				      <li class="nav-item active">
				        <router-link class="btn btn-secondary w-100 my-2 my-sm-0" to="/Upload">Upload</router-link>
				      </li>
				      <li class="nav-item">
				        <router-link class="btn btn-primary w-100" to="/create">+ Tambah</router-link>
				      </li>
				      
				      
				    </ul> -->
				    <div class="mx-auto"></div>
				    

				    <!-- <div class="mx-2 my-1">
				    	<router-link class="btn btn-secondary w-100" to="/Upload">Upload</router-link>
				    </div> -->

				    <!-- <div class="mx-2 my-1">
				    	<button class="btn btn-secondary w-100" @click='showImage()'>Show Image</button>
				    </div> -->
				    
				    <div class="mx-2 my-1">
				    	<router-link class="btn btn-primary w-100" to="/create">+ Tambah</router-link>
				    </div>
				    

				    <form class="form-inline pull-right">
				      
				      <input type="textfield" class="form-control" placeholder="Cari..." v-model="search">
				    </form>
				  </div>
					
				</nav>
				<!-- <div class="row">
					<div class="col-md-4">
						<h4>List Metal Problem V2</h4>
					</div>
					<div class="col-md-4">
						<input type="textfield" class="form-control" placeholder="Cari..." v-model="search">
					</div>
					<div class="col-md-2">
						<router-link class="btn btn-secondary w-100" to="/Upload">Upload</router-link>
						
					</div>
					<div class="col-md-2">
						<router-link class="btn btn-primary w-100" to="/create">+ Tambah</router-link>
					</div>

				</div> -->
				<br>
				<table class="table table-responsive w-100 d-block d-md-table">
					<thead>
						<tr>
							<th scope="col">Tanggal</th>
							<th scope="col">Lokasi</th>
							<th scope="col">Detail</th>
							<th scope="col">Status</th>
							<th scope="col">Keterangan</th>
							<th scope="col">Opsi</th>
						</tr>
						
					</thead>
					<tbody>
						<!-- menampilkan data ke tabel -->
						<tr v-for="metal in filtered" :key="metal.id">
							<td style="width: auto;">{{metal.date}}</td>
							<td style="width: auto;">{{metal.location}}</td>
							<td style="width: auto;">{{metal.detail}}</td>
							<td style="width: auto;">{{metal.status}}</td>
							<td style="width: auto;">{{metal.remark}}</td>
							<td style="width: auto;">
								<router-link class="btn btn-warning" :to="'/detail/'+metal.id">Edit</router-link>
								<button class="btn btn-danger" v-on:click="deleteData(metal.id)">Hapus</button>
								<button class="btn btn-success" v-on:click="showImage(metal.img_name)">Gambar</button>
							</td>
						</tr>
					</tbody>				
				</table>
				<!-- <button class="btn btn-danger" v-if="is-visible" v-on:click="backToTop()">Delete</button> -->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//variable untuk menampung hasil dari API
				search: '',
				//filtered: [],
				metals: [],
				// isVisible: false
				
			};
		},
		created(){
			this.loadData();
		},
		//props: ['home-route'],
		methods:{
			loadData() {
				// axios.get("http://localhost/laravel/public/api/articles").then(response => {
				// 	console.log(response);
				// 	this.metals = response.data;
				// });
				axios.get("http://10.10.41.246/rest_ci/index.php/List_Problem").then(response => {
					console.log(response);
					this.metals = response.data;
				})
			},
			deleteData(id) {
				axios.delete("http://10.10.41.246/rest_ci/index.php/List_Problem/" + id).then(response => {
					console.log(response);
					this.loadData();
				})
			},
			// initToTopButton() {
			// 	$(document).bind('scroll', function(){
			// 		var backToTopButton = $('.goTop');
			// 		if ($(document).scrollTop() > 250) {
			// 			backToTopButton.addClass('isVisible');
			// 			this.isVisible = true;
			// 		} else {
			// 			backToTopButton.removeClass('isVisible');
			// 			this.isVisible = false;	
			// 		}
			// 	}.bind(this));
			// },
			// backToTop() {
			// 	$('html, body').stop().animate({
			// 		scrollTop: 0
			// 	}, 'smooth');
				
			// }
			showImage(img_name){
				Swal.fire(
				{
					title: img_name,
					//html: '<img id="preview" src="http://10.10.41.246/rest_ci/upload/"' + img_name
					imageUrl: 'http://10.10.41.246/rest_ci/upload/' + img_name,
					imageWidth: 500,
					imageHeight: 400
					
				}
				);
			}
		},
		computed: {
			filtered() {
				return this.metals.filter(metal => {
					return metal.location.toLowerCase().includes(this.search.toLowerCase()) || metal.detail.toLowerCase().includes(this.search.toLowerCase()) || metal.date.toLowerCase().includes(this.search.toLowerCase()) || metal.remark.toLowerCase().includes(this.search.toLowerCase()) || metal.status.toLowerCase().includes(this.search.toLowerCase());
				});
			}
		},
		
	};
</script>
<style type="text/css">
	
</style>