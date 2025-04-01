import {dbConnect} from "@/lib/dbConnect";
import {User} from "@/lib/models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await dbConnect();

    try {
        const { username, password } = await req.json();
        if(!username || !password) {
            return new Response(JSON.stringify({
                error: "username or password is required!",
            }), { status: 400 });
        }

        const existingUser = await User.findOne({ username });
        if(existingUser) {
            return new Response(JSON.stringify({
                error: "username exists"
            }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword });

        return new Response(JSON.stringify({
            message: "user created successfully!"
        }), { status: 201 });

    } catch (e) {
        return new Response(JSON.stringify({
            error: "something went wrong" + e.message
        }), { status: 500 });
    }
}