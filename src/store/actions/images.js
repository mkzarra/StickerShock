import { SET_IMAGES, REMOVE_IMAGE } from "./types";
import { uiStartLoading, uiStopLoading } from './index';

export const addImage = (title, image) => dispatch => {
  dispatch(uiStartLoading());
  fetch('https://us-central1-stickershock-bf1b1.cloudfunctions.net/storeImage', {
    method: "POST",
    body: JSON.stringify({ image: image.base64 })
  })
    .catch(err => {
      console.log(err);
      alert("Something went wrong! Try again later. " + err);
      dispatch(uiStopLoading());
    })
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(parsedRes => {
      console.log("Parsed Response: " + parsedRes);
        const imageData = { title, image: parsedRes.imageUrl }
        return fetch('https://stickershock-bf1b1.firebaseio.com/images.json', {
          method: "POST",
          body: JSON.stringify(imageData)
    });
  })
    .catch(err => {
      console.log(err);
      alert("Something went wrong! Try again later: " + err);
      dispatch(uiStopLoading());
    })
    .then(res => {
      console.log(res);
      res.json();
    })
    .then(parsedRes => {
      console.log("Parsed Response " + parsedRes);
      dispatch(uiStopLoading());
  });
}

export const getImages = () => dispatch => {
  fetch('https://stickershock-bf1b1.firebaseio.com/images.json')
  .catch(err => {
    console.log(err);
    alert("Something went wrong: " + err);
  })
  .then(res => res.json())
  .then(parsedRes => {
    const images = [];
    for (let key in parsedRes) {
      images.push({
        ...parsedRes[key],
        image: { uri: parsedRes[key].image },
        key
      });
    }
    dispatch(setImages(images));
  });
}

export const setImages = images => ({ type: SET_IMAGES, images });

export const deleteImage = (key) =>  dispatch => {
  dispatch(removeImage(key));
  fetch(`https://stickershock-bf1b1.firebaseio.com/${key}.json`, {
    method: "DELETE",
    body: JSON.stringify({ image: image.base64 })
  })
  .catch(error => {
    alert("Something went wrong: " + error);
    console.log(error);
  })
  .then(res => {
    res.json();
    console.log(res);
  })
  .then(parsedRes => {
    console.log(parsedRes);
  });
}

export const removeImage = key => ({ type: REMOVE_IMAGE, key });