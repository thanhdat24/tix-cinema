import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
  SET_LIST_FILM,
} from "../actions/types/FilmManagementType";

const initialState = {
  arrFilm: [
    {
      maPhim: 1282,
      tenPhim: "Ban tay diet quy",
      biDanh: "ban-tay-diet-quy",
      trailer: "https://www.youtube.com/embed/uqJ9u7GSaYM",
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
      moTa: "Newlywed couple Ted and Tami-Lynn want to have a baby, but in order to qualify to be a parent, Ted will have to prove he's a person in a court of law.",
      maNhom: "GP00",
      ngayKhoiChieu: "2019-07-29T00:00:00",
      danhGia: 5,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
    {
      maPhim: 1282,
      tenPhim: "Ban tay diet quy",
      biDanh: "ban-tay-diet-quy",
      trailer: "https://www.youtube.com/embed/uqJ9u7GSaYM",
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
      moTa: "Newlywed couple Ted and Tami-Lynn want to have a baby, but in order to qualify to be a parent, Ted will have to prove he's a person in a court of law.",
      maNhom: "GP00",
      ngayKhoiChieu: "2019-07-29T00:00:00",
      danhGia: 5,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
  ],
  dangChieu: true,
  sapChieu: true,
  arrFilmDefault: [],
};

export const FilmManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_FILM: {
      state.arrFilm = action.arrFilm;
      state.arrFilmDefault = state.arrFilm;

      return { ...state };
    }
    case SET_FILM_DANG_CHIEU: {
      state.dangChieu = !state.dangChieu;

      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.dangChieu === state.dangChieu
      );
      return { ...state };
    }
    case SET_FILM_SAP_CHIEU: {
      state.sapChieu = !state.sapChieu;

      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );
      return { ...state };
    }
    default:
      return { ...state };
  }
};
