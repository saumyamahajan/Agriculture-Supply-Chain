const getAllMaterials= async (req, res, next) => {
    try {
        console.log("All Materials func");
       res.status(200).json({ message: "all Materials" });
    } catch (error) {
       res.status(400).json({ message: error.message });
      }

};

const getMaterial= async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log("Getting Material = %s", id);
        // console.log("1 farmer func");
        res.status(200).json({ message: "1 Material" });
    } catch (error) {
        res.status(400).json({ message: error.message });
      }

};



module.exports = {
    getAllMaterials,
    getMaterial
}