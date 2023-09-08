import app from "./index";
import databaseConnection from "./dbConnection";

const port = process.env.PORT || 8080;

databaseConnection();

app.listen(port, () => {
    console.log(`Server running on port:${port}`);
});
