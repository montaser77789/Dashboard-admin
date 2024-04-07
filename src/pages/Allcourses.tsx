import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Skeleton from "../components/Skellton";

const Allcourses = () => {
  const chackedSubj = useSelector(
    (state: RootState) => state.checkedsubj.valueSubjFilter
  );
  console.log(chackedSubj);

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
    e.preventDefault();
    const errorMessage = validationModel({
      title: createCourse.title,
      price: createCourse.price,
      subject: createCourse.subject,
      level: createCourse.level,
    });
    console.log(errorMessage);

    const haserrormesage =
      Object.values(errorMessage).some((value) => value == "") &&
      Object.values(errorMessage).every((value) => value == "");
    console.log(!haserrormesage);

    if (!haserrormesage) {
      seterrorMessage(errorMessage);
      return;
    }
    try {
      setisloadingCreate(true);
      await axioInstance.post(
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
      successmsg({ msg: "Course added successfully!" });
      setCreateCourse({
        title: "",
        price: "",
        subject: "",
        collegeName: "",
        UniversityName: "",
        level: "",
        departement: "",
      });
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

  const [SearchCourses, setSearchCourses] = useState<Icourses[]>([]);
  useEffect(() => {
    if (data) {
      if (chackedSubj.length === 0) {
        setSearchCourses(data);
      } else {
        const filteredCoursesSubj = data.filter((course: Icourses) =>
          chackedSubj.includes(course.subject)
        );
        setSearchCourses(filteredCoursesSubj);
      }
    }
  }, [data, chackedSubj]);

  if (isLoadingData) return <Skeleton />;
  return (
    <div className="w-full flex flex-col pt-2">
      <div className="p-2 ">
        <Button
          onClick={() => {
            openModal();
          }}
        >
          Create New Course
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                title
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                subject
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                collegeName
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                UniversityName
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Level
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                departement
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                deateals
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>

          {SearchCourses?.length !== 0 ? (
            SearchCourses?.map((corse: Icourses) => (
              <Fragment key={corse._id}>
                <tbody className="divide-y divide-gray-200" key={corse._id}>
                  <tr className="bg-gray-50">
                    <td className="whitespace-nowrap w-[200px] px-4 py-2 font-medium text-gray-900   text-ellipsis	">
                      {corse.title?.slice(0, 7)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {corse.price}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {corse?.subject}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {corse?.UniversityName?.slice(0, 7)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {corse.collegeName?.slice(0, 7)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {corse.level}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {corse.departement?.slice(0, 7)}
                    </td>
                    <td>
                      <Button size={"sm"} onClick={() => {}}>
                        <NavLink to={`/viwdeatels/${corse._id}`}>
                          DEATEALS
                        </NavLink>
                      </Button>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
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
            <tbody>
              <tr>
                <td
                  colSpan={9}
                  className="text-3xl font-bold mb-4 px-6 py-4 whitespace-nowrap text-center"
                >
                  No Courses Yet!
                </td>
              </tr>
            </tbody>
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

          <InputErrormesg msg={errorMessage.title} />
          <label>
            price:
            <Input
              name="price"
              onChange={inputHandelers}
              value={createCourse.price}
            />
          </label>
          <InputErrormesg msg={errorMessage.price} />
          <label>
            subject:
            <Input
              name="subject"
              onChange={inputHandelers}
              value={createCourse.subject}
            />
          </label>
          <InputErrormesg msg={errorMessage.subject} />

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
          <InputErrormesg msg={errorMessage.level} />
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
