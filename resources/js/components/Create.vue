<template>
	<div>
		<div class="row">
			<div class="col-md-6">
				<br>
				<br>
				<div class="container border p-3">
					<h4>Buat data baru</h4>
				<br>
				<form enctype="multipart/form-data" method="post" @submit.prevent="addData(); uploadImage();">
					<div class="form-group">
						<p>kampretttt</p>
						<p>wawan jossss</p>
						<label><b>Tanggal</b></label>
						<!-- <input type="date" class="form-control" placeholder="yyyy-mm-dd" v-model="form.date" required> -->
						<!-- <datepicker :format="format" :input-class="content" :typeable="typeable" :placeholder="placeholder" v-model="form.date" :highlighted="highlighted" required></datepicker> -->
						<!-- <vc-calendar></vc-calendar>
						<vc-date-picker v-model='selectedDate' /> -->
						<VueDatePicker v-model="form.date" placeholder="Pilih tanggal" fullscreen-mobile/>
						
					</div>
					<div class="form-group">
						<label><b>Detail</b></label>
						<input type="textfield" class="form-control" placeholder="Detail" v-model="form.detail" required>
					</div>
					<div class="form-group">
						<label><b>Lokasi</b></label>
						<input type="textfield" class="form-control" placeholder="Lokasi" v-model="form.lokasi" required>
					</div>
					<div class="form-group">
						<label><b>Status</b></label>
						<select class="form-control" v-model="form.status">
							<option disabled value="">--Pilih salah satu--</option>
							<option value="Lapor QIP">Lapor QIP</option>
							<option value="Kirim Vendor">Kirim Vendor</option>
							<option value="Sensor datang">Sensor datang</option>
							<option value="LP selesai service">LP selesai service</option>
							<option value="Ganti LP">Ganti LP</option>
						</select>
					</div>
					<div class="form-group">
						<label><b>Keterangan</b></label>
						<input type="textfield" class="form-control" placeholder="Keterangan" v-model="form.keterangan">
					</div>
					<div class="form-group">
						<label><b>Gambar</b></label>
						<input type="file" ref="file" accept="image/*" @change="previewImage" class="form-control-file" id="image" name="image">
						<br>
						<img :src="preview" class="img-fluid" />
						<!-- <input type="textfield" v-model="form.img_name"> -->
					</div>

					<button class="btn btn-primary w-50">Submit</button>
					
					<router-link class="btn btn-secondary w-20" to="/"><- Back</router-link>
				</form>
				</div>
				
			</div>
		</div>
	</div>
</template>
<script>
	//import Datepicker from 'vuejs-datepicker';
	
	


	//const today = new Date();

	export default {
		
		data (){
			return{
				form:{
					date: null,
					detail:'',
					lokasi:'',
					status:'',
					keterangan:'',
					img_name:''
				},
				//highlighted: new Date(2021,10,12),
				format: "dd MMMM yyyy",
				//calendarbutton: true,
				style: true,
				styleContent: "form-control",
				placeholder: "Tanggal",
				content: "form-control",
				typeable: true,
				selectedDate: null,
				//locale: {lang: 'en'},
				//for upload file
				file: null,
				preview: null,
				image: null,
				
			}
		},

		methods: {
			addData() {
				//this.file = this.$refs.file.files[0];

				if(this.$refs.file.files.size > 4000000){
					console.log("File terlalu besar");
				} else if (this.$refs.file.files[0] == null){
						axios.post("http://10.10.41.246/rest_ci/index.php/List_Problem", {
						date: moment(this.form.date).format('DD MMMM yyyy'),
						detail: this.form.detail,
						location: this.form.lokasi,
						status: this.form.status,
						remark: this.form.keterangan,
						//img_name: this.form.img_name
					})
					.then(response => {
						console.log(response);
						//console.log(moment("response.data[70].date").format("yyyy-MM-DD"));
						this.showAlert();
						this.sendTelegram();
						this.$router.push("/");
					});
				} else {
					axios.post("http://10.10.41.246/rest_ci/index.php/List_Problem", {
						date: moment(this.form.date).format('DD MMMM yyyy'),
						detail: this.form.detail,
						location: this.form.lokasi,
						status: this.form.status,
						remark: this.form.keterangan,
						img_name: this.form.img_name
					})
					.then(response => {
						console.log(response);
						this.sendTelegram();
						//console.log(moment("response.data[70].date").format("yyyy-MM-DD"));
						this.$router.push("/");
					});
				}
	
			},
			showAlert() {
				
	       	//Swal.fire('coba');
	        //this.$swal('Berhasil');
	        Swal.fire({
               title: 'Berhasil!',
               text: 'Data berhasil diupload',
               icon: 'success',
               confirmButtonText: 'Baiklah'
             });
   		},
			showAlertImg(){
   			Swal.fire(
   				'Maaf, Ukuran file terlalu besar ya..'
   			);
      	},

			reset(){
				const input = this.$refs.file;
				input.type = 'text';
				input.type = 'file';
			},

			previewImage(event){
				var input = event.target;
				if (input.files) {
					var reader = new FileReader();
					reader.onload = (e) => {
						this.preview = e.target.result;
					}
					this.image = input.files[0];
					this.form.img_name = input.files[0].name;
					reader.readAsDataURL(input.files[0]);
				}
			},
			
			uploadImage() {
				//alert('coba coba');
				this.file = this.$refs.file.files[0];

				var formData = new FormData();

				if (this.file.size > 4000000) {
					this.showAlertImg();
				} else {
					formData.append('image', this.file);

					axios.post('http://10.10.41.246/rest_ci/index.php/Upload', formData, {
						headers : {
							'Content-Type' : 'multipart/form-data'
						}
					}).then(response=> {
						this.showAlert();
			    		//this.reset();
			    		this.preview = null;
			    		console.log(response);
					});
				}
			},
			sendTelegram(){
				
				axios.post('https://api.telegram.org/bot2111744206:AAFS3bqpOif1TqNc71yZLhX18Cr9cbKM7Ew/sendMessage?parse_mode=Markdown',{
					chat_id : -719194981,
					text: "*==New Problem==*\nLocation: " + this.form.lokasi + "\nDetail: " + this.form.detail + "\nStatus: " + this.form.status + "\nRemark: " + this.form.keterangan

				})
			}
		}
	};
</script>
