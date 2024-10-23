import app from "./app.js";
import connectTODatabase from "./db/connect.js";
const PORT = process.env.PORT || 5000;
connectTODatabase().then(() => {
    //connections and listeners
    app.listen(PORT, () => {
        console.log(`started Sever at port ${PORT}...😎`);
    });
}).catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map