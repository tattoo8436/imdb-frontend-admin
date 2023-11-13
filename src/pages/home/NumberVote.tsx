import React, { useEffect, useState } from "react";
import { movieApi } from "../../apis/movieApi";
import { Badge, Col, Image, Row } from "antd";
import { BASE_URL_API } from "../../utils";
import { IMovie, IMovieStatistic } from "../../utils/type";
import dayjs from "dayjs";
import { StarFilled } from "@ant-design/icons";
import numeral from "numeral";
import ModalNumberVote from "./ModalNumberVote";

const NumberVote = () => {
  const [listMovies, setListMovies] = useState([]);
  const [openModalNumberVote, setOpenModalNumberVote] = useState(false);
  const [movie, setMovie] = useState<IMovieStatistic | null>(null);

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    setListMovies([]);
    try {
      const { data } = await movieApi.searchMovie({
        pageIndex: 1,
        pageSize: 10,
        name: "",
        type: null,
        genreId: null,
        score: null,
        numberVote: 1,
        releaseDate: null,
        language: null,
        sortBy: "numberVote",
        orderBy: "DESC",
      });
      console.log({ data });
      setListMovies(data?.listMovies);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModalNumberVote = async (movie: IMovie) => {
    setOpenModalNumberVote(true);
    setMovie(null);
    try {
      const { data } = await movieApi.getStatisticMovie(movie.id);
      console.log(data);
      setMovie({
        id: movie.id ?? 0,
        name: movie.name,
        listNumberVotes: data.reverse(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="number-vote">
      <Row gutter={[24, 24]}>
        {listMovies?.map((movie: IMovie, index) => (
          <Col span={24} key={movie.id}>
            <div
              className="movie-item card-hover"
              onClick={() => handleOpenModalNumberVote(movie)}
            >
              <Badge.Ribbon text={`Hạng ${index + 1}`}>
                <img
                  className="movie-item__image"
                  src={`${BASE_URL_API}/image/${movie.image}`}
                  alt="Ảnh"
                />
              </Badge.Ribbon>

              <div className="movie-item__detail">
                <div className="movie-item__detail__name">
                  {movie.name}{" "}
                  {movie.releaseDate
                    ? `(${dayjs(movie.releaseDate).format("YYYY")})`
                    : ""}
                </div>

                <div className="movie-item__detail__score">
                  <StarFilled />
                  {movie.score?.toFixed(1)}
                </div>

                <div className="movie-item__detail__number-vote">
                  Số lượt đánh giá:{" "}
                  <strong>{numeral(movie.numberVote).format("0,")}</strong>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <ModalNumberVote
        openModal={openModalNumberVote}
        setOpenModal={setOpenModalNumberVote}
        movie={movie}
      />
    </div>
  );
};

export default NumberVote;
