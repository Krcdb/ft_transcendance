<template>
	<div class="rule-set">
		<h3>Game Rules</h3>
		<ul>
			<li><i class='bx bxs-right-arrow'></i> You play a match online with another player.</li>
			<li><i class='bx bxs-right-arrow'></i> You control an in game paddle that you can move up and down with the W and S key on your keyboard</li>
			<li><i class='bx bxs-right-arrow'></i> You goal is to always returned the ball to the other player, if you don't you loose the point.</li>
			<li><i class='bx bxs-right-arrow'></i> the first player to have the number of point decided at the start of the game win.</li>
			<li><i class='bx bxs-right-arrow'></i> A match stop automatically if one of the user leave the game.</li>
		</ul>
	</div>
</template>

<style scoped>
.rule-set {
	background-color: lightgray;
	padding: 20px;
}
.rule-set h3 {
	
	margin: 0;
}
.rule-set ul {
	list-style: none;
	margin: 0;
}
.rule-set li {
	text-align: initial;
}
</style>