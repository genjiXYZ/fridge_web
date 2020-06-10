<template>
	<div>

		<div class="container">
		
<FoodList :position="position"/>
			
			
			 	
		</div>

	</div>
</template>


<script>

import  FoodList from '../components/Foods_list'
export default {
	props:['position'],

components:{
	FoodList
}
	
}
</script>

<style lang="scss" scoped>

	.container{
		height: calc( 100vh - 120px);

		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

</style>