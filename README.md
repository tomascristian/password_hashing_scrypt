# Password hashing demo with scrypt

## Motivation
When it comes to password hashing in Node.js [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) is the most popular solution.
This is probably because: 
- The [OWASP cheatsheets](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) recommend to "Use Bcrypt unless you have a good reason not to".
- It comes built-in with PHP, so most web developers are familiar with it.
- It's what everybody is using!

One could argue that [scrypt](https://en.wikipedia.org/wiki/Scrypt) is an interesting alternative since: 
- It comes [built-in](https://nodejs.org/api/crypto.html#crypto_crypto_scrypt_password_salt_keylen_options_callback) with Node.js 10+, potentially saving 4mb in dependencies (and compilation headaches).

- It's also an [OWASP recommendation](https://owasp.org/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A3-Sensitive_Data_Exposure)

- The OpenSSL scrypt implementation included with Node is probably better tested and more robust than even the [most popular bcrypt package](https://www.npmjs.com/package/bcrypt).

- It offers equal (or arguably even greater) security.

- It's as easy to use.


## Using this library

Note: This is a demo, it would be _very_ unwise to use it for production purposes.

Api is very similar to bcrypt's:

```js
import scrypt from "scrypt";
const myPassword = "hunter2";
```

To hash a password (autogenerates salt):
```js
const hash = await scrypt.hash(myPassword);
```

To check a password:
```js
const theyMatch = await scrypt.compare(myPassword, hash);
```



## Limitations of this demo version:
- No input checking.
- Hardcoded scrypt options (to the recommended values for interactive login in 2020).
- No memory or execution time limits.
- Derived keys do not follow the [most common format](https://github.com/Tarsnap/scrypt/blob/master/FORMAT).
