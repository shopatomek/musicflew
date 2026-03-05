import axios from "axios";

// Use environment variable for API URL - set REACT_APP_API_URL in .env for local dev
// and in Vercel/Railway dashboard for production
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000/";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    console.error("validateUser error:", error);
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/getUsers`);
    return res.data;
  } catch (error) {
    console.error("getAllUsers error:", error);
    return null;
  }
};

export const getAllArtists = async () => {
  try {
    const res = await axios.get(`${baseURL}api/artist/getAll`);
    return res.data;
  } catch (error) {
    console.error("getAllArtists error:", error);
    return null;
  }
};

export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseURL}api/albums/getAll`);
    return res.data;
  } catch (error) {
    console.error("getAllAlbums error:", error);
    return null;
  }
};

export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseURL}api/songs/getAll`);
    return res.data;
  } catch (error) {
    console.error("getAllSongs error:", error);
    return null;
  }
};

export const changingUserRole = async (userId, role) => {
  try {
    const res = await axios.put(`${baseURL}api/users/updateRole/${userId}`, {
      data: { role: role },
    });
    return res;
  } catch (error) {
    console.error("changingUserRole error:", error);
    return null;
  }
};

export const removeUser = async (userId) => {
  try {
    const res = await axios.delete(`${baseURL}api/users/delete/${userId}`);
    return res;
  } catch (error) {
    console.error("removeUser error:", error);
    return null;
  }
};

export const saveNewSong = async (data) => {
  try {
    const res = await axios.post(`${baseURL}api/songs/save`, { ...data });
    return res.data.saveSong;
  } catch (error) {
    console.error("saveNewSong error:", error);
    return null;
  }
};

export const saveNewArtist = async (data) => {
  try {
    const res = await axios.post(`${baseURL}api/artist/save`, { ...data });
    return res.data.saveArtist;
  } catch (error) {
    console.error("saveNewArtist error:", error);
    return null;
  }
};

export const saveNewAlbum = async (data) => {
  try {
    const res = await axios.post(`${baseURL}api/albums/save`, { ...data });
    return res.data.saveAlbum;
  } catch (error) {
    console.error("saveNewAlbum error:", error);
    return null;
  }
};

export const deleteSongById = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}api/songs/delete/${id}`);
    return res;
  } catch (error) {
    console.error("deleteSongById error:", error);
    return null;
  }
};

export const deleteAlbumById = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}api/albums/delete/${id}`);
    return res;
  } catch (error) {
    console.error("deleteAlbumById error:", error);
    return null;
  }
};

export const deleteArtistById = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}api/artist/delete/${id}`);
    return res;
  } catch (error) {
    console.error("deleteArtistById error:", error);
    return null;
  }
};
