import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const SongList = ({ data, index, type }) => {
  // const [isPlayList, setIsPlayList] = useState(true);

  const [{ songIndex, isSongPlaying }, dispatch] = useStateValue();

  const addContext = () => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true,
      });
    }

    if (songIndex !== index) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      });
    }
  };

  //

  return (
    <div className="border-pink-600">
      <div
        className=" w-max-[600px] flex items-center justify-center bottom hover:bg-pink-600 m-2 p-2 flex-row bg-black rounded-md "
        onClick={type === "song" && addContext}
      >
        <img
          src={data.imageURL}
          referrerPolicy="no-refferer"
          alt=""
          className="w-14 h-14 object-cover rounded-md min-w-[40px] shadow-md backdrop"
        />

        <p className="text-base flex flex-col text-center">
          <span className="text-white font-semibold max-w-[1000px] gap-22  text-center">
            {data.index > 1 ? data.index : data.index}
            {data.name.lenght > 9 ? data.name : `${data.name.slice(0, 25)}`}
          </span>
          <span className="text-gray-400 text-sm w-275 min-w-[160px] text-center">
            {data.artist.lenght > 10
              ? data.artist
              : `${data.artist.slice(0, 10)}`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SongList;
