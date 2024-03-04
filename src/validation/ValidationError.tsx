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
    course.title.length < 5 ||
    course.title.length > 25
  ) {
    errorMessage.title = "course title must be between 5 and 25   char";
  } else if (
    course.price.length == 0 ||
    course.price.length < 1 ||
    course.price.length > 10
  ) {
    errorMessage.price = "course price must be between 1 and 10   char";
  } else if (
    
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

