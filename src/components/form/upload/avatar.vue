<template>
  <label class="upload" :style="{background: upload && `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%) , url(${upload}), lightgray 50% / cover no-repeat`}">
        <svgicon :class="{filter: upload}" name="Upload"/>
         <p>Upload profile image here <br> (JPG, PNG)</p>
         <h6>Browse</h6>
         <input type="file"  v-on:change="onChange">
    </label>
</template>

<script setup>
    import { ref } from 'vue';
    const upload = ref(null)
    const onChange = (event)=>{
        const value1 = event.target.files[0]
       if(value1){
        const reder = new FileReader();
        reder.onload=(e)=>{
         upload.value = e.target.result
         console.log(upload.value);
         appContext.emit(upload.value)
        }
        reder.readAsDataURL(value1)
       }
     }


</script>

<style></style>
