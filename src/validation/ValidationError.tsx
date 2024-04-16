const priceRegExp = /^\d+$/;

export const validationModel = (course: {
  title: string;
  price: string;
  subject: string;
  level: string;
 
}) => {
  const errorMessage: {
    title: string;
    price: string;
    subject: string;
    level: string;
    
  } = {
    title: "",
    price: "",
    subject: "",
    level: "",
    
  };
  if (
    course.title.length == 0 ||
    course.title.length < 2 ||
    course.title.length > 25
  ) {
    errorMessage.title = "course title must be between 5 and 25   char";
  } else if (!priceRegExp.test(course.price)) {
    errorMessage.price = "Course price must contain only numbers";
  }  else if (
    
    course.subject.length == 0 ||
    course.subject.length < 3 ||
    course.subject.length > 25
  ) {
    errorMessage.subject = "course subject must be between 3 and 25   char";
  } else if (
    course.level.length == 0 ||
    course.level.length < 3 ||
    course.level.length > 25
  ) {
    errorMessage.level = "course level must be between 3 and 25   char";
  }  
  return errorMessage;
};

