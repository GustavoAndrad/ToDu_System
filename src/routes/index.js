
const routes = (app) => {
  app.use("/", (req, res) =>{
    res.status(200).json({message : "Server connection sucessfully stablished"});
  });
};

export default routes ;