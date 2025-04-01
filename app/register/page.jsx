"use client";
import React, {useActionState} from 'react';

const registerAction = async (previousState, formData) => {
    const username = formData.get("username");
    const password = formData.get("password");

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                password
            })
        });
        if(!response.ok) {
            throw new Error("registration failed");
        }

        return null;
    } catch (e) {
        return e.message;
    }
}

const Page = () => {
    const [error, submitAction, isPending] = useActionState(registerAction, null);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="p-6 rounded-xl shadow-md w-96 bg-gray-800">
                <h1 className="text-2xl font-semibold text-center mb-4">ثبت نام</h1>
                <form action={submitAction}>
                    <div className="mb-4">
                        <label className="block mb-1">نام کاربری:</label>
                        <input
                            type="text"
                            name="username"
                            autoComplete="off"
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">رمز عبور:</label>
                        <input
                            type="password"
                            name="password"
                            autoComplete="off"
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full p-2 bg-blue-600 rounded hover:bg-blue-500"
                            disabled={isPending}>
                        {isPending ? "در حال ثبت‌نام..." : "ثبت نام"}
                    </button>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Page;
