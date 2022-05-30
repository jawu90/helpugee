<script lang="ts">
	import { getContext } from 'svelte';

	const { request } = getContext('filterable-map');
</script>

<h3>Please select the category you're looking for</h3>
<select name="category" bind:value={$request.category}>
	<option value="">Any category</option>
	<option value="animal_shelter">Animal Shelter</option>
	<option value="town_hall">Town Hall</option>
	<option value="kindergarten">Kindergarten</option>
	<option value="school">School</option>
	<option value="adult_education_center">Adult Education Center</option>
	<option value="hospital">Hospital</option>
	<option value="physician">Physician</option>
	<option value="psychological_support">Psychological Support</option>
	<option value="religious_facilities">Religious Facilities</option>
	<option value="repair_shop">Repair Shop</option>
	<option value="refugee_accomodation">Refugee Accomodation</option>
	<option value="rent_a_bike">Rent a Bike</option>
	<option value="railway_mission">Railway Mission</option>
	<option value="events">Events</option>
	<option value="jobs">Jobs</option>
	<option value="bank">Bank</option>
</select>

<style>
	select {
		width: 100%;
	}
</style>
