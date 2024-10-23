import { connect, disconnect } from "mongoose";
async function connectTODatabase() {
    try {
        await connect(process.env.MONGODB_URL);
        console.log("MONGODB connected Successfully...🤟");
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot connect to MONGODB...😯");
    }
}
async function disConnectTODatabase() {
    try {
        await disconnect();
        console.log("MONGODB connected Successfully...🥰");
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot connect to MONGODB...😯");
    }
}
export { disConnectTODatabase, connectTODatabase };
export default connectTODatabase;
//# sourceMappingURL=connect.js.map