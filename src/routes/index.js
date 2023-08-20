// Routers
const userRouter = require("userRouter");
const postRouter = require("postRouter");
const topicRouter = require("topicRouter");

// PORT
const PORT = process.env.PORT;

/**
 * Contain all end-points
 * @param app
 */
function routers(app) {
    // End-points
    app.use("/api/user", userRouter);
    app.use("/api/post", postRouter);
    app.use("/api/topic", topicRouter);

    // Port Connection
    app.listen(PORT, () => {
        console.log(`Server is running on http:localhost:${PORT}`);
    });
}

module.exports = routers;