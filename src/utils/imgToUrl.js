const url = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_imageStorageKey
}`;

/**
 * It takes an image file, uploads it to a server, and returns the image's url
 * @param image - the image file
 */
const getImgUrl = async (image) => {
  let imageUrl = "";
  const formData = new FormData();
  formData.append("image", image);
  await fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      if (result?.success) {
        imageUrl = result.data?.url;
        console.log("imageUrl:", imageUrl);
      }
    })
    .catch((error) => {
      console.log("img upload failed", error);
    });
  return imageUrl;
};

export default getImgUrl;
