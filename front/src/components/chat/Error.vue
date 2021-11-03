<template>
    <div class="error">
        <div class="error_chat">
            <h1>Error</h1>
            <p>{{ this.description }}</p>

            <button type="button" name="button"
            @clicked="click_left"
            >{{ this.button_left }}
            </button>

            <button type="button" name="button"
            @clicked="click_right"
            >{{ this.button_right }}
            </button>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent ({
    name: "error-chat",
    props: {
        error_message: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        button_left: {
            type: String,
            required: true,
        },
        button_right: {
            type: String,
            required: true,
        },
    },
});
</script>

<style media="screen">
.error_chat {
    position: absolute;
    display: block;

    margin: 0 auto;
    padding: 0 auto;

    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 5px;
    font-family: sans-serif;
    text-align: center;
    line-height: 1;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    max-width: 100%;
    max-height: 100%;
}

.error_chat h1 {
    color: red;
}

</style>
