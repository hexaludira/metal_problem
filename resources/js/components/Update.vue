<template>
	<div>
		<div class="row">
			<div class="col-md-6">
				<br><br>
				<div class="container p-3 border">
					<h4>Update Data</h4>
					<br>
					<form @submit.prevent="updateData()">
						<div class="form-group">
							<label><b>Tanggal</b></label>
							<!-- <input type="textfield" class="form-control" v-model="form.date" required> -->
							<datepicker :format="format" :input-class="content" :typeable="typeable" :placeholder="placeholder" v-model="form.date" required></datepicker>
						</div>
						<div class="form-group">
							<label><b>Detail</b></label>
							<input type="textfield" class="form-control" placeholder="detail" v-model="form.detail" required>
						</div>
						<div class="form-group">
							<label><b>Lokasi</b></label>
							<input type="textfield" class="form-control" placeholder="Lokasi" v-model="form.lokasi" required>
						</div>
						<div class="form-group">
							<label><b>Status</b></label>
							<select class="form-control" v-model="form.status">
								<option value="" disabled>--Pilih salah satu--</option>
								<option value="Lapor QIP">Lapor QIP</option>
								<option value="Kirim Vendor">Kirim Vendor</option>
								<option value="Sensor datang">Sensor datang</option>
								<option value="LP selesai service">LP selesai service</option>
							</select>	
						</div>
						<div class="form-group">
							<label><b>Keterangan</b></label>
							<input type="textfield" class="form-control" placeholder="Keterangan" v-model="form.keterangan">
						</div>
						<button class="btn btn-primary w-50">Update</button>
						<router-link class="btn btn-secondary w-20" to="/"><- Back</router-link>
					</form>
				</div>
				
			</div>
			
		</div>
	</div>
</template>

<script>
	import Datepicker from "vuejs-datepicker";
	export default {
		components: {
			Datepicker
		},
		data () {
			return {
				form: {
					date: '',
					detail: '',
					lokasi: '',
					status: '',
					keterangan: ''
				},
				format: "dd MMMM yyyy",
				//calendarbutton: true,
				style: true,
				styleContent: "form-control",
				placeholder: "Tanggal",
				content: "form-control",
				typeable: true,
				//cal_icon: "bi bi-calendar",
			};
		},
		created() {
			this.loadData();
		},
		methods: {
			loadData(){
				axios.get("http://10.10.41.246/rest_ci/index.php/List_Problem",{
			    params: {
			    	id: this.$route.params.id
			    },
				})
				.then(response => {
					//console.log(response.data[0].date);
					//console.log(moment("10 September 2010").format("yyyy/MM/DD"));
					//console.log(moment("response.data[0].date").format("yyyy-MM-DD"));
					this.form.date = response.data[0].date;
					//this.form.date = "23 December 2021";
					this.form.detail = response.data[0].detail;
					this.form.lokasi = response.data[0].location;
					this.form.status = response.data[0].status;
					this.form.keterangan = response.data[0].remark;
				});
			},
			updateData(){
				//insert data ke API dengan put
				axios.put("http://10.10.41.246/rest_ci/index.php/List_Problem", 
				{
					id: this.$route.params.id,
					date: moment(this.form.date).format('DD MMMM yyyy'),
					detail: this.form.detail,
					location: this.form.lokasi,
					status: this.form.status,
					remark: this.form.keterangan
				})
				.then(response => {
					console.log(response);
					this.$router.push("/");
				});
			}
		},
	};
</script>