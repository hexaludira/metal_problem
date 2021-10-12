<template>
	<div>
		<div class="row">
			<div class="col-md-6">
				<br>
				<br>
				<div class="container border p-3">
					<h4>Buat data baru</h4>
				<br>
				<form @submit.prevent="addData()">
					<div class="form-group">
						<label><b>Tanggal</b></label>
						<!-- <input type="date" class="form-control" placeholder="yyyy-mm-dd" v-model="form.date" required> -->
						<datepicker :format="format" :input-class="content" :typeable="typeable" :placeholder="placeholder" v-model="form.date" required></datepicker>
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
						</select>
					</div>
					<div class="form-group">
						<label><b>Keterangan</b></label>
						<input type="textfield" class="form-control" placeholder="Keterangan" v-model="form.keterangan">
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
	import Datepicker from 'vuejs-datepicker';

	export default {
		components: {
			Datepicker
		},
		data (){
			return{
				form:{
					date: '',
					detail:'',
					lokasi:'',
					status:'',
					keterangan:''
				},
				format: "dd MMMM yyyy",
				//calendarbutton: true,
				style: true,
				styleContent: "form-control",
				placeholder: "Tanggal",
				content: "form-control",
				typeable: true,
			}
		},

		methods: {
			
			addData() {
				axios.post("http://10.10.41.246/rest_ci/index.php/List_Problem", {
					date: moment(this.form.date).format('DD MMMM yyyy'),
					detail: this.form.detail,
					location: this.form.lokasi,
					status: this.form.status,
					remark: this.form.keterangan
				})
				.then(response => {
					console.log(response);
					//console.log(moment("response.data[70].date").format("yyyy-MM-DD"));
					this.$router.push("/");
				});
			}
		}
	};
</script>