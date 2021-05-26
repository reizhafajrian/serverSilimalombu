const User = require("../models/User");
const Event = require("../models/Event");
const cloudinary = require("cloudinary");
const ImageUrl = require("../models/ImageUrl");

const viewEvent = async (req, res) => {
  await Event.find()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.send(err));
};

const uploadToCloudnary = async (image) => {
  return await cloudinary.uploader
    .upload(image)
    .then((res) => {
      console.log(res);
      return JSON.stringify({
        imageId: res.public_id,
        imageUrl: res.secure_url,
      });
    })
    .catch((err) => console.log(err));
};
const removeCloudnary = async (id) => {
  return await cloudinary.uploader
    .destroy(id)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const creteEvent = async (req, res) => {
  const data = req.body;
  const imageUrl = await uploadToCloudnary(req.file.path);

  const image = await ImageUrl.create(JSON.parse(imageUrl))
    .then((res) => res)
    .catch((err) => console.log(err));
  data.imageUrl = image._id;
  const checkUndefinedType =
    typeof data.name !== "undefined" &&
    typeof data.imageUrl !== "undefined" &&
    typeof data.desc !== "undefined";
  const checkfield =
    data.name !== "" && data.imageUrl !== "" && data.desc !== "";

  const createEventData = async (data) => {
    await Event.create(data)
      .then((result) =>
        res.status(201).send({
          status: true,
          data: result,
        })
      )
      .catch((err) =>
        res.status(400).send({
          status: false,
          data: err,
        })
      );
  };
  checkUndefinedType
    ? checkfield
      ? createEventData(data)
      : res.status(400).send({
          status: false,
          data: "isi semua field",
        })
    : res.status(400).send({
        status: false,
        data: "isi semua field",
      });
};
// const updateEvent = async (req, res) => {
//     const { id } = req.data;
//     console.log(id);
//     await Event.findOneAndRemove({ _id: id })
//       .then(() =>
//         res.status(200).send({
//           data: "berhasil dihapus",
//         })
//       )
//       .catch((err) => res.status(400).send({ data: "gagal menghapus data" }));
//   };
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const data = await Event.findOne({ _id: id }).populate({
    path: "imageUrl",
    select: "id imageId imageUrl",
  });
  await removeCloudnary(data.imageUrl.imageId);
  await ImageUrl.findOneAndRemove({ _id: data.imageUrl._id })
    .then(() => console.log("image url berhasil di hapus"))
    .catch((err) => console.log(err));
  await Event.findOneAndRemove({ _id: id })
    .then(() =>
      res.status(200).send({
        status: true,
        data: "berhasil dihapus",
      })
    )
    .catch((err) =>
      res.status(400).send({ status: false, data: "gagal menghapus data" })
    );
};

module.exports = {
  creteEvent,
  deleteEvent,
  viewEvent,
};
