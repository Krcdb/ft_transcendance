<template>
	<form>
		<div v-if="channel.isProtected">
			"remove password"
			<!-- "change password" -->
		</div>
		<div v-else>
			<label for="password">Password </label>
				  <input v-if="!showPassword" v-model="password" id="password"  type="password" autocomplete="off">
          <input v-else v-model="password" id="password" type="text" autocomplete="off">
					<label class="eye-checkbox">
              <input type="checkbox" @change="togglePasswordVisibility"/>
              <i class="fas fa-eye checked"></i>
              <i class="fas fa-eye-slash unchecked"></i>
          </label>
			<!-- "add password" -->
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Channel from "@/types/Channel";
import User from "@/types/User";

export default defineComponent({
		data() {
			return {
				error: {} as string,
				showPassword: false as boolean,
				password: "" as string,
			}
		},
	props: {
		channel: {
			type: Object as () => Channel,
			required: true,
		},
		user: {
      type: Object as () => User,
      required: true,
    },
	},
	methods: {
		togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
		// async removePassword() {
			
		// }
	}
})
</script>

<style scoped>
.eye-checkbox {
    margin-left: 5px;
		color: gray;
}
.eye-checkbox input[type="checkbox"],
.eye-checkbox .checked {
    display: none;
}
.eye-checkbox input[type="checkbox"]:checked ~ .checked
{
    display: inline-block;
}
 
.eye-checkbox input[type="checkbox"]:checked ~ .unchecked
{
    display: none;
}
</style>