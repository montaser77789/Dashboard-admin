import { NavLink, useNavigate, useParams } from "react-router-dom";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Button from "../components/ui/Button";
import Modal from "../components/Modal";
import Input from "../components/ui/Input";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axioInstance from "../components/config/config.instance";
import Cookies from "js-cookie";
import { successmsg } from "../toastifiy";
interface Ividoe {
  videoURL: string;
  description: string;
  id: string;
}

const CourseDeateailse = () => {
  const params = useParams();
  const idcourse = params.courseId;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingDeleteCourse, setIsLoadingDeleteCourse] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenCreateCourse, setIsOpenCreateCourse] = useState(false);
  const [isOpendeleteCourse, setIsOpenDeleteCourse] = useState(false);
  const [idvidoe, setIdVideo] = useState("");
  const [refrchDataVidoe, setRefrchDataVidoe] = useState(0);
  const [couurseCode, setCourseCode] = useState([]);
  const [videoCode, setVidoeCode] = useState([]);

  const [thumbnailCreate, setThumbnailCreate] = useState<File | undefined>();
  const [description, setDescription] = useState({
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("access_token");

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModalCreate = () => {
    setIsOpenCreate(false);
  };
  const openModalCreate = () => {
    setIsOpenCreate(true);
  };

  const closeModalCreateCourse = () => {
    setIsOpenCreateCourse(false);
  };
  const openModalCreateCourse = () => {
    setIsOpenCreateCourse(true);
  };

  const closeModalDeleteCourse = () => {
    setIsOpenDeleteCourse(false);
  };
  const openModalDeleteCourse = () => {
    setIsOpenDeleteCourse(true);
  };

  const { data, isLoading: isLoadingGetCourse } = UseAuthenticatedQuery({
    queryKey: ["course"],
    url: `course/getcourse/${idcourse}`,
  });

  const { data: dataVidoes, isLoading: isLoadingGrtVideo } =
    UseAuthenticatedQuery({
      queryKey: [`video${refrchDataVidoe}`],
      url: `video/getvideos/${idcourse}`,

      config: {
        headers: {
          Authorization: token,
        },
      },
    });
    console.log(dataVidoes);
    

  const toNavigate = () => navigate(-1);

  const onChangeVidoes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files?.length) {
      setThumbnailCreate(files[0]);
    }
  };
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", description.description);
    if (thumbnailCreate) {
      formData.append("file", thumbnailCreate);
    }
    console.log(formData);

    try {
      setLoading(true);
      const res = await axioInstance.post(
        `video/upload/${idcourse}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
      successmsg({ msg: res.data });
      setRefrchDataVidoe((prev) => (prev = prev + 1));

      setDescription({
        description: "",
      });
      setThumbnailCreate(undefined);
      closeModalCreate();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      closeModal();
    }
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDescription({
      ...description,
      [name]: value,
    });
  };
  const onDeleteCourse = async () => {
    setIsLoadingDeleteCourse(true);
    try {
      const res = await axioInstance.delete(
        `video/deletevideo/${idcourse}/${idvidoe}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
      setRefrchDataVidoe((prev) => (prev = prev + 1));
      successmsg({ msg: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingDeleteCourse(false);
      closeModalDeleteCourse();
    }
  };

  const VideoList = dataVidoes?.map((video: Ividoe) =>
    isLoadingGrtVideo ? (
      <div className="border  shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded bg-gray-200 h-40 w-64"></div>
          <div className="flex flex-col justify-between w-full">
            <div className="w-full h-3 bg-gray-200 rounded"></div>
            <div className="space-y-2">
              <div className="w-full h-3 bg-gray-200 rounded"></div>
              <div className="w-11/12 h-3 bg-gray-200 rounded"></div>
              <div className="w-10/12 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div key={video.id} className="flex space-x-3 my-4">
        <iframe
          width="300"
          height="200"
          src={video.videoURL}
          title="YouTube video player"
          frameBorder="0"
          className="mr-4"
        ></iframe>
        <div className="space-y-4">
          <h2 className="">Description: {video.description}</h2>
          <Button
            onClick={() => {
              openModalCreateCourse();
              setIdVideo(video.id);
            }}
          >
            Create Code
          </Button>
          <Button>
            <NavLink to={`/vidoecode/${video.id}`}> Show Code</NavLink>
          </Button>
          <Button
            variant={"danger"}
            onClick={() => {
              openModalDeleteCourse();
              setIdVideo(video.id);
            }}
          >
            DELETE
          </Button>
        </div>
      </div>
    )
  );
  const onCreateVidoeCode = async () => {
    try {
      const res = await axioInstance.put(`video/createcode/${idvidoe}`);
      successmsg({ msg: "Done" });
      setVidoeCode(res.data.AllCodes);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const onCreateCourseCode = async () => {
    try {
      const res = await axioInstance.put(`course/createcode/${idcourse}`);
      successmsg({ msg: "Done" });
      setCourseCode(res.data.AllCodes);
      console.log(couurseCode);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-[#f3f4f7]">
      <Button
        variant={"cancel"}
        onClick={toNavigate}
        className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg mb-4"
      >
        <FaArrowLeft size={20} className="mr-2" />

        <span>Back</span>
      </Button>

      <div className="">
        <div className=" flex flex-col space-y-2 course_child2 p-4 border border-black rounded-lg w-full bg-white hover:shadow-xl">
          {isLoadingGetCourse ? (
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
          ) : (
            <div className="flex items-center h-10 flex-col md:flex-row  w-full">
              <h2 className="float-left mr-2 font-semibold text-lg">Title :</h2>
              <p>{data?.title}</p>
            </div>
          )}
          {isLoadingGetCourse ? (
            <div className="w-48 h-4 bg-gray-200 rounded"></div>
          ) : (
            <div>
              <h2 className="float-left mr-2 font-semibold text-lg">
                Subject :
              </h2>
              <p>{data?.subject}</p>
            </div>
          )}
          {isLoadingGetCourse ? (
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
          ) : (
            <div>
              <h2 className="float-left mr-2 font-semibold text-lg">Price :</h2>
              <p>{data?.price}</p>
            </div>
          )}
          {isLoadingGetCourse ? (
            <div className="w-36 h-4 bg-gray-200 rounded"></div>
          ) : (
            <div>
              <h2 className="float-left mr-2 font-semibold text-lg">
                College Name :
              </h2>
              <p>{data?.collegeName}</p>
            </div>
          )}
          {isLoadingGetCourse ? (
            <div className="w-40 h-4 bg-gray-200 rounded"></div>
          ) : (
            <div>
              <h2 className="float-left mr-2 font-semibold text-lg">
                University-Name :
              </h2>
              <p>{data?.UniversityName}</p>
            </div>
          )}
          {isLoadingGetCourse ? (
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
          ) : (
            <div>
              <h2 className="float-left mr-2 font-semibold text-lg">Level :</h2>
              <p>{data?.level}</p>
            </div>
          )}
          {isLoadingGetCourse ? (
            <div className="w-44 h-4 bg-gray-200 rounded"></div>
          ) : (
            <div>
              <h2 className="float-left mr-4 font-semibold text-lg mb-1">
                Department :
              </h2>
              <p>{data?.departement}</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-8 flex justify-evenly items-center">
        <Button onClick={openModal}>Add New Video</Button>
        <Button onClick={openModalCreate}>Create Code</Button>
        <Button>
          <NavLink to={`/courseCode/${idcourse}`}>Show Code</NavLink>
        </Button>
      </div>
      <div className=" space-x-1 pt-4">{VideoList}</div>

      <Modal title="Add New Video" isopen={isOpen} closeModal={closeModal}>
        <form onSubmit={onSubmitHandler} className="space-y-2">
          <label>Description:</label>
          <Input
            placeholder="Description"
            onChange={onChangeHandler}
            value={description.description}
            name="description"
          />

          <Input type="file" onChange={onChangeVidoes} />
          <div className="flex justify-end space-x-2 mt-3">
            <Button type="submit" isloading={loading}>
              Add
            </Button>
            <Button onClick={closeModal} variant={"cancel"}>
              Cancle
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        title="Create Code to course"
        isopen={isOpenCreate}
        closeModal={closeModalCreate}
      >
        <div className="flex flex-col  space-x-2 mt-3 ">
          {couurseCode?.map((item, index) => (
            <div className="flex flex-col space-y-3" key={index}>
              <p className="text-lg mb-1">
                {index + 1}-{item}
              </p>
            </div>
          ))}
          <div className="flex justify-end space-x-2 mt-3">
            <Button onClick={onCreateCourseCode}>Create</Button>
            <Button onClick={closeModalCreate} variant={"cancel"}>
              Cancle
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        title="Create Code to vidoe"
        isopen={isOpenCreateCourse}
        closeModal={closeModalCreateCourse}
      >
        <div className="flex flex-col  space-x-2 mt-3 ">
          {videoCode?.map((item, index) => (
            <div className="flex flex-col space-y-3" key={index}>
              <p className="text-lg mb-1">
                {index + 1}-{item}
              </p>
            </div>
          ))}
          <div className="flex justify-end space-x-2 mt-3">
            <Button onClick={onCreateVidoeCode}>Create</Button>
            <Button onClick={closeModalCreateCourse} variant={"cancel"}>
              Cancle
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        title="هتمسح ولا اي"
        isopen={isOpendeleteCourse}
        closeModal={closeModalDeleteCourse}
      >
        <div className="flex justify-end space-x-2 mt-3">
          <Button
            isloading={isLoadingDeleteCourse}
            variant={"danger"}
            onClick={onDeleteCourse}
          >
            DELETE
          </Button>
          <Button onClick={closeModalDeleteCourse} variant={"cancel"}>
            Cancle
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CourseDeateailse;
