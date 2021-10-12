<template>
	<div>
		<div class="row">
			<div class="col-md-6">
				<br>
				<br>
				<div class="container border p-3">
					<h4>Buat data baru</h4>
				<br>
				<form enctype="multipart/form-data" method="post" @submit.prevent="uploadImage()">
					
					<div class="form-group">
						<label><b>Upload</b></label>
						<input type="file" ref="file" accept="image/*" @change="previewImage" class="form-control-file" id="image" name="image">

						<br>
              		<img :src="preview" class="img-fluid" />
						<!-- <input ref="fileInput" type="file" accept="image/*" @input="pickFile" class="form-control" required>
						
						<div
				      class="imagePreviewWrapper"
				      :style="{ 'background-image': `url(${previewImage})` }"
				      @click="selectImage"> -->
				    </div>
					
					
					<button class="btn btn-primary w-50">Submit</button>
					<!-- <button class="btn btn-primary w-50" @click="alertDisplay">Click</button> -->
					
					<router-link class="btn btn-secondary w-20" to="/"><- Back</router-link>
				</form>
				</div>
				
			</div>
		</div>
	</div>
</template>


<script>

	//import Swal from 'vue-sweetalert2';

	//const Swal = SweetAlert;
	
	export default {
		// components: {
		// 	Swal
		// },
		data() {
			return{
				file:'',
				preview: null,
				image: null,
				hasil: '',
				uploadReady: true
				// previewImage: null,
				//image: null
			};
			
		},
		methods: {
			showAlert() {
				
		       	//Swal.fire('coba');
		        //this.$swal('Berhasil');
		        Swal.fire({
                  title: 'Berhasil!',
                  text: 'Gambar berhasil diupload',
                  icon: 'success',
                  confirmButtonText: 'Baiklah'
                });
      		},
      		showAlertImg(){
      			Swal.fire(
      				'File terlalu besar'
      			);
      		},
      		reset(){
      			const input = this.$refs.file;
		        input.type = 'text';
		        input.type = 'file';
        	
      		},
			previewImage: function(event) {
		      var input = event.target;
		      if (input.files) {
		        var reader = new FileReader();
		        reader.onload = (e) => {
		          this.preview = e.target.result;
		        }
		        this.image=input.files[0];
		        reader.readAsDataURL(input.files[0]);
		      }
		    },
		    uploadImage: function(){
		    	this.file = this.$refs.file.files[0];

		    	var formData = new FormData();

		    	if (this.file.size > 3000000) {
		    		this.showAlertImg();
		    	} else {
		    		formData.append('image', this.file);

		    	axios.post('http://10.10.41.246/rest_ci/index.php/Upload', formData, {
		    		headers : {
		    			'Content-Type' : 'multipart/form-data'
		    		}
		    	}).then(response=>{
		    		//this.hasil = "Berhasil";
		    		//this.reset();
		    		this.showAlert();
		    		this.reset();
		    		this.preview = null;
		    		console.log(response);
		    	});

		    	}

		    	
		    }
			
		},

	}
</script>

<style scoped lang="scss">
.imagePreviewWrapper {
    width: 250px;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}
</style>