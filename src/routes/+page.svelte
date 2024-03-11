<script>
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
</script>

<br />
<div>- Rosh chabursh logs in and see a list of his bochurim</div>
<div>- Admin will login and see a list of chaburah with the most recent changes</div>
<div class="main-route-page-div">
	<div class="main-route-login-div">
		<form class="main-route-login-form" action="" method="post">
			<div>
				<label for="email">Email</label>
				<Input id="email" type="text" name="email" placeholder="Email" />
			</div>
			<div>
				<label for="password">Password</label>
				<Input id="password" type="password" name="password" placeholder="Password" />
			</div>
			<Button type="submit" value="Login">Login</Button>
		</form>
	</div>
</div>
