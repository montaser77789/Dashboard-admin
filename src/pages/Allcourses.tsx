import {
  ChangeEvent,
  FormEvent,
  Fragment,
 useState,
} from "react";
import Modal from "../components/Modal";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import { Icourses } from "../interfaces";
import InputErrormesg from "../components/ui/Inputerrormessage";
import axioInstance from "../components/config/config.instance";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { successmsg } from "../toastifiy";
import { validationModel } from "../validation/ValidationError";

const Allcourses = () => {
  

  const [refrchUsers, setrefrchUsers] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [CurrentCourseId, setCurrentCourseId] = useState<string | undefined>(
    ""
  );

  const [isOpenUpdata, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setisOpenDelete] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isloadingCreate, setisloadingCreate] = useState(false);
  const [isloadingUpdate, setisloadingUpdate] = useState(false);
  const [createCourse, setCreateCourse] = useState({
    title: "",
    price: "",
    subject: "",
    collegeName: "",
    UniversityName: "",
    level: "",
    departement: "",
  });
  const [editCourse, setEditCourse] = useState<Icourses>({
    _id: "",
    title: "",
    price: "",
    subject: "",
    collegeName: "",
    UniversityName: "",
    departement: "",
    level: "",
  });
  const [errorMessage, seterrorMessage] = useState({
    title: "",
    price: "",
    subject: "",
    level: "",
  });
  const {
    subject,
    title,
    UniversityName,
    collegeName,
    level,
    departement,
    price,
  } = createCourse;
  const token = Cookies.get("access_token");

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
    // setEditCourse(coure);
  }
  function closeModalUpdate() {
    setIsOpenUpdate(false);
  }
  function openModalUpdate(coure: Icourses) {
    setIsOpenUpdate(true);
    setEditCourse(coure);
  }
  function closeModelDelete() {
    setisOpenDelete(false);
  }

  const inputHandelers = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setCreateCourse({
      ...createCourse,
      [name]: value,
    });
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    console.log(createCourse);

    e.preventDefault();
    try {
      setisloadingCreate(true);
      const res = await axioInstance.post(
        "course/createcourse",

        {
          subject,
          title,
          UniversityName,
          collegeName,
          level,
          departement,
          price,
          role: "Teacher",
        },

        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCreateCourse({
        title: "",
        price: "",
        subject: "",
        collegeName: "",
        UniversityName: "",
        level: "",
        departement: "",
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
      setisloadingCreate(false);
      setrefrchUsers((prev) => (prev = prev + 1));
    }
  };

  const inputHandelersUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setEditCourse({
      ...editCourse,
      [name]: value,
    });
  };

  const {
    level: levelEdit,
    title: TitleEdit,
    price: priceUpadate,
    subject: subjectUpdate,
  } = editCourse;
  const onSubmitHandlerUpdata = async (e: FormEvent<HTMLFormElement>) => {
    console.log("Done");

    e.preventDefault();

    const errorMessage = validationModel({
      title: editCourse.title,
      price: editCourse.price,
      subject: editCourse.subject,
      level: editCourse.level,
    });
    console.log(errorMessage);

    const haserrormesage =
      Object.values(errorMessage).some((value) => value == "") &&
      Object.values(errorMessage).every((value) => value == "");
    console.log(!haserrormesage);
    console.log(editCourse._id);

    if (!haserrormesage) {
      seterrorMessage(errorMessage);
      return;
    }

    try {
      setisloadingUpdate(true);
      const res = await axioInstance.patch(
        `course/editcourse/${editCourse._id}`,
        {
          title: TitleEdit,
          level: levelEdit,
          price: priceUpadate,
          subject: subjectUpdate,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      closeModalUpdate();
      setisloadingUpdate(false);
      setrefrchUsers((prev) => (prev = prev + 1));
    }
  };

  const handleDeleteCourse = async (courseId: string | undefined) => {
    console.log(courseId);

    try {
      setisLoading(true);

      const res = await axioInstance.delete(`course/deletecourse/${courseId}`);
      successmsg({ msg: `${res.data}` });
    } catch (error) {
      console.log(error);
    } finally {
      closeModelDelete();
      setisLoading(false);
      setrefrchUsers((prev) => (prev = prev + 1));
    }
  };
  const { data, isLoading: isLoadingData } = UseAuthenticatedQuery({
    queryKey: [`courses${refrchUsers}`],
    url: "course/getmycourses",
    config: {
      headers: {
        Authorization: token,
      },
    },
  });

  if (isLoadingData) return <h3>Loading...</h3>;
  return (
    <div className="w-full flex flex-col">
      <div className="p-2 ">
        <Button
          onClick={() => {
            openModal();
          }}
        >
          Create New Course
        </Button>

      </div>
      <div>
        <table className="w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                title
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                price
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                subject
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                collegeName
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                UniversityName
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Level
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                departement
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                deateals
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          {data?.length !== 0 ? (
            data?.map((corse: Icourses) => (
              <Fragment key={corse._id}>
                <tbody
                  className="bg-white divide-y divide-gray-200"
                  key={corse._id}
                >
                  <tr className={"bg-gray-50"}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {corse.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {corse.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {corse.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {corse.UniversityName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {corse.collegeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {corse.level}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {corse.departement}
                    </td>
                    <td>
                      <Button size={"sm"} onClick={() => {}}>
                        <NavLink to={`/dashboard/viwdeatels/${corse._id}`}>
                          DEATEALS
                        </NavLink>
                      </Button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => {
                            setisOpenDelete(true);
                            setCurrentCourseId(corse._id);
                          }}
                          size={"sm"}
                          variant={"danger"}
                        >
                          <BsTrash size={17} className="mr-1" />
                        </Button>
                        <Button
                          className="mr-1"
                          size={"sm"}
                          onClick={() => {
                            openModalUpdate(corse);
                          }}
                        >
                          <CiEdit size={17} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Fragment>
            ))
          ) : (
            <h2>No Courses Yet</h2>
          )}
        </table>
      </div>

      {/* Create */}
      <Modal isopen={isOpen} closeModal={closeModal} title="Create New Coure">
        <form onSubmit={onSubmitHandler} className="space-y-1">
          <label>
            Title:
            <Input
              name="title"
              onChange={inputHandelers}
              value={createCourse.title}
            />
          </label>

          {/* <InputErrormesg msg={errorMessage.title} /> */}
          <label>
            price:
            <Input
              name="price"
              onChange={inputHandelers}
              value={createCourse.price}
            />
          </label>
          {/* <InputErrormesg msg={errorMessage.level} /> */}
          <label>
            subject:
            <Input
              name="subject"
              onChange={inputHandelers}
              value={createCourse.subject}
            />
          </label>
          {/* <InputErrormesg msg={errorMessage.price} /> */}

          <label>
            collegeName:
            <Input
              name="collegeName"
              onChange={inputHandelers}
              value={createCourse.collegeName}
            />
          </label>
          {/* <InputErrormesg msg={errorMessage.subject} /> */}
          <label>
            UniversityName:
            <Input
              name="UniversityName"
              onChange={inputHandelers}
              value={createCourse.UniversityName}
            />
          </label>
          {/* <InputErrormesg msg={errorMessage.subject} /> */}
          <label>
            level:
            <Input
              name="level"
              onChange={inputHandelers}
              value={createCourse.level}
            />
          </label>
          {/* <InputErrormesg msg={errorMessage.subject} /> */}
          <label>
            departement:
            <Input
              name="departement"
              onChange={inputHandelers}
              value={createCourse.departement}
            />
          </label>
          {/* <InputErrormesg msg={errorMessage.subject} /> */}

          <div className="flex justify-evenly mt-4">
            <Button
              className="bg-indigo-500 hover:bg-indigo-300"
              isloading={isloadingCreate}
            >
              Create
            </Button>
            <Button variant="cancel" onClick={closeModal} type="button">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        title="Are you sure you want to delete the course?"
        isopen={isOpenDelete}
        closeModal={closeModelDelete}
      >
        <div className="flex w-full space-x-2 justify-end">
          <Button
            isloading={isLoading}
            variant={"danger"}
            onClick={() => handleDeleteCourse(CurrentCourseId)}
          >
            {isLoading ? "loading.." : "Delete"}
          </Button>
          <Button variant="cancel" onClick={closeModelDelete} type="button">
            Cancel
          </Button>
        </div>
      </Modal>

      {/* // update Model */}
      <Modal
        isopen={isOpenUpdata}
        closeModal={closeModalUpdate}
        title="Edit coure"
      >
        <form onSubmit={onSubmitHandlerUpdata} className="space-y-1">
          <label>
            Title:
            <Input
              name="title"
              onChange={inputHandelersUpdate}
              value={editCourse.title}
            />
          </label>

          <InputErrormesg msg={errorMessage.title} />
          <label>
            Price:
            <Input
              name="price"
              onChange={inputHandelersUpdate}
              value={editCourse.price}
            />
          </label>
          <InputErrormesg msg={errorMessage.price} />
          <label>
            Subject:
            <Input
              name="subject"
              onChange={inputHandelersUpdate}
              value={editCourse.subject}
            />
          </label>
          <InputErrormesg msg={errorMessage.subject} />

          <label>
            Level:
            <Input
              name="level"
              onChange={inputHandelersUpdate}
              value={editCourse.level}
            />
          </label>
          <InputErrormesg msg={errorMessage.level} />

          <div className="flex justify-evenly mt-4">
            <Button
              className="bg-indigo-500 hover:bg-indigo-300"
              isloading={isloadingUpdate}
            >
              Update
            </Button>
            <Button variant="cancel" onClick={closeModalUpdate} type="button">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Allcourses;
