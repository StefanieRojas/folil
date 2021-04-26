<h1>User login</h1>
<form action="/loginme" method="POST">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <input type="text" name="user" placeholder="enter user name"> <br> <br>
    <input type="password" name="password" placeholder="enter user password"> <br> <br>
    <button type="submit"> Login </button>
</form>