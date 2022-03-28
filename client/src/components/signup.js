import React from "react";

export default function Signup(props) {
    return (
        <html>
            <head></head>
            <body>
                <form action="/register" method="post">
                    <div>
                        <label for="username">Username</label>
                        <input id="username" name="username" type="text" autocomplete="username" required />
                    </div>
                    <div>
                        <label for="current-password">Password</label>
                        <input id="current-password" name="password" type="password" autocomplete="current-password" required />
                    </div>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </body>
        </html>
    );
}
