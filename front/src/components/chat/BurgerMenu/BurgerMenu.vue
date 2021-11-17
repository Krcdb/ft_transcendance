<template>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="">

        <!--Navbar-->
        <nav class="navbar navbar-light light-blue lighten-4">

            <!-- Navbar brand -->
            <a class="navbar-brand" href="#">Navbar</a>

            <!-- Collapse button -->
            <button class="navbar-toggler toggler-example" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation"><span class="dark-blue-text"><i
                class="fas fa-bars fa-1x"></i></span></button>

                <!-- Collapsible content -->
                <div class="collapse navbar-collapse" id="navbarSupportedContent1">

                    <!-- Links -->
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Features</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Pricing</a>
                        </li>
                    </ul>
                    <!-- Links -->

                </div>
                <!-- Collapsible content -->

            </nav>
            <!--/.Navbar-->

</div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "burger-menu",
});
</script>

<style media="screen">
.fa-1x {
    font-size: 1.5rem;
}
.navbar-toggler.toggler-example {
    cursor: pointer;
}
.dark-blue-text {
    color: #0A38F5;
}
.dark-pink-text {
    color: #AC003A;
}
.dark-amber-text {
    color: #ff6f00;
}
.dark-teal-text {
    color: #004d40;
}
</style>
