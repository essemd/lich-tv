import React from "react";

export default function Login(props) {
    return (
        <div className="mt-4 container-fluid">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <h2 className="mb-4">Log In</h2>
                    <form action="/login" method="post">
                        <div className="form-group">
                            <label className="mr-2" htmlFor="username">Username</label>
                            <input className="form-control" id="username" name="username" type="text" autoComplete="username" required />
                        </div>
                        <div className="form-group">
                            <label className="mr-2" htmlFor="current-password">Password</label>
                            <input className="form-control" id="current-password" name="password" type="password" autoComplete="current-password" required />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="mt-3 btn btn-primary">Log In</button>
                        </div>
                        <div className="col-4"></div>
                    </form>
                </div>
            </div>
        </div>
    );
}
